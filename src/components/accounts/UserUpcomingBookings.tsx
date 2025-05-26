import MyBookingCard from '../bookings/MyBookingCard';
import type { Booking } from '../../types/venues';

/**
 * Props for the UserUpcomingBookings component.
 */
type UserUpcomingBookingsProps = {
	/** Array of all user bookings */
	bookings: Booking[];
	/** Function to refresh the booking list after changes */
	refreshBookings: () => void;
};

/**
 * Displays a list of upcoming bookings for the user.
 */
export default function UserUpcomingBookings({
	                                             bookings,
	                                             refreshBookings,
                                             }: UserUpcomingBookingsProps) {
	const now = new Date();

	// Filter and sort upcoming bookings
	const upcomingBookings = bookings
		.filter(b => new Date(b.dateFrom) > now)
		.sort(
			(a, b) =>
				new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime()
		);

	return (
		<section className="my-bookings">
			<h2 className="text-4xl font-semibold mb-4 text-primary">
				Upcoming Bookings
			</h2>

			{upcomingBookings.length === 0 ? (
				<p className="text-gray-500 text-sm">You have no upcoming bookings.</p>
			) : (
				<div className="grid gap-4">
					{upcomingBookings.map(booking => (
						<MyBookingCard
							key={booking.id}
							booking={booking}
							refreshBookings={refreshBookings}
						/>
					))}
				</div>
			)}
		</section>
	);
}
