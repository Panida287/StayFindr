import { useFetchVenues } from './hooks/useFetchVenues.ts';
import {VenueCard} from './components/venues/VenueCard.tsx';

function App() {
	const title = document.querySelector('title');
	if (title) {
		title.textContent = 'StayFindr';
	}

	const { venues, isLoading, error } = useFetchVenues();

	if (isLoading) return <p>Loading venues...</p>;

	if (error) return <p>Error: {error}</p>;

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
			{venues?.map((venue) => (
				<VenueCard key={venue.id} venue={venue} />
			))}
		</div>
	);
}

export default App;
