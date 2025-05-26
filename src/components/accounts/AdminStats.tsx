import { Building, CalendarCheck, Star, DollarSign } from 'lucide-react';
import { Venue } from '../../types/venues';
import React from 'react';

type Props = {
	/** Array of venues owned by the admin */
	venues: Venue[];
};

/**
 * Displays key statistics for venue managers: total venues, bookings, average rating, and revenue.
 */
export default function AdminStats({ venues }: Props) {
	const totalVenues = venues.length;

	const allBookings = venues.flatMap(venue => venue.bookings || []);
	const totalBookings = allBookings.length;

	const avgRating = totalVenues
		? (venues.reduce((acc, venue) => acc + venue.rating, 0) / totalVenues).toFixed(1)
		: '0.0';

	const totalRevenue = venues.reduce((sum, venue) => {
		const bookingCount = venue.bookings?.length || 0;
		return sum + bookingCount * venue.price;
	}, 0);

	return (
		<section className="grid grid-cols-2 md:grid-cols-4 gap-6 my-6" aria-label="Admin Statistics Overview">
			<StatCard
				icon={<Building className="text-pink-500" aria-hidden="true" />}
				label="Total Venues"
				value={totalVenues}
			/>
			<StatCard
				icon={<CalendarCheck className="text-blue-500" aria-hidden="true" />}
				label="Total Bookings"
				value={totalBookings}
			/>
			<StatCard
				icon={<Star className="text-yellow-500" aria-hidden="true" />}
				label="Average Rating"
				value={avgRating}
			/>
			<StatCard
				icon={<DollarSign className="text-green-600" aria-hidden="true" />}
				label="Revenue"
				value={`$${(totalRevenue / 1000).toFixed(1)}k`}
			/>
		</section>
	);
}

type StatCardProps = {
	icon: React.ReactNode;
	label: string;
	value: string | number;
};

/**
 * Individual card displaying one stat with an icon and value.
 */
function StatCard({ icon, label, value }: StatCardProps) {
	return (
		<article
			className="p-4 bg-white rounded-lg shadow"
			aria-label={`${label}: ${value}`}
		>
			<div className="flex items-center justify-between mb-1 text-gray-600 text-sm font-medium">
				{icon}
				<span className="text-end">{label}</span>
			</div>
			<div className="text-2xl font-bold flex justify-end items-center text-black">
				{value}
			</div>
		</article>
	);
}
