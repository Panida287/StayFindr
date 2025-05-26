import { ReactNode, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

/**
 * A single dropdown item.
 */
type DropdownItem = {
	label: ReactNode;
	icon?: ReactNode;
	onClick?: () => void;
	to?: string;
	className?: string;
	hoverClassName?: string;
};

/**
 * Props for DropdownMenu component.
 */
type DropdownMenuProps = {
	/** The clickable element that triggers the menu */
	children: ReactNode;
	/** List of menu items; can be links or buttons */
	items: DropdownItem[];
};

/**
 * A dropdown menu component that supports both link and button actions.
 * Closes automatically on outside click.
 */
export default function DropdownMenu({ children, items }: DropdownMenuProps) {
	const [open, setOpen] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (!wrapperRef.current?.contains(e.target as Node)) {
				setOpen(false);
			}
		}
		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, []);

	return (
		<div ref={wrapperRef} className="relative inline-block">
			<div
				role="button"
				tabIndex={0}
				aria-haspopup="menu"
				aria-expanded={open}
				onClick={(e) => {
					e.stopPropagation();
					setOpen((prev) => !prev);
				}}
				onKeyDown={(e) => {
					if (e.key === 'Enter' || e.key === ' ') {
						e.preventDefault();
						setOpen((prev) => !prev);
					}
				}}
			>
				{children}
			</div>

			{open && (
				<div
					role="menu"
					className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow z-20"
				>
					{items.map((item, idx) =>
						item.to ? (
							<Link
								key={idx}
								to={item.to}
								onClick={() => setOpen(false)}
								role="menuitem"
								className={`
									block px-4 py-2 text-sm
									${item.className ?? 'text-gray-700'}
									${item.hoverClassName ?? 'hover:bg-gray-100'}
								`}
							>
								{item.icon}
								{item.label}
							</Link>
						) : (
							<button
								key={idx}
								onClick={() => {
									item.onClick?.();
									setOpen(false);
								}}
								role="menuitem"
								className={`
									w-full text-left px-4 py-2 text-sm
									${item.className ?? 'text-gray-700'}
									${item.hoverClassName ?? 'hover:bg-gray-100'}
								`}
							>
								{item.icon}
								{item.label}
							</button>
						)
					)}
				</div>
			)}
		</div>
	);
}
