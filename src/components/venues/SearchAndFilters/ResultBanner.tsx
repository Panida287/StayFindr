import { forwardRef } from 'react';
import { format, differenceInCalendarDays } from 'date-fns';

type Props = {
	/** Number of venues matching the filters */
	resultsCount: number;
	/** Filters applied to the search result */
	filters: {
		city: string;
		guests: number;
		dateFrom: string;
		dateTo: string;
		amenities: Record<string, boolean>;
	};
};

/**
 * A sticky banner summarizing search results, dates, and selected filters.
 *
 * @component
 * @param {number} resultsCount - Total number of venues returned from the search
 * @param {Object} filters - Applied search filters (city, guests, dates, amenities)
 * @param {React.Ref<HTMLDivElement>} ref - Optional forwarded ref for scroll anchoring
 * @returns {JSX.Element} A visually styled banner summarizing search criteria
 */
const ResultsBanner = forwardRef<HTMLDivElement, Props>(({ resultsCount, filters }, ref) => {
	const { city, guests, dateFrom, dateTo, amenities } = filters;

	const formattedFrom = dateFrom && format(new Date(dateFrom), 'MMM d, yyyy');
	const formattedTo = dateTo && format(new Date(dateTo), 'MMM d, yyyy');
	const nights =
		dateFrom && dateTo
			? differenceInCalendarDays(new Date(dateTo), new Date(dateFrom))
			: 0;

	const activeAmenities = Object.keys(amenities).filter((key) => amenities[key]);

	return (
		<section
			ref={ref}
			className="sticky top-20 z-20 bg-background/80 backdrop-blur-lg px-4 py-3 rounded text-sm text-primary max-w-5xl mx-auto leading-loose"
			aria-label="Search result summary"
		>
			<span>
				Showing{' '}
				<strong>
					{resultsCount} result{resultsCount !== 1 && 's'}
				</strong>{' '}
				for{' '}
				<strong className="capitalize">
					{city || 'all cities'}
				</strong>
			</span>

			{formattedFrom && (
				<span>
					{' '}
					from <strong>{formattedFrom}</strong>
				</span>
			)}
			{formattedTo && (
				<span>
					{' '}
					to <strong>{formattedTo}</strong>
				</span>
			)}

			{(nights > 0 || guests > 0) && (
				<span>
					{' — '}
					{nights > 0 && (
						<strong>
							{nights} night{nights > 1 && 's'}
						</strong>
					)}
					{nights > 0 && guests > 0 && ', '}
					{guests > 0 && (
						<strong>
							{guests} guest{guests > 1 && 's'}
						</strong>
					)}
				</span>
			)}

			{activeAmenities.length > 0 && (
				<span>
					{' — '}
					{activeAmenities.map((a) => (
						<span
							key={a}
							className="inline-block bg-yellow-500 text-white text-xs px-3 py-1 rounded-full ml-2 capitalize font-semibold"
						>
							{a}
						</span>
					))}
				</span>
			)}
		</section>
	);
});

export default ResultsBanner;
