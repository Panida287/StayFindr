import { useParams } from 'react-router-dom';
import { useFetchSingleVenue } from '../../hooks/useFetchSingleVenue.ts';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Pagination } from 'swiper/modules';
import {
	Car,
	ChevronLeft,
	ChevronRight,
	Coffee,
	MapPin,
	PawPrint,
	Star,
	Wifi,
} from 'lucide-react';
import { useRef, useState } from 'react';
import VenueMap from '../../components/venues/VenueMap.tsx';

export default function VenueDetailPage() {
	const { venueId } = useParams<{ venueId: string }>();
	const { venue, isLoading, error } = useFetchSingleVenue(venueId!);
	const [currentIndex, setCurrentIndex] = useState(0);
	const swiperRef = useRef<SwiperType | null>(null);

	if (isLoading) return <p>Loading venue details...</p>;
	if (error || !venue) return <p>{error || 'Venue not found.'}</p>;

	const { name, description, media, rating, price, location, meta } = venue;
	const images = media?.length
		? media
		: [{ url: 'https://placehold.co/600x400', alt: 'No image' }];

	const fallbackLat = 59.9300048872585;
	const fallbackLng = 10.755947969218308;

	const safeLat = venue?.location?.lat ?? fallbackLat;
	const safeLng = venue?.location?.lng ?? fallbackLng;

	return (
		<div className="p-6 max-w-5xl mx-auto">
			<h1 className="text-2xl font-bold mb-4">{name}</h1>

			{/* Image gallery */}
			<div className="mb-6 relative group w-full h-48">
				<Swiper
					modules={[Pagination]}
					pagination={{ clickable: true }}
					onSwiper={(swiper) => (swiperRef.current = swiper)}
					onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
					className="w-full h-48"
				>
					{images.map((image, index) => (
						<SwiperSlide key={index}>
							<img
								src={image.url}
								alt={image.alt || name}
								className="w-full h-48 object-cover"
							/>
						</SwiperSlide>
					))}
				</Swiper>

				{currentIndex > 0 && (
					<button
						type="button"
						onClick={() => swiperRef.current?.slidePrev()}
						className="hidden group-hover:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-1 rounded-full shadow"
					>
						<ChevronLeft className="w-4 h-4 text-gray-700" />
					</button>
				)}

				{currentIndex < images.length - 1 && (
					<button
						type="button"
						onClick={() => swiperRef.current?.slideNext()}
						className="hidden group-hover:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-1 rounded-full shadow"
					>
						<ChevronRight className="w-4 h-4 text-gray-700" />
					</button>
				)}
			</div>

			<div className="space-y-4">
				<p className="text-gray-700">{description}</p>

				<div className="flex items-center gap-2 text-yellow-500">
					<Star className="w-5 h-5" />
					<span>{rating.toFixed(1)} / 5</span>
				</div>

				<p className="text-pink-600 font-semibold text-xl">
					${price} / night
				</p>

				<div className="flex items-center gap-2 text-gray-600">
					<MapPin className="w-4 h-4" />
					<span>
						{location.address}, {location.city}, {location.country}
					</span>
				</div>

				<VenueMap lat={safeLat} lng={safeLng} name={name} />

				{/* Amenities */}
				<div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-gray-700">
					{meta?.wifi && (
						<div className="flex items-center gap-2">
							<Wifi className="w-4 h-4" /> WiFi
						</div>
					)}
					{meta?.parking && (
						<div className="flex items-center gap-2">
							<Car className="w-4 h-4" /> Parking
						</div>
					)}
					{meta?.breakfast && (
						<div className="flex items-center gap-2">
							<Coffee className="w-4 h-4" /> Breakfast
						</div>
					)}
					{meta?.pets && (
						<div className="flex items-center gap-2">
							<PawPrint className="w-4 h-4" /> Pets Allowed
						</div>
					)}
				</div>

				{/* Owner Info */}
				<div className="mt-8 border-t pt-4">
					<h2 className="text-lg font-semibold mb-2">Hosted by</h2>
					<div className="flex items-center gap-4">
						<img
							src={
								venue.owner.avatar?.url ||
								'https://placehold.co/80x80'
							}
							alt={venue.owner.avatar?.alt || venue.owner.name}
							className="w-16 h-16 rounded-full object-cover border"
						/>
						<div>
							<p className="font-medium">{venue.owner.name}</p>
							<p className="text-sm text-gray-500">
								{venue.owner.email}
							</p>
							{venue.owner.bio && (
								<p className="text-sm mt-1">{venue.owner.bio}</p>
							)}
						</div>
					</div>
				</div>

				{/* Booking Calendar */}
				<div className="mt-8">

				</div>
			</div>
		</div>
	);
}
