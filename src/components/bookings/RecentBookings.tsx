import { Venue } from "../../types/venues";
import { format } from "date-fns";
import { Link } from "react-router-dom";

type Props = {
	venues: Venue[];
};

export default function RecentBookings({ venues }: Props) {
	const allBookings = venues.flatMap((venue) =>
		venue.bookings.map((booking) => ({
			...booking,
			venueName: venue.name,
			price: venue.price,
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
				<Link to={`/admin/${username}/manage-bookings`} className="text-sm text-pink-600 hover:underline">
					View All
				</Link>
			</div>

			{recent.length === 0 ? (
				<p className="text-sm text-gray-500 text-center">No bookings at the moment</p>
			) : (
				<div className="space-y-4">
					{recent.map((booking) => {
						const dateFrom = new Date(booking.dateFrom);
						const dateTo = new Date(booking.dateTo);
						const isPast = dateTo < new Date();

						return (
							<div
								key={booking.id}
								className="border rounded-lg px-4 py-3 flex justify-between items-center"
							>
								<div className="flex items-center gap-3">
									<img
										src={booking.customer.avatar.url}
										alt={booking.customer.avatar.alt}
										className="w-10 h-10 rounded-full"
									/>
									<div>
										<p className="font-medium">{booking.customer.name}</p>
										<p className="text-sm text-gray-500">
											{format(dateFrom, "MMM d")} - {format(dateTo, "MMM d, yyyy")}
										</p>
										<span
											className={`mt-1 inline-block text-xs font-medium px-2 py-0.5 rounded-full ${
												isPast
													? "bg-green-100 text-green-600"
													: "bg-blue-100 text-blue-600"
											}`}
										>
											{isPast ? "Completed" : "Upcoming"}
										</span>
									</div>
								</div>

								<div className="text-right">
									<p className="font-medium">{booking.venueName}</p>
									<p className="text-sm text-gray-600">${booking.price}</p>
								</div>
							</div>
						);
					})}
				</div>
			)}
		</div>
	);
}
