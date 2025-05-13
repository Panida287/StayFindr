import { useEffect } from 'react';
import { useFetchVenues } from './hooks/useFetchVenues';
import { useFetchProfile } from './hooks/useFetchProfile';
import { useNavigate } from 'react-router-dom';
import VenueAvailabilitySearch from './components/venues/VenueAvailabilitySearch';

export type SearchParams = {
	city: string;
	guests: number;
	dateFrom: string;
	dateTo: string;
	amenities: {
		wifi: boolean;
		parking: boolean;
		breakfast: boolean;
		pets: boolean;
	};
};

function App() {
	useFetchProfile();
	const navigate = useNavigate();
	const { fetchAllVenues } = useFetchVenues();

	useEffect(() => {
		fetchAllVenues();
	}, [fetchAllVenues]);

	const handleAvailabilitySearch = (params: SearchParams) => {
		navigate('/browse', { state: { params } });
	};

	return (
		<div className="p-4 space-y-6">
			<VenueAvailabilitySearch
				onSearch={handleAvailabilitySearch}
				initialCity=""
				initialGuests={1}
				initialDateFrom=""
				initialDateTo=""
				initialAmenities={{
					wifi: false,
					parking: false,
					breakfast: false,
					pets: false,
				}}
			/>
		</div>
	);
}

export default App;