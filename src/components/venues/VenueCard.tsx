import {Venue} from '../../types/venues.ts';
import { Heart, Star } from 'lucide-react';
import { truncateText } from '../../utilities/truncateText.ts';

type Props = {
	venue: Venue;
};

export function VenueCard({ venue }: Props) {
	const { name, location, price, rating, media } = venue;
	const image = media?.[0]?.url || 'https://placehold.co/400x300'; // fallback image

	return (
		<div className="rounded-xl overflow-hidden shadow-md relative bg-white">
			<img
				src={image}
				alt={media?.[0]?.alt || name}
				className="w-full h-48 object-cover"
			/>
			<button className="absolute top-3 right-3 bg-white rounded-full p-1 shadow">
				<Heart className="w-5 h-5 text-pink-500" />
			</button>
			<div className="p-4 space-y-1">
				<h2 className="text-lg font-semibold">{truncateText(name, 20)}</h2>
				<p className="text-sm text-gray-500">
					{truncateText(location?.city, 20)}, {truncateText(location?.country, 20)}
				</p>
				<div className="flex items-center justify-between mt-2">
					<div className="flex items-center text-sm text-yellow-500 font-medium">
						<Star className="w-4 h-4 mr-1" />
						{rating.toFixed(1)} <span className="text-gray-400 ml-1"></span>
					</div>
					<p className="text-right text-pink-600 font-semibold text-sm">
						${price} <span className="text-gray-500 text-xs">/night</span>
					</p>
				</div>
			</div>
		</div>
	);
}
