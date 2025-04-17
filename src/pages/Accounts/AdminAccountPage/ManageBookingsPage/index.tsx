import { useFetchVenuesByProfile } from '../../../../hooks/useFetchVenuesByProfile.ts';
import BookingCard from '../../../../components/bookings/BookingCard.tsx';
import { Venue } from '../../../../types/venues.ts';

export default function ManageBookingsPage() {
	const { venues, isLoading, error } = useFetchVenuesByProfile();

	if (isLoading) return <p>Loading bookings...</p>;
	if (error) return <p>Error: {error}</p>;

	const allBookings = venues.flatMap((venue: Venue) =>
		venue.bookings.map((booking) => ({
			...booking,
			venue,
		}))
	);

	const sortedBookings = allBookings.sort((a, b) =>
		new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime()
	);

	return (
		<div className="mt-8 max-w-4xl mx-auto">
			<h1 className="text-2xl font-bold mb-4">All Bookings</h1>

			{sortedBookings.length === 0 ? (
				<p className="text-center text-gray-500">No upcoming bookings</p>
			) : (
				<div className="space-y-4">
					{sortedBookings.map((booking) => (
						<BookingCard key={booking.id} booking={booking} />
					))}
				</div>
			)}
		</div>
	);
}
