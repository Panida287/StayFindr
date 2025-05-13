import { useEffect } from 'react';
import { useFetchVenues } from './hooks/useFetchVenues';
import { useFetchProfile } from './hooks/useFetchProfile';
import { useNavigate } from 'react-router-dom';
import VenueAvailabilitySearch from './components/venues/VenueAvailabilitySearch';
import TopVenuesCarousel from './components/venues/TopVenuesCarousel.tsx';

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
		<div className="p-4 space-y-10">
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

			<TopVenuesCarousel /> {/* ✅ Add this here */}
		</div>
	);
}

export default App;
