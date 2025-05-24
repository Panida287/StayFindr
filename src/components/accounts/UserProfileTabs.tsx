import { NavLink } from 'react-router-dom';

export default function UserProfileTabs() {
	return (
		<div className="flex flex-col items-center justify-center w-full bg-white/60 rounded-lg mx-auto mb-4 md:mt-14 md:mb-0 md:items-start">
			<NavLink
				to="#"
				className={({ isActive }) => `
          flex justify-center items-center px-2 py-3 rounded-lg w-full font-heading
          md:justify-start text-primary
          ${isActive ? 'bg-background' : 'hover:bg-background'}
        `}
			>
				<i className="fa-light fa-address-card pr-2" />
				About me
			</NavLink>

			<span className="h-[1px] w-[90%] mx-auto bg-primary/30 my-1" />

			<NavLink
				to="#"
				className={({ isActive }) => `
          flex justify-center items-center px-2 py-3 rounded-lg w-full font-heading
          md:justify-start text-primary
          ${isActive ? 'bg-background' : 'hover:bg-background'}
        `}
			>
				<i className="fa-light fa-clock-rotate-left pr-2" />
				Booking History
			</NavLink>
		</div>
	);
}
