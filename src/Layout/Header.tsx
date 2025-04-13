import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import useBreakpoint from '../hooks/useBreakpoint';
import { logout } from '../utilities/logout';
import { useFetchProfile } from '../hooks/useFetchProfile';

export default function Header() {
	const isMobile = useBreakpoint(480);
	const [open, setOpen] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);
	const menuRef = useRef<HTMLDivElement | null>(null);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	const {profile} = useFetchProfile();
	const isLoggedIn = !!profile;
	const isAdmin = profile?.venueManager;
	const avatarUrl = profile?.avatar?.url || '/assets/avatar-placeholder.png';

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setOpen(false);
			}
			if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
				setShowDropdown(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	const accountPath = isAdmin ? `/admin/${profile?.name}` : `/user/${profile?.name}`;

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
							open ? 'translate-x-0' : 'translate-x-full'
						}`}
					>
						{/* Close Button */}
						<button
							onClick={() => setOpen(false)}
							className="ml-auto mb-4 p-1 block text-white bg-primary rounded-md"
						>
							<X className="w-6 h-6" />
						</button>

						{/* Mobile Nav */}
						<ul className="space-y-4 text-lg font-alt">
							<li>
								<NavLink to="/" onClick={() => setOpen(false)}
								         className={({isActive}) =>
									         isActive
										         ? 'text-gray-400'
										         : ''
								         }
								>
									Home
								</NavLink>
							</li>
							<li>
								<NavLink to="/contact" onClick={() => setOpen(false)}
								         className={({isActive}) =>
									         isActive
										         ? 'text-gray-400'
										         : ''
								         }
								>
									Contact
								</NavLink>
							</li>
							<li>
								<a href="#" onClick={() => setOpen(false)}>Inbox</a>
							</li>
							<li>
								<a href="#" onClick={() => setOpen(false)}>Notification</a>
							</li>
							{isLoggedIn ? (
								<>
									<li>
										<NavLink
											to={accountPath}
											onClick={() => setOpen(false)}
											className={({isActive}) =>
												isActive
													? 'text-gray-400'
													: ''
											}
										>
											My Account
										</NavLink>
									</li>

									<li>
										<button onClick={() => {
											logout();
											setOpen(false);
										}} className="text-left text-pink-600 hover:underline">
											Logout
										</button>
									</li>
								</>
							) : (
								<li>
									<NavLink to="/login" onClick={() => setOpen(false)}
									         className="btn-base text-white bg-primary">
										Login / Sign up
									</NavLink>
								</li>
							)}
						</ul>
					</div>
				</>
			) : (
				// Desktop Navigation
				<nav className="flex items-center space-x-6 text-lg font-alt ml-auto">
					<NavLink to="/"
					         className={({isActive}) => isActive ? 'text-primary font-bold' : 'text-gray-dark'}>Home</NavLink>
					<NavLink to="/contact"
					         className={({isActive}) => isActive ? 'text-primary font-bold' : 'text-gray-dark'}>Contact</NavLink>

					{isLoggedIn ? (
						<div ref={dropdownRef} className="relative ml-4">
							<button
								onClick={() => setShowDropdown(!showDropdown)}
								className="flex items-center space-x-2"
							>
								<img
									src={avatarUrl}
									alt="User Avatar"
									className="w-8 h-8 rounded-full object-cover"
								/>
								<ChevronDown />
							</button>
							{showDropdown && (
								<div
									className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50 animate-slideDownFast">
									<NavLink
										to={accountPath}
										onClick={() => setShowDropdown(false)}
										className={({isActive}) =>
											isActive
												? 'text-gray-400 bg-gray-50 block w-full text-left px-4 py-2'
												: 'hover:bg-gray-100 text-black block w-full text-left px-4 py-2'
										}
									>
										My Account
									</NavLink>


									<button
										className="block w-full text-left px-4 py-2 hover:bg-gray-100"
									>
										Inbox
									</button>
									<button
										className="block w-full text-left px-4 py-2  hover:bg-gray-100"
									>
										Notification
									</button>
									<button
										onClick={logout}
										className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
									>
										Logout
									</button>
								</div>
							)}
						</div>
					) : (
						<NavLink to="/login" className="btn-base text-white bg-primary">
							Login / Sign up
						</NavLink>
					)}
				</nav>
			)}
		</header>
	);
}
