import { useVenueStore } from '../../store/VenueStore.ts';
import TopVenueCard from './TopVenueCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

const TopVenuesCarousel = () => {
	const getTopVenues = useVenueStore((state) => state.getTopVenues);
	const topVenues = getTopVenues();

	return (
		<section className="px-4 py-10">
			<h2 className="text-4xl font-bold mb-6 text-center">Find Your Perfect Stay</h2>
			<Swiper
				modules={[Navigation, Pagination, Autoplay]}
				spaceBetween={20}
				slidesPerView={1}
				navigation
				pagination={{ clickable: true }}
				autoplay={{
					delay: 4000,
					disableOnInteraction: false,
				}}
				loop={true}
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
