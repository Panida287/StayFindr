import React from 'react';

export interface AmenityIconProps {
	Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
	available: boolean;
	title: string;
	size?: number;
}

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
			title={title}
			style={{ width: size, height: size }}
		>
			<Icon className={`${colorClass} w-[${size}px] h-[${size}px]`} />
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
				>
					<line x1="18" y1="6" x2="6" y2="18" />
				</svg>
			)}
		</div>
	);
}
