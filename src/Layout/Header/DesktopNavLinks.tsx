import { NavLink } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';
import { logout } from '../../utilities/logout.ts';
import { SplitButton } from '../../components/commons/Buttons.tsx';
import { FALLBACK } from '../../constants.ts';

type Props = {
	dropdownRef: React.RefObject<HTMLDivElement | null>;
	avatarUrl: string;
	isLoggedIn: boolean;
	showDropdown: boolean;
	setShowDropdown: (value: boolean) => void;
};

// NavLink class for main nav items
function navLinkClasses(isActive: boolean) {
	return `
		text-primary font-heading font-medium rounded-full py-1 px-4 
		transition-colors duration-300 hover:bg-primary hover:text-secondary
		${isActive ? 'bg-primary text-secondary font-bold' : ''}
	`;
}

// NavLink class for dropdown items
function dropdownLinkClasses(isActive: boolean) {
	return `
		relative block w-full text-left px-4 py-2 text-primary font-heading font-light text-md
		hover:bg-secondary ${isActive ? 'font-semibold bg-secondary' : ''}
	`;
}

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
		<nav className="flex items-center space-x-4 ml-auto">
			<NavLink to="/" className={({ isActive }) => navLinkClasses(isActive)}>
				Home
			</NavLink>

			<NavLink to="/about" className={({ isActive }) => navLinkClasses(isActive)}>
				About Us
			</NavLink>

			<NavLink to="/contact" className={({ isActive }) => navLinkClasses(isActive)}>
				Contact Us
			</NavLink>

			{isLoggedIn ? (
				<div ref={dropdownRef} className="relative ml-4">
					<button
						onClick={() => setShowDropdown(!showDropdown)}
						className="flex items-center space-x-2"
					>
						<img
							src={avatarUrl || FALLBACK.avatar}
							alt="User Avatar"
							onError={(e) => {
								e.currentTarget.src = FALLBACK.avatar;
							}}
							className="w-8 h-8 rounded-full object-cover"
						/>
						<ChevronDown className="text-primary" />
					</button>

					{showDropdown && (
						<div className="absolute right-0 mt-4 w-40 p-[4px] bg-white rounded-lg shadow-lg z-50 animate-slideDownFast">
							<NavLink
								to={`/user/${user}`}
								onClick={() => setShowDropdown(false)}
								className={({ isActive }) => dropdownLinkClasses(isActive)}
							>
								My Profile
								<span className="absolute bottom-0 left-1/2 w-[60%] h-[1px] bg-background -translate-x-1/2" />
							</NavLink>

							{isAdmin && (
								<NavLink
									to={`/admin/${user}`}
									onClick={() => setShowDropdown(false)}
									className={({ isActive }) => dropdownLinkClasses(isActive)}
								>
									Admin Dashboard
									<span className="absolute bottom-0 left-1/2 w-[60%] h-[1px] bg-background -translate-x-1/2" />
								</NavLink>
							)}

							<button
								className="relative block w-full text-left px-4 py-2 hover:bg-secondary text-primary font-heading font-light text-md"
							>
								Inbox
								<span className="absolute bottom-0 left-1/2 w-[60%] h-[1px] bg-background -translate-x-1/2" />
							</button>
							<button
								className="relative block w-full text-left px-4 py-2 hover:bg-secondary text-primary font-heading font-light text-md"
							>
								Notification
								<span className="absolute bottom-0 left-1/2 w-[60%] h-[1px] bg-background -translate-x-1/2" />
							</button>

							<button
								onClick={() => {
									setShowDropdown(false);
									logout();
								}}
								className="relative block w-full text-left px-4 py-2 text-red-600 hover:bg-secondary hover:rounded-b-lg font-heading font-light text-md"
							>
								Logout
							</button>
						</div>
					)}
				</div>
			) : (
				<NavLink to="/login">
					<SplitButton
						text="Login/Sign up"
						bgColor="bg-primary"
						textColor="text-primary"
						arrowColor="text-white"
						borderColor="border-primary"
						className="font-heading pr-1"
					/>
				</NavLink>
			)}
		</nav>
	);
}
