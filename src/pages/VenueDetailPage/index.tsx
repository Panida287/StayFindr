import { useParams } from 'react-router-dom';
import { useFetchSingleVenue } from '../../hooks/useFetchSingleVenue.ts';
import { useState } from 'react';
import VenueMap from '../../components/venues/VenueMap.tsx';
import OwnerInfo from '../../components/venues/OwnerInfo.tsx';
import BookingCalendar from '../../components/bookings/BookingCalendar.tsx';
import VenueAmenities from '../../components/venues/VenueAmenities.tsx';
import ImageGallery from '../../components/venues/ImageGallery.tsx';
import {
	MapPin,
	Star,
} from 'lucide-react';

export default function VenueDetailPage() {
	const {venueId} = useParams<{ venueId: string }>();
	const {venue, isLoading, error} = useFetchSingleVenue(venueId!);
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);

	if (isLoading) return <p>Loading venue details...</p>;
	if (error || !venue) return <p>{error || 'Venue not found.'}</p>;

	const {name, description, media, rating, price, location, meta} = venue;
	const images = media?.length
		? media
		: [{url: 'https://placehold.co/600x400', alt: 'No image'}];

	const fallbackLat = 59.9300048872585;
	const fallbackLng = 10.755947969218308;

	const safeLat = venue?.location?.lat ?? fallbackLat;
	const safeLng = venue?.location?.lng ?? fallbackLng;

	return (
		<div className="p-6 max-w-5xl mx-auto">
			<h1 className="text-2xl font-bold mb-4">{name}</h1>

			{/* Image gallery */}
			<ImageGallery images={images} altFallback={name} heightClass="h-48" />

			<div className="space-y-4">
				<p className="text-gray-700">{description}</p>

				<div className="flex items-center gap-2 text-yellow-500">
					<Star className="w-5 h-5" />
					<span>{rating.toFixed(1)} / 5</span>
				</div>

				<p className="text-pink-600 font-semibold text-xl">
					${price} / night
				</p>

				{/* Amenities */}
				<VenueAmenities meta={meta} />

				{/* Address and map */}
				<div>
					<div className="flex items-center gap-2 text-gray-600">
						<MapPin className="w-4 h-4" />
						<span>
						{location.address}, {location.city}, {location.country}
					</span>
					</div>
					<VenueMap lat={safeLat} lng={safeLng} name={name} />
				</div>


				{/* Owner Info */}
				<OwnerInfo owner={venue.owner} />

				{/* Booking Calendar */}
				<div className="mt-8">
					<BookingCalendar onDateChange={(start, end) => {
						setStartDate(start);
						setEndDate(end);
					}} />
					{startDate && endDate && (
						<p className="text-sm text-green-600">
							Booking from {startDate.toDateString()} to {endDate.toDateString()}
						</p>
					)}

				</div>
			</div>
		</div>
	);
}
