import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade } from 'swiper/modules';
import { SplitButton } from '../commons/Buttons';
import LoadingSpinner from '../commons/LoadingSpinner';     // ← import spinner
import { useVenueStore } from '../../store/VenueStore';
import 'swiper/css';
import { FALLBACK } from '../../constants';

export default function TopVenuesCarousel() {
	const getTopVenues = useVenueStore((s) => s.getTopVenues);
	const topVenues    = getTopVenues();

	// grab the loading flag from your store
	const isLoading    = useVenueStore((s) => s.isLoading);

	// while loading, show spinner in the same box size as your carousel
	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-[500px] w-full">
				<LoadingSpinner size={64} colorClass="text-primary" />
			</div>
		);
	}

	return (
		<section className="relative h-[500px] w-full overflow-hidden mx-auto">
			{/* left fade, heading, etc. */}
			<div className="absolute hidden w-2/3 h-full left-0 z-20 bg-gradient-to-r from-white/90 via-white/60 to-transparent md:flex" />
			<div className="absolute hidden top-48 z-30 text-secondary w-full space-y-3 md:flex md:justify-center">
				<div className="absolute w-[calc(100%-2rem)] max-w-5xl mx-auto">
					<h2 className="text-5xl font-extrabold text-black leading-tight font-heading">
						Find Your Perfect Stay
					</h2>
					<p className="hidden text-md font-medium text-black w-60 mt-4 sm:flex">
						Discover curated venues from across the globe. Experience exceptional stays in beautiful locations with ease.
					</p>
				</div>
			</div>

			{/* image carousel */}
			<Swiper
				modules={[Autoplay, EffectFade]}
				effect="fade"
				fadeEffect={{ crossFade: true }}
				spaceBetween={0}
				slidesPerView={1}
				autoplay={{ delay: 2000, disableOnInteraction: false }}
				loop
				className="h-full"
			>
				{topVenues.map((venue) => {
					const image = venue.media?.[0]?.url || FALLBACK.venue;
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
										{venue.location?.city || FALLBACK.city}, {venue.location?.country || FALLBACK.country}
									</p>
									<SplitButton
										text="Book now"
										to={`/venue/${venue.id}`}
										textColor="text-yellow-500"
										hoverTextColor="group-hover:text-yellow-500"
										arrowColor="text-white"
										arrowHoverColor="group-hover:text-yellow-500"
										bgColor="bg-yellow-500"
										borderColor="border-yellow-500"
										className="font-heading mt-2"
									/>
								</div>
							</div>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</section>
	);
}
