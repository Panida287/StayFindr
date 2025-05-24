import MyBookingCard from '../bookings/MyBookingCard.tsx';
import type { Booking } from '../../types/venues.ts';

type UserHistoryBookingsProps = {
	bookings: Booking[];
	refreshBookings: () => void;
};

export default function UserHistoryBookings({
	                                            bookings,
	                                            refreshBookings,
                                            }: UserHistoryBookingsProps) {
	const now = new Date();

	const historyBookings = bookings
		.filter(b => new Date(b.dateFrom) <= now)
		.sort(
			(a, b) =>
				new Date(b.dateFrom).getTime() - new Date(a.dateFrom).getTime()
		);

	return (
		<div className="my-bookings">
			<h2 className="text-4xl mb-4">Booking History</h2>

			{historyBookings.length === 0 ? (
				<p className="text-gray-500">No past or ongoing bookings.</p>
			) : (
				<div className="grid gap-4">
					{historyBookings.map(b => (
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
