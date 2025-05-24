import MyBookingCard from '../bookings/MyBookingCard.tsx';
import type { Booking } from '../../types/venues.ts';

type UserUpcomingBookingsProps = {
	bookings: Booking[];
	refreshBookings: () => void;
};

export default function UserUpcomingBookings({
	                                             bookings,
	                                             refreshBookings,
                                             }: UserUpcomingBookingsProps) {
	const now = new Date();
	const upcomingBookings = bookings
		.filter((b) => new Date(b.dateFrom) > now)
		.sort(
			(a, b) =>
				new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime(),
		);

	return (
		<div className="my-bookings">
			<h2 className="text-4xl mb-4">Upcoming Bookings</h2>

			{upcomingBookings.length === 0 ? (
				<p className="text-gray-500">You have no upcoming bookings.</p>
			) : (
				<div className="grid gap-4">
					{upcomingBookings.map((b) => (
						<MyBookingCard
							key={b.id}
							booking={b}
							refreshBookings={refreshBookings}
						/>
					))}
				</div>
			)}
		</div>
	);
}
