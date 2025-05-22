import { Venue } from '../../types/venues';
import { VenueCard } from './VenueCard';

interface VenueListProps {
	venues: Venue[];
	isLoading: boolean;
	error: string | null;
}

export default function VenueList({
	                                  venues,
	                                  isLoading,
	                                  error,
                                  }: VenueListProps) {
	if (isLoading) {
		return (
			<div className="flex justify-center items-center mt-8">
				<div className="h-12 w-12 border-4 border-t-transparent border-yellow-500 rounded-full animate-spin"></div>
			</div>
		);
	}
	if (error) return <p className="text-red-500">{error}</p>;
	if (venues.length === 0)
		return <p className="text-center text-gray-500">No venues match your search.</p>;

	return (
		<div className="grid gap-6 w-[calc(100%-2rem)] max-w-5xl mx-auto ">
			{venues.map((v) => (
				<VenueCard key={v.id} venue={v} />
			))}
		</div>
	);
}
