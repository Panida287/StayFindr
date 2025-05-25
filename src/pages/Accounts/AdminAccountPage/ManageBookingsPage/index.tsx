import { useState, useMemo, useEffect } from 'react';
import { useFetchVenuesByProfile } from '../../../../hooks/useFetchVenuesByProfile.ts';
import BookingCard from '../../../../components/bookings/BookingCard.tsx';
import Pagination from '../../../../components/commons/Pagination.tsx';
import { SortStatusDropdown, StatusValue } from '../../../../components/venues/SearchAndFilters/SortStatusDropdown.tsx';
import { Venue } from '../../../../types/venues.ts';

export default function ManageBookingsPage() {
	const {venues = [], isLoading, error} = useFetchVenuesByProfile();
	const [currentPage, setCurrentPage] = useState(1);
	const [currentFilter, setCurrentFilter] = useState<StatusValue>('all');
	const ITEMS_PER_PAGE = 3;

	// 1) Flatten all bookings into a single array
	const allBookings = useMemo(
		() =>
			venues.flatMap((venue: Venue) =>
				venue.bookings.map((b) => ({...b, venue}))
			),
		[venues]
	);

	// 2) Sort by start date ascending
	const sortedBookings = useMemo(
		() =>
			[...allBookings].sort(
				(a, b) =>
					new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime()
			),
		[allBookings]
	);

	// 3) Filter by status (or show all)
	const now = useMemo(() => Date.now(), []);
	const filteredBookings = useMemo(() => {
		if (currentFilter === 'all') return sortedBookings;

		return sortedBookings.filter((b) => {
			const from = new Date(b.dateFrom).getTime();
			const to = new Date(b.dateTo).getTime();
			switch (currentFilter) {
				case 'upcoming':
					return from > now;
				case 'ongoing':
					return from <= now && to >= now;
				case 'completed':
					return to < now;
			}
		});
	}, [sortedBookings, currentFilter, now]);

	// 4) Reset to page 1 when filter changes
	useEffect(() => {
		setCurrentPage(1);
	}, [currentFilter, filteredBookings]);

	// 5) Paginate *after* filtering
	const pageCount = Math.ceil(filteredBookings.length / ITEMS_PER_PAGE);
	const paginatedBookings = useMemo(() => {
		const start = (currentPage - 1) * ITEMS_PER_PAGE;
		return filteredBookings.slice(start, start + ITEMS_PER_PAGE);
	}, [filteredBookings, currentPage]);

	// --- UI ---
	if (isLoading) {
		return <p className="p-8 text-center">Loading bookings…</p>;
	}
	if (error) {
		return <p className="p-8 text-center">Error: {error}</p>;
	}

	return (
		<div className="mt-8 max-w-4xl mx-auto w-full">
			<div className="w-full flex flex-col justify-between items-between sm:flex-row">
				<h1 className="text-3xl w-full flex items-center">All Bookings</h1>

				<div className="flex justify-end w-full">
					<SortStatusDropdown
						currentStatus={currentFilter}
						onChange={setCurrentFilter}
					/>

				</div>

			</div>

			{filteredBookings.length === 0 ? (
				<p className="text-center text-gray-500 mt-8">No bookings found.</p>
			) : (
				<>
					<div className="space-y-4 mt-4">
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
	);
}
