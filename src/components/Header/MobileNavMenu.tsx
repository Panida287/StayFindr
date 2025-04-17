import { NavLink } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { logout } from '../../utilities/logout';

type Props = {
	menuRef: React.RefObject<HTMLDivElement>;
	open: boolean;
	setOpen: (open: boolean) => void;
	isLoggedIn: boolean;
};

export default function MobileNavMenu({ menuRef, open, setOpen, isLoggedIn }: Props) {
	const user = localStorage.getItem('SFUsername');
	const isAdmin = localStorage.getItem('SFRole') === 'true';

	const activeClass = ({ isActive }: { isActive: boolean }) =>
		isActive ? 'text-primary font-semibold' : '';

	return (
		<>
			<button onClick={() => setOpen(true)} className="md:hidden">
				<Menu className="w-8 h-8 text-primary" />
			</button>

			{open && <div className="fixed inset-0 z-20 bg-black bg-opacity-40 transition-opacity" />}

			<div
				ref={menuRef}
				className={`fixed z-30 right-0 top-0 h-full w-64 bg-white shadow-lg p-4 flex flex-col justify-between transition-transform duration-300 ease-in-out ${
					open ? 'translate-x-0' : 'translate-x-full'
				}`}
			>
				<div>
					{/* Close button */}
					<button
						onClick={() => setOpen(false)}
						className="ml-auto mb-4 p-1 block text-white bg-primary rounded-md"
					>
						<X className="w-6 h-6" />
					</button>

					<ul className="space-y-4 text-lg font-alt">
						{isLoggedIn && (
							<>
								<li>
									<NavLink to={`/user/${user}`} className={activeClass} onClick={() => setOpen(false)}>
										My Bookings
									</NavLink>
								</li>
								{isAdmin && (
									<li>
										<NavLink to={`/admin/${user}`} className={activeClass} onClick={() => setOpen(false)}>
											Dashboard
										</NavLink>
									</li>
								)}
							</>
						)}

						<li>
							<NavLink to="/" className={activeClass} onClick={() => setOpen(false)}>
								Browse
							</NavLink>
						</li>

						<li>
							<NavLink to="/contact" className={activeClass} onClick={() => setOpen(false)}>
								Contact
							</NavLink>
						</li>

						<li><a href="#">Inbox</a></li>
						<li><a href="#">Notification</a></li>
					</ul>
				</div>

				{/* Bottom section */}
				<div className="mt-6 border-t pt-4">
					{isLoggedIn ? (
						<button
							onClick={() => {
								logout();
								setOpen(false);
							}}
							className="text-pink-600 hover:underline w-full text-left"
						>
							Logout
						</button>
					) : (
						<NavLink
							to="/login"
							onClick={() => setOpen(false)}
							className="btn-base text-white bg-primary block text-center"
						>
							Login / Sign up
						</NavLink>
					)}
				</div>
			</div>
		</>
	);
}
