import { NavLink, useParams } from 'react-router-dom';

/**
 * Tabs for navigating the user profile sections: About Me, Upcoming Bookings, and Booking History.
 * Used on the User Profile page layout.
 */
export default function UserProfileTabs() {
	const { userId } = useParams();
	const basePath = `/user/${userId}`;

	/**
	 * Returns Tailwind classNames for active/inactive NavLink state
	 */
	const linkClass = ({ isActive }: { isActive: boolean }) =>
		`px-4 py-2 rounded-md text-sm font-medium w-full flex items-center justify-center gap-2 transition ${
			isActive ? 'bg-background' : 'bg-white/50 hover:bg-background/30'
		}`;

	return (
		<nav
			aria-label="User profile navigation tabs"
			className="flex flex-col items-center p-2 justify-center w-full shadow-md bg-white rounded-lg mx-auto mb-4 sm:mt-14"
		>
			<NavLink to={`${basePath}/user-profile`} className={linkClass}>
				<i className="fa-light fa-address-card" aria-hidden="true" />
				<span>About Me</span>
			</NavLink>

			<hr className="h-[1px] w-[90%] bg-primary/30 my-1" />

			<NavLink to={basePath} end className={linkClass}>
				<i className="fa-light fa-plane" aria-hidden="true" />
				<span>Upcoming Bookings</span>
			</NavLink>

			<hr className="h-[1px] w-[90%] bg-primary/30 my-1" />

			<NavLink to={`${basePath}/user-booking-history`} className={linkClass}>
				<i className="fa-light fa-clock-rotate-left" aria-hidden="true" />
				<span>Booking History</span>
			</NavLink>
		</nav>
	);
}
