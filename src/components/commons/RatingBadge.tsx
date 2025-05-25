interface RatingBadgeProps {
	rating: number;
}

const MOCK_REVIEWS = 99;

export default function RatingBadge({rating}: RatingBadgeProps) {
	const qualityLabel = rating >= 4.5 ? 'Superb' : '';

	return (
		<div className="flex flex-col items-start justify-between">
			<div className="flex items-center gap-2">
				<i className="fa-solid fa-star-sharp text-2xl text-yellow-500"></i>

				<span className="text-black font-bold">
                    {rating.toFixed(1)} / 5
                </span>

				{qualityLabel && (
					<span className="text-sm font-medium text-green-700">
                        {qualityLabel}
                    </span>
				)}

			</div>
			<span className="text-sm text-gray-600">
				( {MOCK_REVIEWS}+ reviews )
			</span>
		</div>
	);
}
