import { useState, useMemo, useEffect } from 'react';
import { useFetchVenuesByProfile } from '../../../../hooks/useFetchVenuesByProfile.ts';
import BookingCard from '../../../../components/bookings/BookingCard.tsx';
import Pagination from '../../../../components/commons/Pagination.tsx';
import { Venue } from '../../../../types/venues.ts';

export default function ManageBookingsPage() {
	// Always call hooks in the same order
	const {venues = [], isLoading, error} = useFetchVenuesByProfile();
	const [currentPage, setCurrentPage] = useState(1);
	const ITEMS_PER_PAGE = 3;

	// Flatten and sort all bookings
	const allBookings = useMemo(
		() =>
			venues.flatMap((venue: Venue) =>
				venue.bookings.map((booking) => ({
					...booking,
					venue,
				}))
			),
		[venues]
	);

	const sortedBookings = useMemo(
		() =>
			[...allBookings].sort(
				(a, b) => new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime()
			),
		[allBookings]
	);

	// Reset to first page whenever bookings data changes
	useEffect(() => {
		setCurrentPage(1);
	}, [sortedBookings]);

	const pageCount = Math.ceil(sortedBookings.length / ITEMS_PER_PAGE);

	const paginatedBookings = useMemo(() => {
		const start = (currentPage - 1) * ITEMS_PER_PAGE;
		return sortedBookings.slice(start, start + ITEMS_PER_PAGE);
	}, [sortedBookings, currentPage]);

	// Conditional UI—hooks have all been initialized above
	if (isLoading) {
		return <p className="p-8 text-center">Loading bookings…</p>;
	}

	if (error) {
		return <p className="p-8 text-center">Error: {error}</p>;
	}

	return (
		<>
			<div className="mt-8 max-w-4xl mx-auto">
				<h1 className="text-3xl text-start w-full mb-4">All Bookings</h1>

				{sortedBookings.length === 0 ? (
					<p className="text-center text-gray-500">No upcoming bookings</p>
				) : (
					<>
						<div className="space-y-4">
							{paginatedBookings.map((booking) => (
								<BookingCard key={booking.id} booking={booking} />
							))}
						</div>

						<Pagination
							currentPage={currentPage}
							pageCount={pageCount}
							onPageChange={setCurrentPage}
						/>
					</>
				)}
			</div>
		</>
	);
}
