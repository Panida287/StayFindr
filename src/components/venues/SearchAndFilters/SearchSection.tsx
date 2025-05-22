import { useRef } from 'react';
import { CommonButton } from '../../commons/Buttons';
import VenueAvailabilitySearch, { VenueAvailabilitySearchRef } from './VenueAvailabilitySearch';
import AmenitiesFilter from './AmenitiesFilter';
import AdBanner from '../../commons/AdBanner';
import { SearchParams } from '../../../App';

type Amenities = SearchParams['amenities'];

interface SearchSectionProps {
	filters: SearchParams;
	setFilters: React.Dispatch<React.SetStateAction<SearchParams>>;
	applyFilters: (params: {
		query: string;
		sort?: string;
		sortOrder?: 'asc' | 'desc';
		page: number;
		guests: number;
		dateFrom: string;
		dateTo: string;
		amenities: Amenities;
	}) => void;
}

export default function SearchSection({
	                                      filters,
	                                      setFilters,
	                                      applyFilters,
                                      }: SearchSectionProps) {
	const searchRef = useRef<VenueAvailabilitySearchRef>(null);

	const doSearch = () => {
		applyFilters({
			query: filters.city,
			sort: 'created',
			sortOrder: 'desc',
			page: 1,
			guests: filters.guests,
			dateFrom: filters.dateFrom,
			dateTo: filters.dateTo,
			amenities: filters.amenities,
		});
	};

	const clearAll = () => {
		const reset: SearchParams = {
			city: '',
			guests: 1,
			dateFrom: '',
			dateTo: '',
			amenities: { wifi: false, parking: false, breakfast: false, pets: false },
		};
		setFilters(reset);
		applyFilters({
			query: '',
			sort: 'created',
			sortOrder: 'desc',
			page: 1,
			guests: reset.guests,
			dateFrom: reset.dateFrom,
			dateTo: reset.dateTo,
			amenities: reset.amenities,
		});
		searchRef.current?.clearForm();
	};

	return (
		<>
			<AdBanner />

			<VenueAvailabilitySearch
				ref={searchRef}
				initialCity={filters.city}
				initialGuests={filters.guests}
				initialDateFrom={filters.dateFrom}
				initialDateTo={filters.dateTo}
				initialAmenities={filters.amenities}
				onInputChange={(params) => setFilters((f) => ({ ...f, ...params }))}
				onSearchClick={doSearch}
			/>

			<div className="flex justify-end w-[calc(100%-2rem)] max-w-5xl mx-auto">
				<CommonButton
					onClick={clearAll}
					bgColor="bg-red-500"
					hoverColor="hover:bg-red-400"
					textColor="text-white"
				>
					Clear Search
				</CommonButton>
			</div>

			<AmenitiesFilter
				amenities={filters.amenities}
				onChange={(newAms) => setFilters((f) => ({ ...f, amenities: newAms }))}
				onApply={doSearch}
			/>
		</>
	);
}
