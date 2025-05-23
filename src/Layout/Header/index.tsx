import { useState, useRef, useEffect } from 'react';
import { useFetchProfile } from '../../hooks/useFetchProfile.ts';
import useBreakpoint from '../../hooks/useBreakpoint.ts';
import MobileNavMenu from './MobileNavMenu.tsx';
import DesktopNavLinks from './DesktopNavLinks.tsx';

export default function Header() {
	const isMobile = useBreakpoint(600);
	const [open, setOpen] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);
	const menuRef = useRef<HTMLDivElement | null>(null);
	const dropdownRef = useRef<HTMLDivElement | null>(null);

	const { profile } = useFetchProfile();
	const isLoggedIn = !!profile;
	const avatarUrl = profile?.avatar?.url || '/assets/avatar-placeholder.png';

	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) setOpen(false);
			if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) setShowDropdown(false);
		};
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div
			className="w-full fixed z-[9999]">
			<header className="mx-auto w-[calc(100%-2rem)] max-w-5xl bg-white/80 bg-blur-3xl backdrop-blur-sm shadow-md flex items-center justify-between px-4 my-4 rounded-full md:px-8">
				<img src="/assets/images/logos/logo-horiz.png" alt="Logo" className="h-10 m-2" />
				{isMobile ? (
					<MobileNavMenu
						menuRef={menuRef}
						open={open}
						setOpen={setOpen}
						isLoggedIn={isLoggedIn}
					/>
				) : (
					<DesktopNavLinks
						avatarUrl={avatarUrl}
						isLoggedIn={isLoggedIn}
						showDropdown={showDropdown}
						setShowDropdown={setShowDropdown}
						dropdownRef={dropdownRef}
					/>
				)}
			</header>

		</div>
	);
}
