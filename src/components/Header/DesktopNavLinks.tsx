import { NavLink } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { logout } from '../../utilities/logout';
import SplitButton from '../commons/Buttons.tsx';

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
		<nav className="flex items-center space-x-12 text-md font-body ml-auto">
			<NavLink
				to="/"
				className={({isActive}) =>
					`text-primary font-body font-medium transition-colors duration-300 hover:text-green-600 ${
						isActive ? 'font-bold' : ''
					}`
				}
			>
				Home
			</NavLink>

			<NavLink
				to="/about"
				className={({isActive}) =>
					`text-primary font-body font-medium transition-colors duration-300 hover:text-green-600 ${
						isActive ? 'font-bold' : ''
					}`
				}
			>
				About us
			</NavLink>

			<SplitButton
				text="Book Now"
				bgColor="bg-primary"
				textColor="text-primary"
				arrowColor="text-white"
				borderColor="border-primary"
				onClick={() => console.log('Booking...')}
			/>

			{isLoggedIn ? (
				<div ref={dropdownRef} className="relative ml-4">
					<button
						onClick={() => setShowDropdown(!showDropdown)}
						className="flex items-center space-x-2"
					>
						<img
							src={avatarUrl}
							alt="User Avatar"
							className="w-10 h-10 rounded-full object-cover"
						/>
						<ChevronDown className="text-primary" />
					</button>

					{showDropdown && (
						<div
							className="absolute right-0 mt-4 w-40 p-[4px] bg-white rounded-lg shadow-lg z-50 animate-slideDownFast">
							<NavLink
								to={`/user/${user}`}
								onClick={() => setShowDropdown(false)}
								className="relative block w-full text-left px-4 py-2 hover:bg-secondary hover:rounded-t-lg text-primary font-body font-light text-sm"
							>
								My Bookings
								<span
									className="absolute bottom-0 left-1/2 w-[60%] h-[1px] bg-background -translate-x-1/2" />
							</NavLink>

							{isAdmin && (
								<NavLink
									to={`/admin/${user}`}
									onClick={() => setShowDropdown(false)}
									className="relative block w-full text-left px-4 py-2 hover:bg-secondary text-primary font-body font-light text-sm"
								>
									Dashboard
									<span
										className="absolute bottom-0 left-1/2 w-[60%] h-[1px] bg-background -translate-x-1/2" />
								</NavLink>
							)}

							<button
								className="relative block w-full text-left px-4 py-2 hover:bg-secondary text-primary font-body font-light text-sm">
								Inbox
								<span
									className="absolute bottom-0 left-1/2 w-[60%] h-[1px] bg-background -translate-x-1/2" />
							</button>
							<button
								className="relative block w-full text-left px-4 py-2 hover:bg-secondary text-primary font-body font-light text-sm">
								Notification
								<span
									className="absolute bottom-0 left-1/2 w-[60%] h-[1px] bg-background -translate-x-1/2" />
							</button>
							<button
								onClick={() => {
									setShowDropdown(false);
									logout();
								}}
								className="relative block w-full text-left px-4 py-2 text-red-600 hover:bg-secondary hover:rounded-b-lg font-body font-light text-sm"
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
