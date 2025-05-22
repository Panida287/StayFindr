interface RatingBadgeProps {
	rating: number;
}

const MOCK_REVIEWS = 99;

export default function RatingBadge({ rating }: RatingBadgeProps) {
	const qualityLabel = rating >= 4.5 ? 'Superb' : '';

	return (
		<div className="flex items-center gap-2">
			{/* big yellow star */}
			<i className="fa-solid fa-star-sharp text-2xl text-yellow-500"></i>

			{/* rating text */}
			<span className="text-black font-bold">
        {rating.toFixed(1)} / 5
      </span>

			{/* optional quality label */}
			{qualityLabel && (
				<span className="text-sm font-medium text-green-700">
          {qualityLabel}
        </span>
			)}

			{/* mock reviews count */}
			<span className="text-sm text-gray-600">
        ( {MOCK_REVIEWS}+ reviews )
      </span>
		</div>
	);
}
