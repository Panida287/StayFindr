import MyBookingCard from '../bookings/MyBookingCard.tsx';
import type { Booking } from '../../types/venues.ts';

type UserHistoryBookingsProps = {
	/** List of all user bookings */
	bookings: Booking[];
	/** Function to refresh bookings (used after cancellation or update) */
	refreshBookings: () => void;
};

/**
 * Displays a user's booking history (past and ongoing bookings).
 * Sorted by most recent first. If no bookings are found, shows a friendly message.
 */
export default function UserHistoryBookings({
	                                            bookings,
	                                            refreshBookings,
                                            }: UserHistoryBookingsProps) {
	const now = new Date();

	// Filter past and current bookings
	const historyBookings = bookings
		.filter((b) => new Date(b.dateFrom) <= now)
		.sort((a, b) => new Date(b.dateFrom).getTime() - new Date(a.dateFrom).getTime())
		.reverse(); // Most recent first

	return (
		<section aria-label="Past and current bookings" className="my-bookings">
			{historyBookings.length === 0 ? (
				<p className="text-gray-500 italic" role="status">
					No past or ongoing bookings.
				</p>
			) : (
				<div className="grid gap-4">
					{historyBookings.map((b) => (
						<MyBookingCard
							key={b.id}
							booking={b}
							refreshBookings={refreshBookings}
						/>
					))}
				</div>
			)}
		</section>
	);
}
