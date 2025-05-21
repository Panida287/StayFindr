import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { SplitButton } from '../commons/Buttons.tsx';
import { Link } from 'react-router-dom';
import { useVenueStore } from '../../store/VenueStore.ts';
import 'swiper/css';

export default function TopVenuesCarousel() {
	const getTopVenues = useVenueStore((state) => state.getTopVenues);
	const topVenues = getTopVenues();

	return (
		<section className="relative -mt-[128px] h-[500px] overflow-hidden">
			{/* Left white fade overlay */}
			<div className="absolute w-1/2 h-full inset-y-10 left-0 z-20 bg-gradient-to-r from-black/60 via-black/50 to-transparent" />

			{/* Text content in top-left */}
			<div className="absolute top-56 left-10 z-30 flex flex-col text-secondary w-2/3 space-y-3 sm:1/2">

				<h2 className="text-4xl font-bold leading-tight font-heading">
					Find Your Perfect Stay
				</h2>
				<p className="hidden text-sm text-secondary w-2/3 sm:flex">
					Discover curated venues from across the globe. Experience exceptional stays in beautiful locations
					with ease.
				</p>
			</div>

			{/* Background image carousel */}
			<Swiper
				modules={[Autoplay, EffectFade]}
				effect="fade"
				fadeEffect={{crossFade: true}}
				spaceBetween={0}
				slidesPerView={1}
				autoplay={{
					delay: 7000,
					disableOnInteraction: false,
				}}
				loop={true}
				className="h-full !transform-none"
			>
				{topVenues.map((venue) => {
					const image = venue.media?.[0]?.url || '/placeholder.jpg';
					return (
						<SwiperSlide key={venue.id}>
							<div
								className="relative h-full w-full"
								style={{
									backgroundImage: `url(${image})`,
									backgroundSize: 'cover',
									backgroundPosition: 'center',
								}}
							>
								<div className="absolute bottom-20 right-10 z-50 text-right text-white">
									<p className="text-lg font-semibold drop-shadow">
										{venue.location?.city}, {venue.location?.country}
									</p>
									<Link to={`/venue/${venue.id}`} className="mt-2 inline-block">
										<SplitButton
											text="Book now"
											textColor="text-yellow-500"
											hoverTextColor="group-hover:text-yellow-500"
											arrowColor="text-white"
											arrowHoverColor="group-hover:text-yellow-500"
											bgColor="bg-yellow-500"
											borderColor="border-yellow-500"
											className="font-heading "
										/>
									</Link>
								</div>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</section>
	);
}
