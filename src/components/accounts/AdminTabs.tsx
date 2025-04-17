import { NavLink, useParams } from "react-router-dom";

export default function AdminTabs() {
	const { adminId } = useParams();

	const basePath = `/admin/${adminId}`;

	const linkClass = ({ isActive }: { isActive: boolean }) =>
		`px-4 py-2 rounded-md text-sm font-medium ${
			isActive
				? "bg-pink-600 text-white"
				: "text-pink-600 hover:bg-pink-100"
		}`;

	return (
		<div className="w-full justify-around flex my-6 py-3 shadow-md">
			<NavLink to={basePath} end className={linkClass}>
				Dashboard
			</NavLink>
			<NavLink to={`${basePath}/manage-venues`} className={linkClass}>
				Manage Venues
			</NavLink>
			<NavLink to={`${basePath}/manage-bookings`} className={linkClass}>
				View Bookings
			</NavLink>
		</div>
	);
}
