// components/commons/DropdownMenu.tsx
import { ReactNode, useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

type DropdownItem = {
	label: ReactNode;
	icon?: ReactNode;
	onClick?: () => void;
	to?: string;
	className?: string;
	hoverClassName?: string;
};

type DropdownMenuProps = {
	/** Any element you want to use as the trigger (a button, icon, etc.) */
	children: ReactNode;
	/** List of items; if `to` is set it becomes a <Link>, otherwise a <button>. */
	items: DropdownItem[];
};

export default function DropdownMenu({ children, items }: DropdownMenuProps) {
	const [open, setOpen] = useState(false);
	const wrapperRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		function handler(e: MouseEvent) {
			if (wrapperRef.current?.contains(e.target as Node)) return;
			setOpen(false);
		}
		document.addEventListener('mousedown', handler);
		return () => document.removeEventListener('mousedown', handler);
	}, []);

	return (
		<div ref={wrapperRef} className="relative inline-block">
			<div
				onClick={(e) => {
					e.stopPropagation();
					setOpen((o) => !o);
				}}
			>
				{children}
			</div>

			{open && (
				<div className="absolute right-0 mt-2 w-36 bg-white border rounded-lg shadow z-20">
					{items.map((item, idx) =>
						item.to ? (
							<Link
								key={idx}
								to={item.to}
								onClick={() => setOpen(false)}
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
