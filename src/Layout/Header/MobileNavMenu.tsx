import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { logout } from '../../utilities/logout.ts';
import { createPortal } from 'react-dom';
import { SplitButton } from '../../components/commons/Buttons.tsx';
import React from 'react';

type Props = {
	menuRef: React.RefObject<HTMLDivElement | null>;
	open: boolean;
	setOpen: (open: boolean) => void;
	isLoggedIn: boolean;
};

export default function MobileNavMenu({ menuRef, open, setOpen, isLoggedIn }: Props) {
	const user = localStorage.getItem('SFUsername');
	const isAdmin = localStorage.getItem('SFRole') === 'true';

	return (
		<>
			{/* Hamburger Icon */}
			<button onClick={() => setOpen(true)} className="md:hidden">
				<Menu className="w-8 h-8 text-primary" />
			</button>

			{/* Mobile menu rendered via portal */}
			{createPortal(
				<div
					ref={menuRef}
					className={`fixed z-[9999] top-0 right-0 h-full w-64 bg-white shadow-lg p-4 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
						open ? 'translate-x-0' : 'translate-x-full'
					}`}
				>
					<div>
						<button
							onClick={() => setOpen(false)}
							className="ml-auto mb-4 p-1 block text-white bg-primary rounded-md"
						>
							<X className="w-6 h-6" />
						</button>

						<ul className="text-xl font-heading">
							<li className="pt-2 pb-2 mx-4 border-t border-gray-200">
								<NavLink
									to="/"
									className={({isActive}) =>
										`${isActive ? 'text-primary font-semibold' : ''} hover:text-primary transition duration-200`
									}
									onClick={() => setOpen(false)}
								>
									Home
								</NavLink>
							</li>

							{isLoggedIn && (
								<>
									<li className="pt-2 pb-2 mx-4 border-t border-gray-200">
										<NavLink
											to={`/user/${user}`}
											className={({isActive}) =>
												`${isActive ? 'text-primary font-semibold' : ''} hover:text-primary transition duration-200`
											}
											onClick={() => setOpen(false)}
										>
											My Profile
										</NavLink>
									</li>
									{isAdmin && (
										<li className="pt-2 pb-2 mx-4 border-t border-gray-200">
											<NavLink
												to={`/admin/${user}`}
												className={({isActive}) =>
													`${isActive ? 'text-primary font-semibold' : ''} hover:text-primary transition duration-200`
												}
												onClick={() => setOpen(false)}
											>
												Admin Dashboard
											</NavLink>
										</li>
									)}
								</>
							)}

							<li className="pt-2 pb-2 mx-4 border-t border-gray-200">
								<NavLink
									to="/about"
									className={({isActive}) =>
										`${isActive ? 'text-primary font-semibold' : ''} hover:text-primary transition duration-200`
									}
									onClick={() => setOpen(false)}
								>
									About Us
								</NavLink>
							</li>

							<li className="pt-2 pb-2 mx-4 border-t border-b border-gray-200">
								<NavLink
									to="/contact"
									className={({isActive}) =>
										`${isActive ? 'text-primary font-semibold' : ''} hover:text-primary transition duration-200`
									}
									onClick={() => setOpen(false)}
								>
									Contact Us
								</NavLink>
							</li>
						</ul>

					</div>

					<div className="mt-6 border-t pt-4 flex justify-center">
						{isLoggedIn ? (
							<SplitButton
								text="Logout"
								bgColor="bg-red-800"
								textColor="text-red-800"
								arrowColor="text-white"
								borderColor="border-red-800"
								onClick={() => {
									logout();
									setOpen(false);
								}}
								className="font-heading"
							/>

						) : (
							<NavLink to="/login">
								<NavLink to="/login" onClick={() => setOpen(false)}>
									<SplitButton
										text="Login/Sign up"
										bgColor="bg-primary"
										textColor="text-primary"
										arrowColor="text-white"
										borderColor="border-primary"
										className="font-heading pr-1"
									/>
								</NavLink>
							</NavLink>
						)}
					</div>
				</div>,
				document.getElementById('portal-root')!
			)}
		</>
	);
}
