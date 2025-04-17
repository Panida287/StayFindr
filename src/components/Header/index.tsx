import { useState, useRef, useEffect } from 'react';
import { useFetchProfile } from '../../hooks/useFetchProfile';
import useBreakpoint from '../../hooks/useBreakpoint';
import MobileNavMenu from './MobileNavMenu';
import DesktopNavLinks from './DesktopNavLinks';

export default function Header() {
	const isMobile = useBreakpoint(480);
	const [open, setOpen] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);
	const menuRef = useRef<HTMLDivElement | null>(null);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	const { profile } = useFetchProfile();
	const isLoggedIn = !!profile;
	const isAdmin = profile?.venueManager;
	const avatarUrl = profile?.avatar?.url || '/assets/avatar-placeholder.png';
	const accountPath = isAdmin ? `/admin/${profile?.name}` : `/user/${profile?.name}`;

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
			if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setShowDropdown(false);
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<header className="relative bg-white shadow-md flex items-center justify-between px-4 py-2 md:px-8 md:py-4">
			<img src="/assets/logo.png" alt="Logo" className="h-10 m-2 md:h-24 md:m-0" />
			{isMobile ? (
				<MobileNavMenu
					menuRef={menuRef}
					open={open}
					setOpen={setOpen}
					isLoggedIn={isLoggedIn}
					accountPath={accountPath}
				/>
			) : (
				<DesktopNavLinks
					avatarUrl={avatarUrl}
					accountPath={accountPath}
					isLoggedIn={isLoggedIn}
					showDropdown={showDropdown}
					setShowDropdown={setShowDropdown}
					dropdownRef={dropdownRef}
				/>
			)}
		</header>
	);
}
