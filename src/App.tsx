import { useEffect, useState } from 'react';
import { useFetchVenues } from './hooks/useFetchVenues';
import { useFetchProfile } from './hooks/useFetchProfile';
import { useNavigate } from 'react-router-dom';
import VenueAvailabilitySearch from './components/venues/SearchAndFilters/VenueAvailabilitySearch.tsx';
import TopVenuesCarousel from './components/venues/TopVenuesCarousel.tsx';

export type SearchParams = {
	city: string;
	query?: string;
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

	const defaultParams: SearchParams = {
		city: '',
		query: '',
		guests: 1,
		dateFrom: '',
		dateTo: '',
		amenities: {
			wifi: false,
			parking: false,
			breakfast: false,
			pets: false,
		},
	};

	const [searchParams, setSearchParams] = useState<SearchParams>(defaultParams);

	useEffect(() => {
		fetchAllVenues();
	}, [fetchAllVenues]);

	const handleInputChange = (params: SearchParams) => {
		setSearchParams(params);
	};

	const handleSearchClick = () => {
		const paramsWithQuery = {
			...searchParams,
			query: searchParams.city,
		};
		navigate('/browse', { state: { params: paramsWithQuery } });
	};

	return (
		<>
			<TopVenuesCarousel />

			<div className="relative -mt-[33px] w-full">
				<VenueAvailabilitySearch
					onInputChange={handleInputChange}
					onSearchClick={handleSearchClick}
					initialCity=""
					initialGuests={2}
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
		</>
	);
}

export default App;
