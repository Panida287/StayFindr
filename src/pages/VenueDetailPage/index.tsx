import { useParams } from 'react-router-dom';
import { useFetchSingleVenue } from '../../hooks/useFetchSingleVenue';
import { useHandleBooking } from '../../hooks/useHandleBooking';
import VenueMap from '../../components/venues/VenueMap';
import OwnerInfo from '../../components/venues/OwnerInfo';
import VenueAmenities from '../../components/venues/VenueAmenities';
import { MapPin, Star, Users } from 'lucide-react';
import { FALLBACK } from '../../constants.ts';
import { Booking } from '../../types/venues.ts';
import BookingForm from '../../components/bookings/BookingForm.tsx';
import ImageGalleryAlternative from '../../components/venues/ImageGalleryAlternative.tsx';

export default function VenueDetailPage() {
	const { venueId } = useParams<{ venueId: string }>();
	const { venue, isLoading, error } = useFetchSingleVenue(venueId!);
	const {
		handleBooking,
		isBookingLoading,
		bookingError,
		success,
	} = useHandleBooking(venue?.id);

	if (isLoading) return <p>Loading venue details...</p>;
	if (error || !venue) return <p>{error || 'Venue not found.'}</p>;

	const { name, description, media, rating, price, location, meta, maxGuests } = venue;
	const images = media?.length
		? media
		: [{ url: 'https://placehold.co/600x400', alt: 'No image' }];

	const safeLat = venue?.location?.lat ?? FALLBACK.lat;
	const safeLng = venue?.location?.lng ?? FALLBACK.lng;

	const bookedDateRanges = venue.bookings.map((booking: Booking) => ({
		start: new Date(booking.dateFrom),
		end: new Date(booking.dateTo),
	}));

	return (
		<div className="p-6 max-w-5xl mt-20 mx-auto">
			<h1 className="text-2xl font-bold mb-4">{name}</h1>

			<ImageGalleryAlternative images={images} altFallback={name} />

			<div className="space-y-4">
				<p className="text-gray-700">{description}</p>

				<div className="flex items-center gap-2 text-yellow-500">
					<Star className="w-5 h-5" />
					<span>{rating.toFixed(1)} / 5</span>
				</div>

				<p className="text-pink-600 font-semibold text-xl">${price} / night</p>

				<div className="flex items-center gap-2 text-gray-600 text-sm">
					<Users className="w-4 h-4" />
					<span>Max guests: {maxGuests}</span>
				</div>

				<VenueAmenities meta={meta} />

				<div>
					<div className="flex items-center gap-2 text-gray-600">
						<MapPin className="w-4 h-4" />
						<span>{location.address}, {location.city}, {location.country}</span>
					</div>
					<VenueMap lat={safeLat} lng={safeLng} name={name} />
				</div>

				<OwnerInfo owner={venue.owner} />

				<BookingForm
					price={price}
					maxGuests={maxGuests}
					bookedDateRanges={bookedDateRanges}
					handleBooking={handleBooking}
					isBookingLoading={isBookingLoading}
					bookingError={bookingError}
					success={success}
				/>

			</div>
		</div>
	);
}
