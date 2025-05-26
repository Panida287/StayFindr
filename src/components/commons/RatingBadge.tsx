interface RatingBadgeProps {
	/** Rating between 0 and 5 (may be fractional) */
	rating: number;
}

export default function RatingBadge({ rating }: RatingBadgeProps) {
	const fullStars = Math.floor(rating);
	const hasHalfStar = rating - fullStars >= 0.5;
	const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

	return (
		<div className="flex items-center gap-1">
			{Array.from({ length: fullStars }).map((_, i) => (
				<i
					key={`full-${i}`}
					className="fa-solid fa-star text-yellow-500"
				/>
			))}

			{hasHalfStar && (
				<i className="fa-solid fa-star-half-stroke text-yellow-500" />
			)}

			{Array.from({ length: emptyStars }).map((_, i) => (
				<i
					key={`empty-${i}`}
					className="fa-regular fa-star text-yellow-500"
				/>
			))}

			{rating >= 4.5 && (
				<span className="ml-2 text-sm font-medium text-green-700">
          Superb
        </span>
			)}
		</div>
	);
}
