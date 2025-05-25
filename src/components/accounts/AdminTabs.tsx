import { NavLink, useParams } from "react-router-dom";

export default function AdminTabs() {
	const { adminId } = useParams();

	const basePath = `/admin/${adminId}`;

	const linkClass = ({ isActive }: { isActive: boolean }) =>
		`text-xs font-medium flex justify-center items-center py-2 px-2 rounded-md w-full sm:text-sm ${
			isActive
				? "bg-primary text-white"
				: "text-primary hover:bg-background font-thin"
		}`;

	return (
		<div className="w-full bg-white/50 justify-between items-center text-center flex my-12 mb-4 shadow-md rounded-xl p-2">
			<NavLink to={basePath} end className={linkClass}>
				Overview
			</NavLink>

			<span className="h-10 w-[1px] bg-primary/20 mx-1"></span>

			<NavLink to={`${basePath}/manage-venues`} className={linkClass}>
				Manage Properties
			</NavLink>

			<span className="h-10 w-[1px] bg-primary/20 mx-1"></span>

			<NavLink to={`${basePath}/manage-bookings`} className={linkClass}>
				View Bookings
			</NavLink>
		</div>
	);
}
