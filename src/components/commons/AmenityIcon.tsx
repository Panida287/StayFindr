import React from 'react';

/**
 * Props for the AmenityIcon component.
 */
export interface AmenityIconProps {
	/** The icon component (usually from lucide-react or similar) */
	Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	/** Whether the amenity is available */
	available: boolean;
	/** Title/label for tooltip and screen readers */
	title: string;
	/** Optional size in pixels (default: 20) */
	size?: number;
}

/**
 * A visual icon representing an amenity.
 * Shows a strike-through line if the amenity is not available.
 */
export default function AmenityIcon({
	                                    Icon,
	                                    available,
	                                    title,
	                                    size = 20,
                                    }: AmenityIconProps) {
	const colorClass = available ? 'text-gray-600' : 'text-gray-300';

	return (
		<div
			className="relative inline-block"
			aria-label={title}
			title={title}
			style={{ width: size, height: size }}
		>
			<Icon className={`w-[${size}px] h-[${size}px] ${colorClass}`} />
			{!available && (
				<svg
					className="absolute inset-0"
					width={size}
					height={size}
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					aria-hidden="true"
				>
					<line x1="18" y1="6" x2="6" y2="18" />
				</svg>
			)}
		</div>
	);
}
