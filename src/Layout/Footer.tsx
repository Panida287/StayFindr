import { NavLink } from "react-router-dom";
import useBreakpoint from "../hooks/useBreakpoint.ts";
import {
	Home,
	Bookmark,
	Heart,
	User,
} from "lucide-react";
import { FaFacebookF, FaInstagram } from 'react-icons/fa';

export default function NavigationFooter() {
	const isMobile = useBreakpoint(480);

	return (
		<>
			{isMobile ? (
				// Mobile bottom nav
				<nav className="fixed bottom-0 left-0 right-0 m-2 rounded-full bg-white border border-gray-200 shadow-md px-2 py-2 flex justify-between items-center text-center text-sm z-50">
					<NavLink
						to="/"
						className={({ isActive }) =>
							`flex flex-col items-center ${
								isActive ? "text-white font-bold bg-primary rounded-full p-3" : "text-gray-400 p-3"
							}`
						}
					>
						<Home className="w-5 h-5" />
						Home
					</NavLink>
					<NavLink
						to="/saved"
						className={({ isActive }) =>
							`flex flex-col items-center ${
								isActive ? "text-white font-bold bg-primary rounded-full p-3" : "text-gray-400 p-3"
							}`
						}
					>
						<Heart className="w-5 h-5" />
						Saved
					</NavLink>
					<NavLink
						to="/bookings"
						className={({ isActive }) =>
							`flex flex-col items-center ${
								isActive ? "text-white font-bold bg-primary rounded-full p-3" : "text-gray-400 p-3"
							}`
						}
					>
						<Bookmark className="w-5 h-5" />
						Bookings
					</NavLink>
					<NavLink
						to="/profile"
						className={({ isActive }) =>
							`flex flex-col items-center ${
								isActive ? "text-white font-bold bg-primary rounded-full p-3" : "text-gray-400 p-3"
							}`
						}
					>
						<User className="w-5 h-5" />
						Profile
					</NavLink>
				</nav>
			) : (
				// Desktop footer
				<footer className="bg-gray-dark text-gray-light px-8 py-12 mt-12 text-sm">
					<div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
						<div>
							<h4 className="text-white font-bold mb-2">About</h4>
							<ul className="space-y-1">
								<li>How it works</li>
								<li>Careers</li>
								<li>Press</li>
							</ul>
						</div>
						<div>
							<h4 className="text-white font-bold mb-2">Community</h4>
							<ul className="space-y-1">
								<li>Referral program</li>
								<li>Gift cards</li>
								<li>Forums</li>
							</ul>
						</div>
						<div>
							<h4 className="text-white font-bold mb-2">Host</h4>
							<ul className="space-y-1">
								<li>Host your home</li>
								<li>Host experiences</li>
								<li>Resource center</li>
							</ul>
						</div>
						<div>
							<h4 className="text-white font-bold mb-2">Support</h4>
							<ul className="space-y-1">
								<li>Help center</li>
								<li>Trust & safety</li>
								<li>Contact us</li>
							</ul>
						</div>
					</div>

					<div className="flex justify-between items-center mt-8 border-t border-gray text-xs pt-4">
						<span>© 2025 StayFindr</span>
						<div className="flex space-x-4 text-white">
							<FaFacebookF className="w-4 h-4" />
							<FaInstagram className="w-4 h-4" />
						</div>

					</div>
				</footer>
			)}
		</>
	);
}
