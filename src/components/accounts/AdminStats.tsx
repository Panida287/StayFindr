import { Building, CalendarCheck, Star, DollarSign } from "lucide-react";
import { Venue } from "../../types/venues";

type Props = {
	venues: Venue[];
};

export default function AdminStats({ venues }: Props) {
	const totalVenues = venues.length;

	const allBookings = venues.flatMap(venue => venue.bookings || []);

	const activeBookings = allBookings.length;

	const avgRating = venues.length
		? (venues.reduce((acc, venue) => acc + venue.rating, 0) / venues.length).toFixed(1)
		: "0.0";

	const totalRevenue = venues.reduce((sum, venue) => {
		const bookingCount = venue.bookings?.length || 0;
		return sum + (bookingCount * venue.price);
	}, 0);

	return (
		<div className="grid grid-cols-2 md:grid-cols-4 gap-6 my-6">
			<StatCard icon={<Building className="text-pink-500" />} label="Total Venues" value={totalVenues} />
			<StatCard icon={<CalendarCheck className="text-blue-500" />} label="Active Bookings" value={activeBookings} />
			<StatCard icon={<Star className="text-yellow-500" />} label="Avg Rating" value={avgRating} />
			<StatCard icon={<DollarSign className="text-green-600" />} label="Revenue" value={`$${(totalRevenue / 1000).toFixed(1)}k`} />
		</div>
	);
}

function StatCard({ icon, label, value }: { icon: React.ReactNode; label: string; value: string | number }) {
	return (
		<div className="p-4 bg-white rounded-lg shadow">
			<div className="flex items-center justify-between mb-1 text-gray-600 text-sm font-medium">
				{icon}
				<span className="text-end">{label}</span>
			</div>
			<div className="text-2xl font-bold flex justify-end items-center text-black">{value}</div>
		</div>
	);
}
