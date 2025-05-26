import { Users } from 'lucide-react';
import { truncateText } from '../../utilities/truncateText';
import RatingBadge from '../commons/RatingBadge';
import AmenitiesIcons from '../commons/AmenitiesIcons';
import { FALLBACK } from '../../constants';
import { Venue } from '../../types/venues';
import SafeImage from '../../utilities/SafeImage';

type VenueWithAvailability = Venue & {
	isUnavailable?: boolean;
};

type Props = {
	/** Venue data with optional availability flag */
	venue: VenueWithAvailability;
};

/**
 * Card component displaying a venue's core information, image, rating, and amenities.
 */
export default function VenueCard({ venue }: Props) {
	const { name, location, price, media, maxGuests, isUnavailable, rating, meta } = venue;
	const img = media?.[0];

	return (
		<div className="flex flex-col rounded-xl overflow-hidden shadow-md relative bg-white hover:shadow-lg transition md:flex-row md:h-60">
			{isUnavailable && (
				<div className="absolute top-1 left-1 z-10 bg-red-600 text-white text-xs px-2 py-1 rounded">
					Unavailable during your selected dates
				</div>
			)}

			<div className="w-full h-60 md:max-w-56 lg:max-w-72">
				<SafeImage
					src={img?.url}
					alt={img?.alt || name}
					className="w-full h-full object-cover rounded-none"
				/>
			</div>

			<div className="flex flex-col justify-between p-4 space-y-2 w-full">
				<div>
					<h2 className="text-xl font-semibold">{truncateText(name, 30)}</h2>
					<p className="text-sm text-gray-500">
						{truncateText(location?.city || FALLBACK.city, 20)}, {' '}
						{truncateText(location?.country || FALLBACK.country, 20)}
					</p>
				</div>

				<div className="flex items-center justify-between">
					<RatingBadge rating={rating} />
					<p className="text-right text-primary font-semibold text-sm">
						{price} NOK <span className="text-gray-500 text-xs">/night</span>
					</p>
				</div>

				<div className="flex items-center gap-2 text-gray-600 text-sm">
					<Users className="w-4 h-4" />
					<span>Max guests: {maxGuests}</span>
				</div>

				<div className="flex items-center justify-between gap-4 mt-2 text-gray-600 text-sm">
					<AmenitiesIcons meta={meta} size={24} />
				</div>
			</div>
		</div>
	);
}
