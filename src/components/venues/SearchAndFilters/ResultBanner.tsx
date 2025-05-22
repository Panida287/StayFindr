import { forwardRef } from 'react';
import { format, differenceInCalendarDays } from 'date-fns';

type Props = {
	filters: {
		city: string;
		guests: number;
		dateFrom: string;
		dateTo: string;
		amenities: Record<string, boolean>;
	};
};

const ResultsBanner = forwardRef<HTMLDivElement, Props>(({ filters }, ref) => {
	const { city, guests, dateFrom, dateTo, amenities } = filters;
	const formattedFrom = dateFrom && format(new Date(dateFrom), 'MMM d');
	const formattedTo   = dateTo && format(new Date(dateTo),   'MMM d');
	const nights        = dateFrom && dateTo
		? differenceInCalendarDays(new Date(dateTo), new Date(dateFrom))
		: 0;

	const activeA = Object.keys(amenities).filter(k => amenities[k]);
	return (
		<div ref={ref} className="sticky top-20 z-20 bg-background/80 backdrop-blur-lg px-4 py-3 rounded text-sm text-primary max-w-5xl mx-auto leading-loose">
			Showing results for <strong className="capitalize">{city || 'all cities'}</strong>
			{formattedFrom && <> from <strong>{formattedFrom}</strong></>}
			{formattedTo   && <> to   <strong>{formattedTo}</strong></>}
			{' — '}
			{nights > 0 && <strong>{nights} night{nights>1?'s':''}, </strong>}
			<strong>{guests} guest{guests>1?'s':''}</strong>
			{activeA.length > 0 && (
				<span>
          {' — '}
					{activeA.map(a=>(
						<span key={a} className="inline-block bg-yellow-500 text-white text-xs px-3 py-1 rounded-full ml-2 capitalize font-semibold">
              {a}
            </span>
					))}
        </span>
			)}
		</div>
	);
});
export default ResultsBanner;
