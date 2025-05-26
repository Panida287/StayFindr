import { FaFacebookF, FaInstagram } from 'react-icons/fa';

export default function NavigationFooter() {

	return (
		<footer className="bg-background w-full text-gray-light px-8 py-12 text-sm">
			<div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
				<div>
					<h4 className="text-primary font-bold mb-2">About</h4>
					<ul className="space-y-1">
						<li>How it works</li>
						<li>Careers</li>
						<li>Press</li>
					</ul>
				</div>
				<div>
					<h4 className="text-primary font-bold mb-2">Community</h4>
					<ul className="space-y-1">
						<li>Referral program</li>
						<li>Gift cards</li>
						<li>Forums</li>
					</ul>
				</div>
				<div>
					<h4 className="text-primary font-bold mb-2">Host</h4>
					<ul className="space-y-1">
						<li>Host your home</li>
						<li>Host experiences</li>
						<li>Resource center</li>
					</ul>
				</div>
				<div>
					<h4 className="text-primary font-bold mb-2">Support</h4>
					<ul className="space-y-1">
						<li>Help center</li>
						<li>Trust & safety</li>
						<li>Contact us</li>
					</ul>
				</div>
			</div>

			<div className="flex max-w-6xl mx-auto justify-between items-center mt-8 border-t border-gray text-xs pt-4">
				<span>© 2025 StayFindr</span>
				<div className="flex space-x-4 text-primary">
					<FaFacebookF className="w-4 h-4" />
					<FaInstagram className="w-4 h-4" />
				</div>

			</div>
		</footer>
	);
}
