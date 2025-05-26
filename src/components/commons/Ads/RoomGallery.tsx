import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

interface Room {
	id: number;
	imageUrl: string;
	title: string;
	details: string;
}

interface RoomGalleryProps {
	rooms: Room[];
}

export const RoomGallery: React.FC<RoomGalleryProps> = ({ rooms }) => {
	return (
		<section className="bg-yellow-700 bg-opacity-20 py-12 px-4 md:px-10 lg:px-20 text-center">
			<div className="mb-8">
				<h2 className="text-4xl font-semibold text-primary">Choose Your Room</h2>
				<p className="text-primary mx-auto text-sm mt-4 max-w-xl">
					Explore a variety of rooms tailored to your comfort and style. Whether you're traveling solo or with family, find the perfect space to unwind.
				</p>
			</div>

			<Swiper
				modules={[Pagination, Navigation]}
				spaceBetween={20}
				loop={true}
				slidesPerView={1}
				centeredSlides={true}
				breakpoints={{
					768: { slidesPerView: 2 },
					1024: { slidesPerView: 3 },
				}}
				pagination={{ clickable: true }}
				navigation
				className="mb-8"
			>
				{rooms.map(room => (
					<SwiperSlide key={room.id}>
						<div className="relative group rounded-xl overflow-hidden shadow-lg">
							<img
								src={room.imageUrl}
								alt={room.title}
								className="h-72 w-full object-cover group-hover:scale-110 transition-transform duration-300"
							/>
							<div className="absolute top-0 bg-gradient-to-b from-black/70 to-transparent text-white w-full py-4 px-2 text-center">
								<h3 className="font-semibold text-lg text-white">{room.title}</h3>
								<p className="text-sm text-white">{room.details}</p>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>

			<button className="inline-flex items-center gap-2 bg-yellow-700 hover:bg-yellow-800 text-white rounded-full px-6 py-3 transition duration-300 shadow-md">
				Explore All Suite
			</button>
		</section>
	);
};
