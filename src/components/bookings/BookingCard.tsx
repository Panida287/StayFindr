import { Booking } from "../../types/venues";
import { format } from "date-fns";
import clsx from "clsx";

type Props = {
	booking: Booking;
};

export default function BookingCard({ booking }: Props) {
	const now = new Date();
	const from = new Date(booking.dateFrom);
	const to = new Date(booking.dateTo);
	const isCompleted = to < now;

	const formattedFrom = format(from, "MMM d");
	const formattedTo = format(to, "MMM d, yyyy");

	return (
		<div className="bg-white rounded-xl shadow-sm p-4 flex justify-between items-center gap-4">
			<div className="flex items-center gap-3">
				<img
					src={booking.customer.avatar?.url || "/assets/avatar-placeholder.png"}
					alt={booking.customer.avatar?.alt || "User"}
					className="w-10 h-10 rounded-full object-cover"
				/>
				<div>
					<p className="font-medium">{booking.customer.name}</p>
					<p className="text-sm text-gray-500">
						{formattedFrom} - {formattedTo}
					</p>
					<span
						className={clsx(
							"text-xs font-semibold px-2 py-1 rounded-full inline-block mt-1",
							isCompleted ? "bg-green-100 text-green-700" : "bg-blue-100 text-blue-700"
						)}
					>
						{isCompleted ? "Completed" : "Upcoming"}
					</span>
				</div>
			</div>

			<div className="text-right">
				<p className="font-semibold">{booking.venue.name}</p>
				<p className="text-sm text-gray-600">
					${booking.venue.price.toLocaleString()}
				</p>
			</div>
		</div>
	);
}
