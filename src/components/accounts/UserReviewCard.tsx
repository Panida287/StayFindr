import { format } from 'date-fns';
import { Star, StarIcon } from 'lucide-react';

type Review = {
	id: number;
	venueName: string;
	date: string;
	rating: number;
	text: string;
};

export default function UserReviewCard({ review }: { review: Review }) {
	return (
		<div className="bg-white rounded-lg p-4 shadow">
			<div className="flex justify-between items-center mb-2">
				<div>
					<h6 className="font-semibold">{review.venueName}</h6>
					<p className="text-xs text-gray-500">
						{format(new Date(review.date), 'MMM d, yyyy')}
					</p>
				</div>
				<div className="flex items-center space-x-1">
					{[1, 2, 3, 4, 5].map((i) =>
						i <= review.rating ? (
							<StarIcon key={i} size={16} className="text-yellow-500 fill-yellow-500" />
						) : (
							<Star key={i} size={16} className="text-gray-300" />
						)
					)}
				</div>
			</div>
			<p className="text-gray-700 text-sm">{review.text}</p>
		</div>
	);
}
