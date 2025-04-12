import { useRef, useState } from 'react';
import { Venue } from '../../types/venues.ts';
import { Heart, Star, ChevronLeft, ChevronRight } from 'lucide-react';
import { truncateText } from '../../utilities/truncateText.ts';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

type Props = {
	venue: Venue;
};

export function VenueCard({ venue }: Props) {
	const { name, location, price, rating, media } = venue;
	const images = media?.length ? media : [{ url: 'https://placehold.co/400x300', alt: 'Placeholder' }];
	const [currentIndex, setCurrentIndex] = useState(0);
	const swiperRef = useRef<SwiperType | null>(null);

	return (
		<Link to={`/venue/${venue.id}`}
			className="rounded-xl overflow-hidden shadow-md relative bg-white">
			<div className="relative w-full h-48 group">
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

				{/* Left arrow — only show if not on first slide */}
				{currentIndex > 0 && (
					<button
						type="button"
						onClick={() => swiperRef.current?.slidePrev()}
						className="hidden group-hover:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-1 rounded-full shadow"
					>
						<ChevronLeft className="w-4 h-4 text-gray-700" />
					</button>
				)}

				{/* Right arrow — only show if not on last slide */}
				{currentIndex < images.length - 1 && (
					<button
						type="button"
						onClick={() => swiperRef.current?.slideNext()}
						className="hidden group-hover:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-1 rounded-full shadow"
					>
						<ChevronRight className="w-4 h-4 text-gray-700" />
					</button>
				)}

				{/* Favorite icon */}
				<button className="absolute top-3 right-3 bg-white rounded-full p-1 shadow z-10">
					<Heart className="w-5 h-5 text-pink-500" />
				</button>
			</div>

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
