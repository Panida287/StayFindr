import { useVenueStore } from '../../store/VenueStore.ts';
import TopVenueCard from './TopVenueCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

const TopVenuesCarousel = () => {
	const getTopVenues = useVenueStore((state) => state.getTopVenues);
	const topVenues = getTopVenues();

	return (
		<section className="relative -mt-[128px] h-[500px]">
			<div className="absolute inset-0 z-20 flex items-center justify-center text-center pointer-events-none">
				<h2 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
					Find Your Perfect Stay
				</h2>
			</div>

			<Swiper
				modules={[Autoplay]}
				spaceBetween={20}
				slidesPerView={1}
				pagination={{clickable: true}}
				autoplay={{
					delay: 7000,
					disableOnInteraction: false,
				}}
				loop={true}
				className="h-full !transform-none"
			>
				{topVenues.map((venue) => (
					<SwiperSlide key={venue.id}>
						<TopVenueCard venue={venue} />
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
};

export default TopVenuesCarousel;
