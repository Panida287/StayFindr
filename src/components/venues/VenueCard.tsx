import { Venue } from '../../types/venues.ts';
import { Star } from 'lucide-react';
import { truncateText } from '../../utilities/truncateText.ts';
import 'swiper/css';
import 'swiper/css/pagination';
import { Link } from 'react-router-dom';
import ImageGallery from './ImageGallery.tsx';

type Props = {
	venue: Venue;
};

export function VenueCard({venue}: Props) {
	const {name, location, price, rating, media} = venue;
	const images = media?.length ? media : [{url: 'https://placehold.co/400x300', alt: 'Placeholder'}];

	return (
		<Link to={`/venue/${venue.id}`}
		      className="rounded-xl overflow-hidden shadow-md relative bg-white">
			<ImageGallery images={images} altFallback={name} heightClass="h-48" />

			<div className="p-4 space-y-1">
				<h2 className="text-lg font-semibold">{truncateText(name, 20)}</h2>
				<p className="text-sm text-gray-500">
					{truncateText(location?.city, 20)}, {truncateText(location?.country, 20)}
				</p>
				<div className="flex items-center justify-between mt-2">
					<div className="flex items-center text-sm text-yellow-500 font-medium">
						<Star className="w-4 h-4 mr-1" />
						{rating.toFixed(1)}
					</div>
					<p className="text-right text-pink-600 font-semibold text-sm">
						${price} <span className="text-gray-500 text-xs">/night</span>
					</p>
				</div>
			</div>
		</Link>
	);
}
