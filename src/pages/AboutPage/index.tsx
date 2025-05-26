import { Link } from 'react-router-dom';
import aboutImage from '/assets/images/ads-images/about-us.jpg';
import { CommonButton } from '../../components/commons/Buttons.tsx';

export default function AboutPage() {
	return (
		<div className="w-[calc(100%-2rem)] max-w-5xl mx-auto mt-24 mb-12">
			<h1 className="text-4xl font-bold text-primary text-center mb-10 pt-6">About StayFindr</h1>

			<div className="bg-white rounded-3xl overflow-hidden shadow-lg flex flex-col md:flex-row">
				<img
					src={aboutImage}
					alt="About StayFindr"
					className="w-full md:w-1/2 object-cover h-64 md:h-auto"
				/>

				<div className="p-6 space-y-4 md:w-1/2">
					<h2 className="text-2xl font-semibold text-primary">Who We Are</h2>
					<p className="text-gray-700 text-sm">
						StayFindr is a community-driven booking platform designed to connect travelers with
						unique stays around the world. Whether you're seeking a cozy cabin, a stylish apartment,
						or a beachfront escape, we help you find your perfect stay with ease.
					</p>
					<p className="text-gray-700 text-sm">
						We believe in seamless experiences, trustworthy hosts, and giving travelers the power to choose,
						book, and enjoy stays that feel like home.
					</p>
				</div>
			</div>

			{/* Contact Us Button */}
			<div className="flex justify-center mt-10">
				<Link to="/contact">
					<CommonButton
						bgColor="bg-primary"
						textColor="text-white"
						hoverColor="hover:bg-background"
						className="px-6 py-2"
					>
						Contact Us
					</CommonButton>
				</Link>
			</div>

			<div className="text-center text-sm text-gray-500 pt-10">
				&copy; {new Date().getFullYear()} StayFindr — Built with love, by passionate travelers.
			</div>
		</div>
	);
}
