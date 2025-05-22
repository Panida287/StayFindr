import { useParams, useSearchParams } from 'react-router-dom';
import { useFetchSingleVenue } from '../../hooks/useFetchSingleVenue';
import { useHandleBooking } from '../../hooks/useHandleBooking';
import VenueMap from '../../components/venues/VenueMap';
import OwnerInfo from '../../components/venues/OwnerInfo';
import VenueAmenities from '../../components/venues/VenueAmenities';
import { MapPin, Users } from 'lucide-react';
import { FALLBACK } from '../../constants';
import { Booking } from '../../types/venues';
import BookingForm from '../../components/bookings/BookingForm';
import ImageGalleryAlternative from '../../components/venues/ImageGalleryAlternative';
import RatingBadge from '../../components/commons/RatingBadge';

export default function VenueDetailPage() {
	const { venueId } = useParams<{ venueId: string }>();
	const [search]   = useSearchParams();
	const rawStart   = search.get('dateFrom') || '';
	const rawEnd     = search.get('dateTo')   || '';
	const rawGuests  = parseInt(search.get('guests') || '1', 10);

	const initialStartDate = rawStart ? new Date(rawStart) : null;
	const initialEndDate   = rawEnd   ? new Date(rawEnd)   : null;
	const initialGuests    = rawGuests;

	const { venue, isLoading, error } = useFetchSingleVenue(venueId!);
	const { handleBooking, isBookingLoading, bookingError, success } =
		useHandleBooking(venue?.id);

	if (isLoading) return <p>Loading…</p>;
	if (error || !venue) return <p>{error || 'Venue not found.'}</p>;

	const fallbackImage   = FALLBACK.venue;
	const fallbackCity    = FALLBACK.city;
	const fallbackCountry = FALLBACK.Country;

	const {
		name, description, media,
		price, location, meta, maxGuests,
	} = venue;

	const images = media.length
		? media
		: [{ url: fallbackImage, alt: name }];

	const cityName    = location.city    || fallbackCity;
	const countryName = location.country || fallbackCountry;
	const safeLat     = location.lat     ?? FALLBACK.lat;
	const safeLng     = location.lng     ?? FALLBACK.lng;

	const bookedDateRanges = venue.bookings.map((b: Booking) => ({
		start: new Date(b.dateFrom),
		end:   new Date(b.dateTo),
	}));

	return (
		<div className="bg-white p-6 max-w-5xl mx-auto mt-24 rounded-xl">
			<ImageGalleryAlternative images={images} altFallback={name} />

			<div className="space-y-4 mt-6">
				<h1 className="text-5xl text-primary font-bold">{name}</h1>
				<p className="flex items-center text-gray-600 gap-2">
					<MapPin className="w-5 h-5" />
					{cityName}, {countryName}
				</p>

				<RatingBadge rating={venue.rating} />

				<p className="text-gray-700">{description}</p>
				<p className="text-primary font-semibold text-xl">
					{price} NOK / night
				</p>

				<div className="flex items-center gap-2 text-gray-600 text-sm">
					<Users className="w-4 h-4" />
					<span>Max guests: {maxGuests}</span>
				</div>

				<div className="bg-secondary rounded-xl px-6 py-2 text-primary text-sm">
					<h4 className="font-medium mb-2">Amenities</h4>
					<VenueAmenities meta={meta} />
				</div>

				<div className="flex flex-col md:flex-row gap-6">
					<div className="flex-1">
						<p className="flex items-center text-gray-600 gap-2 mb-2">
							<MapPin className="w-5 h-5" />
							{location.address}, {cityName}, {countryName}
						</p>
						<VenueMap lat={safeLat} lng={safeLng} name={name} />
					</div>
					<div className="md:w-1/3 bg-secondary rounded-xl p-6">
						<h4 className="font-semibold text-primary mb-4">Check availability</h4>
						<BookingForm
							price={price}
							maxGuests={maxGuests}
							bookedDateRanges={bookedDateRanges}
							handleBooking={handleBooking}
							isBookingLoading={isBookingLoading}
							bookingError={bookingError}
							success={success}
							initialStartDate={initialStartDate}
							initialEndDate={initialEndDate}
							initialGuests={initialGuests}
						/>
					</div>
				</div>

				<OwnerInfo owner={venue.owner} />
			</div>
		</div>
	);
}
