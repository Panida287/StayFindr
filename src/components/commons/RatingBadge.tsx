interface RatingBadgeProps {
	/** Rating between 0 and 5 (can be fractional) */
	rating: number;
}

/**
 * Displays a star-based rating badge with label and number.
 * Automatically shows full, half, and empty stars.
 */
export default function RatingBadge({ rating }: RatingBadgeProps) {
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating - fullStars >= 0.5;
	const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

	const label =
		rating >= 4.5
			? 'Superb'
			: rating >= 3.5
				? 'Great'
				: rating >= 2.5
					? 'Average'
					: rating >= 1.5
						? 'Poor'
						: 'Very Poor';

	return (
		<div className="flex flex-col items-start" aria-label={`Rating: ${rating} stars (${label})`}>
			{/* Star Icons */}
			<div className="flex items-center gap-1" role="img" aria-hidden="true">
				{Array.from({ length: fullStars }).map((_, i) => (
					<i key={`full-${i}`} className="fa-solid fa-star text-yellow-500" />
				))}

				{hasHalfStar && (
					<i className="fa-solid fa-star-half-stroke text-yellow-500" />
				)}

				{Array.from({ length: emptyStars }).map((_, i) => (
					<i key={`empty-${i}`} className="fa-regular fa-star text-yellow-500" />
				))}
			</div>

			{/* Numeric & Label */}
			<span className="text-xs text-gray-700 mt-1 text-left sr-only">
				{rating} stars - {label}
			</span>
			<span className="text-xs text-gray-700 mt-1 text-left not-sr-only">
				<span className="font-medium">{rating} stars</span>
				{rating >= 1 && <span className="ml-1 text-green-700">/ {label}</span>}
			</span>
		</div>
	);
}
