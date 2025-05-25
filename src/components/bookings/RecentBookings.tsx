import { Venue } from "../../types/venues";
import { Link } from "react-router-dom";
import BookingCard from './BookingCard.tsx';

type Props = {
	venues: Venue[];
};

export default function RecentBookings({ venues }: Props) {
	const allBookings = venues.flatMap((venue) =>
		venue.bookings.map((booking) => ({
			...booking,
			venue,
		}))
	);

	const sortedBookings = allBookings.sort((a, b) =>
		new Date(b.dateFrom).getTime() - new Date(a.dateFrom).getTime()
	);

	const recent = sortedBookings.slice(0, 2);
	const username = localStorage.getItem("SFUsername");

	return (
		<div className="mt-8">
			<div className="flex justify-between items-end mb-4">
				<h2 className="text-3xl text-start">Recent Bookings</h2>
				<Link
					to={`/admin/${username}/manage-bookings`}
					className="text-sm text-primary hover:underline"
				>
					View All
				</Link>
			</div>

			{recent.length === 0 ? (
				<p className="text-sm text-gray-500 text-center">No bookings at the moment</p>
			) : (
				<div className="space-y-4">
					{recent.map((booking) => (
						<BookingCard key={booking.id} booking={booking} />
					))}
				</div>
			)}
		</div>
	);
}
