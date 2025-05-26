import { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperType } from 'swiper';
import { Pagination } from 'swiper/modules';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';
import { FALLBACK } from '../../constants';

type Image = {
	url: string;
	alt?: string;
};

type Props = {
	images: Image[];
	altFallback?: string;
	heightClass?: string;
};

export default function ImageGallery({
	                                     images,
	                                     altFallback = '',
	                                     heightClass = 'h-48',
                                     }: Props) {
	const [currentIndex, setCurrentIndex] = useState(0);
	const swiperRef = useRef<SwiperType | null>(null);

	const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		e.currentTarget.src = FALLBACK.venue;
	};

	return (
		<div className={`relative group w-full ${heightClass}`}>
			<Swiper
				modules={[Pagination]}
				pagination={{ clickable: true }}
				onSwiper={(swiper) => (swiperRef.current = swiper)}
				onSlideChange={(swiper) => setCurrentIndex(swiper.activeIndex)}
				className={`w-full ${heightClass}`}
			>
				{images.map((image, index) => (
					<SwiperSlide key={index}>
						<img
							src={image.url}
							alt={image.alt || altFallback}
							onError={handleError}
							className={`w-full ${heightClass} object-cover`}
						/>
					</SwiperSlide>
				))}
			</Swiper>

			{currentIndex > 0 && (
				<button
					type="button"
					onClick={(e) => {
						e.preventDefault();
						swiperRef.current?.slidePrev();
					}}
					className="hidden group-hover:flex absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-1 rounded-full shadow"
				>
					<ChevronLeft className="w-4 h-4 text-gray-700" />
				</button>
			)}

			{currentIndex < images.length - 1 && (
				<button
					type="button"
					onClick={(e) => {
						e.preventDefault();
						swiperRef.current?.slideNext();
					}}
					className="hidden group-hover:flex absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white p-1 rounded-full shadow"
				>
					<ChevronRight className="w-4 h-4 text-gray-700" />
				</button>
			)}
		</div>
	);
}
