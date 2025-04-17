import { NavLink } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { logout } from '../../utilities/logout';

type Props = {
	dropdownRef: React.RefObject<HTMLDivElement | null>;
	avatarUrl: string;
	isLoggedIn: boolean;
	showDropdown: boolean;
	setShowDropdown: (value: boolean) => void;
};

export default function DesktopNavLinks({
	                                        dropdownRef,
	                                        avatarUrl,
	                                        isLoggedIn,
	                                        showDropdown,
	                                        setShowDropdown,
                                        }: Props) {
	const user = localStorage.getItem('SFUsername');
	const isAdmin = localStorage.getItem('SFRole') === 'true';

	return (
		<nav className="flex items-center space-x-6 text-lg font-alt ml-auto">
			<NavLink
				to="/"
				className={({ isActive }) =>
					isActive ? 'text-primary font-bold' : 'text-gray-dark'
				}
			>
				Home
			</NavLink>
			<NavLink
				to="/contact"
				className={({ isActive }) =>
					isActive ? 'text-primary font-bold' : 'text-gray-dark'
				}
			>
				Contact
			</NavLink>

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
						<div className="absolute right-0 mt-2 w-40 bg-white border rounded-md shadow-lg z-50 animate-slideDownFast">
							<NavLink
								to={`/user/${user}`}
								onClick={() => setShowDropdown(false)}
								className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black"
							>
								My Bookings
							</NavLink>

							{isAdmin && (
								<NavLink
									to={`/admin/${user}`}
									onClick={() => setShowDropdown(false)}
									className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-black"
								>
									Dashboard
								</NavLink>
							)}

							<button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
								Inbox
							</button>
							<button className="block w-full text-left px-4 py-2 hover:bg-gray-100">
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
	);
}
