import React from 'react';
import { SplitButton } from '../Buttons.tsx';

/**
 * Homepage promotional section that introduces StayFindr with imagery
 * and a call-to-action button linking to the About page.
 */
const AdsAbout: React.FC = () => {
	return (
		<section
			className="relative w-full mt-4 max-w-5xl mx-auto flex flex-col-reverse items-center p-6 md:flex-row"
			aria-label="About StayFindr promotional section"
		>
			{/* Text & CTA */}
			<div className="w-full md:w-1/2 space-y-4">
				<h2 className="text-4xl font-bold text-primary">About StayFindr</h2>
				<p className="text-primary indent-10 text-sm">
					Welcome to StayFindr – your trusted hotel booking partner. We make it easy to find and book the
					perfect stay, whether for business or vacation. Enjoy a seamless experience with handpicked hotels,
					great deals, and 24/7 support.
				</p>
				<SplitButton
					to="/about"
					text="Explore More"
					bgColor="bg-gray-800"
					borderColor="border-gray-800"
					textColor="text-primary"
					arrowColor="text-white"
					hoverTextColor="group-hover:text-gray-800"
					className="mt-2"
				/>
			</div>

			{/* Image collage */}
			<div className="w-full flex justify-center md:justify-end gap-4 mb-6 md:mb-0 md:w-1/2">
				<div className="space-y-4">
					<div className="relative">
						<img
							src="/assets/images/ads-images/ads-1.jpg"
							alt="Hotel lobby with welcoming atmosphere"
							className="rounded-lg object-cover h-48 w-full shadow-lg md:w-32"
						/>
						<span className="absolute inset-2 border border-secondary/50 rounded-md pointer-events-none" />
					</div>
					<div className="relative">
						<img
							src="/assets/images/ads-images/ads-2.jpg"
							alt="Cozy room interior with modern decor"
							className="rounded-lg object-cover h-48 w-full shadow-lg md:w-32"
						/>
						<span className="absolute inset-2 border border-secondary/50 rounded-md pointer-events-none" />
					</div>
				</div>
				<div className="relative">
					<img
						src="/assets/images/ads-images/ads-3.jpg"
						alt="Beautiful outdoor patio of a rental venue"
						className="rounded-lg object-cover h-96 shadow-lg md:w-40"
					/>
					<span className="absolute inset-2 border border-secondary/50 h-full rounded-md pointer-events-none" />
				</div>
			</div>

			{/* Decorative SVG path */}
			<svg
				className="hidden md:block absolute top-52 left-0 w-full h-full pointer-events-none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M20,180 C200,100 400,300 600,200"
					stroke="#D1D5DB"
					strokeDasharray="8 4"
					fill="none"
				/>
			</svg>
		</section>
	);
};

export default AdsAbout;
