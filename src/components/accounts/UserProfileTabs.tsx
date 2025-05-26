import { NavLink, useParams } from 'react-router-dom';

export default function UserProfileTabs() {
	const { userId } = useParams();

	const basePath = `/user/${userId}`;

	const linkClass = ({ isActive }: { isActive: boolean }) =>
		`px-4 py-2 rounded-md text-sm font-medium w-full ${
			isActive
				? "bg-background"
				: "bg-white/50"
		}`;

	return (
		<div className="flex flex-col items-center p-2 justify-center w-full shadow:md bg-white rounded-lg mx-auto mb-4 sm:mt-14">
			<NavLink
				to={`${basePath}/user-profile`} className={linkClass}>
				<i className="fa-light fa-address-card pr-2" />
				About me
			</NavLink>

			<span className="h-[1px] w-[90%] mx-auto bg-primary/30 my-1" />

			<NavLink
				to={basePath} end className={linkClass}>
				<i className="fa-light fa-plane pr-2"></i>
				Upcoming Bookings
			</NavLink>

			<span className="h-[1px] w-[90%] mx-auto bg-primary/30 my-1" />

			<NavLink
				to={`${basePath}/user-booking-history`} className={linkClass}>
				<i className="fa-light fa-clock-rotate-left pr-2" />
				Booking History
			</NavLink>
		</div>
	);
}
