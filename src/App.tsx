import { useEffect, useState } from 'react';
import { useFetchVenues } from './hooks/useFetchVenues';
import { useFetchProfile } from './hooks/useFetchProfile';
import { useNavigate } from 'react-router-dom';
import VenueAvailabilitySearch from './components/venues/SearchAndFilters/VenueAvailabilitySearch.tsx';
import TopVenuesCarousel from './components/venues/TopVenuesCarousel.tsx';
import AdsAbout from './components/commons/Ads/AdsAbout.tsx';
import { RoomGallery } from './components/commons/Ads/RoomGallery.tsx';

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
const sampleRooms = [
	{
		id: 1,
		imageUrl: '/assets/images/ads-images/room1.jpeg',
		title: 'Family Suite Room',
		details: '120m² / 2 Bedroom / pet friendly',
	},
	{
		id: 2,
		imageUrl: '/assets/images/ads-images/room2.jpeg',
		title: 'Executive Suite',
		details: '80m² / King Bed / Ocean View',
	},
	{
		id: 3,
		imageUrl: '/assets/images/ads-images/room3.jpeg',
		title: 'Deluxe Suite',
		details: '100m² / Queen Bed / City View',
	},
	{
		id: 4,
		imageUrl: '/assets/images/ads-images/room4.jpeg',
		title: 'Premium Suite',
		details: '110m² / King Bed / Mountain View',
	},
	{
		id: 5,
		imageUrl: '/assets/images/ads-images/room5.jpeg',
		title: 'Junior Suite',
		details: '70m² / Queen Bed / Garden View',
	},
];

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

			<AdsAbout />

			<RoomGallery rooms={sampleRooms} />
		</>
	);
}

export default App;
