import { Venue } from '../../types/venues.ts';
import { Star, Users, Wifi, ParkingCircle, Coffee, PawPrint, Slash } from 'lucide-react';
import { truncateText } from '../../utilities/truncateText.ts';
import 'swiper/css';
import 'swiper/css/pagination';
import ImageGallery from './ImageGallery.tsx';
import { SplitButton } from '../commons/Buttons.tsx';
import {FALLBACK} from '../../constants.ts';

type VenueWithAvailability = Venue & { isUnavailable?: boolean };

type Props = {
	venue: VenueWithAvailability;
};

export function VenueCard({ venue }: Props) {
	const { name, location, price, rating, media, maxGuests, isUnavailable } = venue;
	const images = media?.length && media[0]?.url
		? media
		: [{ url: FALLBACK.venue, alt: 'Fallback Venue Image' }];

	return (
		<a
			href={`/venue/${venue.id}`}
			target="_blank"
			rel="noopener noreferrer"
			className="flex flex-col rounded-xl overflow-hidden shadow-md relative bg-white hover:shadow-lg transition md:flex-row md:h-60"
		>
			{/* Availability Tag */}
			{isUnavailable && (
				<div className="absolute top-2 left-2 z-10 bg-red-600 text-white text-xs px-2 py-1 rounded">
					Not available during your selected dates
				</div>
			)}

			{/* Image Section */}
			<div className="w-full h-60 md:max-w-72">
				<ImageGallery images={images} altFallback={name} heightClass="h-full" />
			</div>

			{/* Content Section */}
			<div className="flex flex-col justify-between p-4 space-y-2 w-full">
				<div>
					<h2 className="text-xl font-semibold">{truncateText(name, 30)}</h2>
					<p className="text-sm text-gray-500">
						{truncateText(location?.city || FALLBACK.city, 20)}, {truncateText(location?.country || FALLBACK.Country, 20)}
					</p>
				</div>

				<div className="flex items-center justify-between">
					<div className="flex items-center text-sm text-yellow-500 font-medium">
						<Star className="w-4 h-4 mr-1" />
						{rating.toFixed(1)}
					</div>
					<p className="text-right text-primary font-semibold text-sm">
						{price} NOK <span className="text-gray-500 text-xs">/night</span>
					</p>
				</div>

				<div className="flex items-center gap-2 text-gray-600 text-sm">
					<Users className="w-4 h-4" />
					<span>Max guests: {maxGuests}</span>
				</div>

				{/* Amenities + Button */}
				<div className="flex flex-col justify-between items-center gap-4 mt-2 text-gray-600 text-sm md:flex-row md:items-end">
					{/* Amenities */}
					<div className="flex items-center gap-4">
						{/* Wifi */}
						<div className="relative w-5 h-5" title="Wi-Fi">
							<Wifi className={`w-5 h-5 ${venue.meta?.wifi ? 'text-gray-600' : 'text-gray-300'}`} />
							{!venue.meta?.wifi && (
								<Slash className="absolute inset-0 w-5 h-5 text-gray-300" />
							)}
						</div>

						{/* Parking */}
						<div className="relative w-5 h-5" title="Parking">
							<ParkingCircle className={`w-5 h-5 ${venue.meta?.parking ? 'text-gray-600' : 'text-gray-300'}`} />
							{!venue.meta?.parking && (
								<Slash className="absolute inset-0 w-5 h-5 text-gray-300" />
							)}
						</div>

						{/* Breakfast */}
						<div className="relative w-5 h-5" title="Breakfast">
							<Coffee className={`w-5 h-5 ${venue.meta?.breakfast ? 'text-gray-600' : 'text-gray-300'}`} />
							{!venue.meta?.breakfast && (
								<Slash className="absolute inset-0 w-5 h-5 text-gray-300" />
							)}
						</div>

						{/* Pets */}
						<div className="relative w-5 h-5" title="Pets allowed">
							<PawPrint className={`w-5 h-5 ${venue.meta?.pets ? 'text-gray-600' : 'text-gray-300'}`} />
							{!venue.meta?.pets && (
								<Slash className="absolute inset-0 w-5 h-5 text-gray-300" />
							)}
						</div>
					</div>

					{/* Book Now Button */}
					<div className="w-full sm:w-auto flex justify-end">
						<SplitButton
							text="Book Now"
							onClick={() => window.open(`/venue/${venue.id}`, '_blank')}
							bgColor="bg-primary"
							textColor="text-primary"
							arrowColor="text-white"
							arrowHoverColor="group-hover:text-primary"
						/>
					</div>
				</div>
			</div>
		</a>
	);
}
