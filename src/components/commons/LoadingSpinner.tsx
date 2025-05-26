type Props = {
	/** Diameter of the spinner in pixels (default: 24) */
	size?: number;
	/** Tailwind text color class (e.g., 'text-primary') */
	colorClass?: string;
	/** Additional Tailwind CSS classes for the SVG spinner */
	className?: string;
};

/**
 * Branded loading spinner with optional logo and customizable styling.
 * Used to indicate loading states throughout the application.
 */
export default function LoadingSpinner({
	                                       size = 24,
	                                       colorClass = 'text-primary',
	                                       className = '',
                                       }: Props) {
	return (
		<div
			role="status"
			aria-live="polite"
			className="flex flex-col justify-center items-center"
		>
			<img
				src="/assets/images/logos/logo-dark.png"
				alt="StayFindr logo"
				className="h-20 my-4"
			/>
			<svg
				className={`animate-spin ${colorClass} ${className}`}
				width={size}
				height={size}
				viewBox="0 0 24 24"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<circle
					className="opacity-25"
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					strokeWidth="4"
				/>
				<path
					className="opacity-75"
					fill="currentColor"
					d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
				/>
			</svg>
		</div>
	);
}
