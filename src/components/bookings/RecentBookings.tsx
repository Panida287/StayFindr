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
			venue: {
				name: venue.name,
				price: venue.price,
			},
		}))
	);

	const sortedBookings = allBookings.sort((a, b) =>
		new Date(b.dateFrom).getTime() - new Date(a.dateFrom).getTime()
	);

	const recent = sortedBookings.slice(0, 2);
	const username = localStorage.getItem("SFUsername");

	return (
		<div className="mt-8 bg-white p-4 rounded-xl shadow-sm">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold">Recent Bookings</h2>
				<Link
					to={`/admin/${username}/manage-bookings`}
					className="text-sm text-pink-600 hover:underline"
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
