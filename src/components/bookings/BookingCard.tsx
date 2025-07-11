import { Booking } from '../../types/venues';
import { format } from 'date-fns';
import clsx from 'clsx';
import SafeImage from '../../utilities/SafeImage.tsx';

type Props = {
	/** A booking object containing customer, venue, and date info */
	booking: Booking;
};

/**
 * Displays a single booking card with guest info, date range, and pricing.
 * Used by venue managers to track bookings on their venues.
 */
export default function BookingCard({ booking }: Props) {
	const now = new Date();
	const from = new Date(booking.dateFrom);
	const to = new Date(booking.dateTo);

	const isOngoing = now >= from && now <= to;
	const isCompleted = to < now;

	const formattedFrom = format(from, 'MMM d');
	const formattedTo = format(to, 'MMM d, yyyy');

	const oneDay = 1000 * 60 * 60 * 24;
	const nights = Math.ceil((to.getTime() - from.getTime()) / oneDay);
	const totalPrice = nights * booking.venue.price;

	return (
		<div
			className="bg-white rounded-xl shadow-sm p-4 grid grid-cols-2"
			aria-label={`Booking for ${booking.customer.name} at ${booking.venue.name}`}
		>
			{/* Customer Info & Status */}
			<div className="flex items-start gap-3 h-full">
				<SafeImage
					src={booking.customer.avatar?.url}
					alt={booking.customer.avatar?.alt || booking.customer.name}
					className="w-10 h-10 rounded-full object-cover"
				/>

				<div className="flex flex-col items-start justify-between gap-3 h-full">
					<p className="font-medium">{booking.customer.name}</p>
					<p className="text-sm text-gray-500">
						{formattedFrom} – {formattedTo}
					</p>
					<span
						className={clsx(
							'text-xs font-semibold px-2 py-1 rounded-full inline-block mt-1',
							isOngoing
								? 'bg-yellow-100 text-yellow-700'
								: isCompleted
									? 'bg-green-100 text-green-700'
									: 'bg-blue-100 text-blue-700'
						)}
					>
						{isOngoing ? 'Ongoing' : isCompleted ? 'Completed' : 'Upcoming'}
					</span>
				</div>
			</div>

			{/* Venue Info & Pricing */}
			<div className="text-right text-sm flex flex-col items-end gap-2">
				<p className="font-semibold text-base">{booking.venue.name}</p>
				<p className="text-gray-600">Guests: {booking.guests}</p>
				<p className="text-gray-600">
					${booking.venue.price.toLocaleString()} / night × {nights} night{nights > 1 ? 's' : ''}
				</p>
				<p className="font-semibold text-primary">
					Total: ${totalPrice.toLocaleString()}
				</p>
			</div>
		</div>
	);
}
