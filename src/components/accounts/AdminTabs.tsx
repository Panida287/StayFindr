import { NavLink, useParams } from 'react-router-dom';

/**
 * Navigation tabs for the admin dashboard (Overview, Manage Venues, View Bookings).
 */
export default function AdminTabs() {
	const { adminId } = useParams();
	const basePath = `/admin/${adminId}`;

	/**
	 * Returns dynamic class name based on link active state.
	 */
	const linkClass = ({ isActive }: { isActive: boolean }) =>
		`text-xs font-medium flex justify-center items-center py-3 px-2 rounded-md w-full sm:text-sm ${
			isActive
				? 'bg-primary text-white'
				: 'text-primary hover:bg-background font-thin'
		}`;

	return (
		<nav
			className="w-full bg-white/50 flex justify-between items-center text-center shadow-md rounded-xl p-2"
			role="navigation"
			aria-label="Admin Dashboard Tabs"
		>
			<NavLink to={basePath} end className={linkClass} aria-label="Overview tab">
				Overview
			</NavLink>

			<span className="h-10 w-[1px] bg-primary/20 mx-1" aria-hidden="true" />

			<NavLink
				to={`${basePath}/manage-venues`}
				className={linkClass}
				aria-label="Manage Properties tab"
			>
				Manage Properties
			</NavLink>

			<span className="h-10 w-[1px] bg-primary/20 mx-1" aria-hidden="true" />

			<NavLink
				to={`${basePath}/manage-bookings`}
				className={linkClass}
				aria-label="View Bookings tab"
			>
				View Bookings
			</NavLink>
		</nav>
	);
}
