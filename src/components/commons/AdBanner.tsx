import { SplitButton } from './Buttons.tsx';

export default function AdBanner() {
	return (
		<section
			className="relative w-[calc(100%-2rem)] max-w-5xl rounded-2xl mx-auto h-64 bg-cover bg-center overflow-hidden shadow-lg md:h-72"
			style={{
				backgroundImage: "url('/assets/images/banner-promo.jpg')",
			}}
		>
			<div className="absolute inset-0 bg-black/40 z-10" />
			<div className="relative z-20 h-full flex flex-col justify-center items-start px-6 text-white md:px-12 ">
				<h2 className="text-2xl font-bold mb-2 md:text-4xl ">Escape to Paradise</h2>
				<p className="text-sm mb-4 max-w-md md:text-lg ">
					Book your summer getaway now and get up to 30% off selected stays!
				</p>
				<SplitButton
					text="Explore Offers"
					textColor="text-yellow-500"
					hoverTextColor="group-hover:text-yellow-500"
					arrowColor="text-white"
					arrowHoverColor="group-hover:text-yellow-500"
					bgColor="bg-yellow-500"
					borderColor="border-yellow-500"
					className="font-heading "
				/>
			</div>
		</section>
	);
}