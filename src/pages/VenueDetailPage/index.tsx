import { useParams } from 'react-router-dom';
import { useFetchSingleVenue } from '../../hooks/useFetchSingleVenue';
import { useHandleBooking } from '../../hooks/useHandleBooking';
import { useState } from 'react';
import VenueMap from '../../components/venues/VenueMap';
import OwnerInfo from '../../components/venues/OwnerInfo';
import BookingCalendar from '../../components/bookings/BookingCalendar';
import VenueAmenities from '../../components/venues/VenueAmenities';
import ImageGallery from '../../components/venues/ImageGallery';
import { calculateNights } from '../../utilities/calculateNights';
import { MapPin, Star, Users } from 'lucide-react';
import { FALLBACK } from '../../constants.ts';

export default function VenueDetailPage() {
	const { venueId } = useParams<{ venueId: string }>();
	const { venue, isLoading, error } = useFetchSingleVenue(venueId!);
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [guests, setGuests] = useState<number>(1);

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

	const bookedDateRanges = venue.bookings.map((booking) => ({
		start: new Date(booking.dateFrom),
		end: new Date(booking.dateTo),
	}));

	return (
		<div className="p-6 max-w-5xl mx-auto">
			<h1 className="text-2xl font-bold mb-4">{name}</h1>

			<ImageGallery images={images} altFallback={name} heightClass="h-48" />

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

				<div className="mt-8">
					<BookingCalendar
						onDateChange={(start, end) => {
							setStartDate(start);
							setEndDate(end);
						}}
						bookedRanges={bookedDateRanges}
					/>

					{startDate && endDate && (
						<p className="text-sm text-green-600">
							Booking from {startDate.toDateString()} to {endDate.toDateString()}
						</p>
					)}

					<div className="mt-4">
						<label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
							Number of Guests
						</label>
						<select
							id="guests"
							name="guests"
							value={guests}
							onChange={(e) => setGuests(Number(e.target.value))}
							className="border rounded px-3 py-2 w-32 text-sm"
						>
							{Array.from({ length: maxGuests }, (_, i) => i + 1).map((num) => (
								<option key={num} value={num}>
									{num} {num === 1 ? 'guest' : 'guests'}
								</option>
							))}
						</select>
						<p className="text-xs text-gray-500 mt-1">Max {maxGuests} guests allowed</p>
					</div>

					{startDate && endDate && (
						<div className="text-pink-600 font-semibold text-lg mt-2">
							Total price: ${calculateNights(startDate, endDate) * price}
						</div>
					)}

					<button
						onClick={() => handleBooking(startDate, endDate, guests)}
						className="mt-4 px-4 py-2 bg-pink-600 text-white rounded disabled:opacity-50"
						disabled={isBookingLoading || !startDate || !endDate}
					>
						{isBookingLoading ? 'Booking...' : 'Book Now'}
					</button>

					{bookingError && (
						<p className="text-sm text-red-600 mt-2">{bookingError}</p>
					)}
					{success && (
						<p className="text-sm text-green-600 mt-2">Booking successful!</p>
					)}
				</div>
			</div>
		</div>
	);
}
