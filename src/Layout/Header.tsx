import { useState, useRef, useEffect } from "react";
import useBreakpoint from "../hooks/useBreakpoint.ts";
import { Menu, X } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function Header() {
	const isMobile = useBreakpoint(480);
	const [open, setOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setOpen(false);
			}
		};

		if (open) document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, [open]);

	return (
		<header className="relative bg-white shadow-md flex items-center justify-between px-4 py-2 md:px-8 md:py-4">
			<img
				src="/assets/logo.png"
				alt="Logo"
				className="h-10 m-2 md:h-24 md:m-0"
			/>

			{isMobile ? (
				<>
					{/* Hamburger Button */}
					<button onClick={() => setOpen(true)} className="md:hidden">
						<Menu className="w-8 h-8 text-primary" />
					</button>

					{/* Overlay */}
					{open && (
						<div className="fixed inset-0 z-20 bg-black bg-opacity-40 transition-opacity" />
					)}

					{/* Slide-in Menu */}
					<div
						ref={menuRef}
						className={`fixed z-30 right-0 top-0 h-full w-48 bg-white shadow-lg p-4 transform transition-transform duration-300 ease-in-out ${
							open ? "translate-x-0" : "translate-x-full"
						}`}
					>
						{/* Close Button */}
						<button
							onClick={() => setOpen(false)}
							className="ml-auto mb-4 p-1 block text-white bg-primary rounded-md"
						>
							<X className="w-6 h-6" />
						</button>

						{/* Mobile Nav Links */}
						<ul className="space-y-4 text-lg font-alt">
							<li>
								<NavLink
									to="/"
									onClick={() => setOpen(false)}
									className={({ isActive }) =>
										isActive ? "text-primary font-bold" : "text-gray-dark"
									}
								>
									Home
								</NavLink>
							</li>
							<li>
								<NavLink
									// TODO: add function whether to take user to admin page or user page
									to="/user/exampleUser"
									onClick={() => setOpen(false)}
									className={({ isActive }) =>
										isActive ? "text-primary font-bold" : "text-gray-dark"
									}
								>
									Profile
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/user/userId/bookings"
									onClick={() => setOpen(false)}
									className={({ isActive }) =>
										isActive ? "text-primary font-bold" : "text-gray-dark"
									}
								>
									Bookings
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/contact"
									onClick={() => setOpen(false)}
									className={({ isActive }) =>
										isActive ? "text-primary font-bold" : "text-gray-dark"
									}
								>
									Contact
								</NavLink>
							</li>
							<li>
								<NavLink
									to="/login"
									className={({ isActive }) =>
										isActive ? "hidden" : "btn-base text-white bg-primary"
									}
								>
									Login / sign up
								</NavLink>
							</li>
						</ul>
					</div>
				</>
			) : (
				// Desktop Nav
				<nav className="flex items-center space-x-6 text-lg font-alt">
					<NavLink
						// TODO: add function whether to take user to admin page or user page
						to="/user"
						className={({ isActive }) =>
							isActive ? "text-primary font-bold" : "text-gray-dark"
						}
					>
						Profile
					</NavLink>
					<NavLink
						to="/contact"
						className={({ isActive }) =>
							isActive ? "text-primary font-bold" : "text-gray-dark"
						}
					>
						Contact
					</NavLink>
					<NavLink
						to="/user/exampleuser/bookings"
						className={({ isActive }) =>
							isActive ? "text-primary font-bold" : "text-gray-dark"
						}
					>
						Bookings
					</NavLink>
					<NavLink
						to="/login"
						className={({ isActive }) =>
							isActive ? "hidden" : "btn-base text-white bg-primary"
						}
					>
						Login / sign up
					</NavLink>
				</nav>
			)}
		</header>
	);
}
