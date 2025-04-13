import ImageGallery from '../venues/ImageGallery.tsx';
import { format, differenceInDays } from "date-fns";
import {Profile} from '../../types/profile.ts';

type MyBookingCardProps = {
	booking: Profile["bookings"][0];
};

export default function MyBookingCard({ booking }: MyBookingCardProps) {
	const { dateFrom, dateTo, guests, venue } = booking;

	const nights = differenceInDays(new Date(dateTo), new Date(dateFrom));
	const formattedFrom = format(new Date(dateFrom), "MMM d, yyyy");
	const formattedTo = format(new Date(dateTo), "MMM d, yyyy");

	return (
		<div className="border rounded-lg shadow-md overflow-hidden">
			<ImageGallery images={venue.media} altFallback={venue.name} heightClass="h-56" />

			<div className="p-4 space-y-2">
				<h3 className="text-xl font-semibold">{venue.name}</h3>
				<p className="text-sm text-gray-600">
					{venue.location.city}, {venue.location.country}
				</p>
				<p className="text-sm text-gray-600">
					{formattedFrom} → {formattedTo} ({nights} night{nights > 1 ? "s" : ""})
				</p>
				<p className="text-sm text-gray-600">Guests: {guests}</p>

				<div className="flex gap-2 mt-3">
					<button className="px-4 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300">
						Edit Guests
					</button>
					<button className="px-4 py-1 text-sm text-red-600 border border-red-500 rounded hover:bg-red-50">
						Cancel Booking
					</button>
				</div>
			</div>
		</div>
	);
}
