import { format } from 'date-fns';
import { Star, StarIcon } from 'lucide-react';

type Review = {
	id: number;
	venueName: string;
	date: string;
	rating: number;
	text: string;
};

type Props = {
	/** Single review object including venue name, date, rating, and review text */
	review: Review;
};

/**
 * Card component to display a user’s review including venue, date, star rating, and text.
 */
export default function UserReviewCard({ review }: Props) {
	return (
		<article
			aria-label={`Review for ${review.venueName}`}
			className="bg-white rounded-lg p-4 shadow"
		>
			<header className="flex justify-between items-center mb-2">
				<div>
					<h3 className="font-semibold text-primary text-sm sm:text-base">
						{review.venueName}
					</h3>
					<time
						dateTime={review.date}
						className="text-xs text-gray-500"
					>
						{format(new Date(review.date), 'MMM d, yyyy')}
					</time>
				</div>

				<div
					className="flex items-center space-x-1"
					aria-label={`Rating: ${review.rating} out of 5 stars`}
				>
					{[1, 2, 3, 4, 5].map((i) =>
						i <= review.rating ? (
							<StarIcon
								key={i}
								size={16}
								className="text-yellow-500 fill-yellow-500"
								aria-hidden="true"
							/>
						) : (
							<Star
								key={i}
								size={16}
								className="text-gray-300"
								aria-hidden="true"
							/>
						)
					)}
				</div>
			</header>

			<p className="text-gray-700 text-sm leading-relaxed">
				{review.text}
			</p>
		</article>
	);
}
