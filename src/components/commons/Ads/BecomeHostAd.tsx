import { Link } from 'react-router-dom';

/**
 * Vertical promotional banner encouraging users to become a host.
 * Used in sidebars or ads, featuring a CTA and background image.
 */
export default function BecomeHostAd() {
	return (
		<div
			className="relative w-full h-[30rem] rounded-xl overflow-hidden shadow border border-primary/20 mt-6"
			aria-label="Call to action: Become a StayFindr host"
		>
			<img
				src="/assets/images/ads-images/host-ad.jpg"
				alt="Scenic view representing the benefits of hosting"
				className="absolute inset-0 w-full h-full object-cover"
			/>

			<div className="absolute inset-0 bg-black/50 flex flex-col justify-between p-4 text-white">
				<div>
					<h3 className="text-lg font-semibold mb-1">Become a Host</h3>
					<p className="text-sm text-white/90">
						Share your space and earn money by hosting travelers.
					</p>
				</div>

				<div>
					<Link
						to="/register?type=manager"
						className="inline-block text-center text-sm px-4 py-2 bg-primary rounded-full hover:text-primary hover:bg-background transition"
					>
						Start Hosting
					</Link>
				</div>
			</div>
		</div>
	);
}
