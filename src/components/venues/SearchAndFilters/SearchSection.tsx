import { forwardRef } from 'react';
import {CommonButton} from '../../commons/Buttons.tsx';
import VenueAvailabilitySearch, {
	VenueAvailabilitySearchRef,
} from './VenueAvailabilitySearch';
import AmenitiesFilter from './AmenitiesFilter';
import AdBanner from '../../../components/commons/AdBanner';
import { SearchParams } from '../../../App';

interface SearchSectionProps {
	filters: SearchParams;
	setFilters: React.Dispatch<React.SetStateAction<SearchParams>>;
	onSearchClick: () => void;
	onClear: () => void;
	onApplyAmenities: () => void;
}

// Forward ref so BrowsePage can call clearForm()
export default forwardRef<VenueAvailabilitySearchRef, SearchSectionProps>(
	function SearchSection(
		{ filters, setFilters, onSearchClick, onClear, onApplyAmenities },
		ref
	) {
		return (
			<>
				<AdBanner />

				<VenueAvailabilitySearch
					ref={ref}
					initialCity={filters.city}
					initialGuests={filters.guests}
					initialDateFrom={filters.dateFrom}
					initialDateTo={filters.dateTo}
					initialAmenities={filters.amenities}
					onInputChange={(params) => setFilters((f) => ({ ...f, ...params }))}
					onSearchClick={onSearchClick}
				/>

				<div className="flex justify-end w-[calc(100%-2rem)] max-w-5xl mx-auto">
					<CommonButton
						onClick={onClear}
						bgColor="bg-red-500"
						hoverColor="hover:bg-red-400"
						textColor="text-white"
					>
						Clear Search
					</CommonButton>
				</div>

				<AmenitiesFilter
					amenities={filters.amenities}
					onChange={(newA) => setFilters((f) => ({ ...f, amenities: newA }))}
					onApply={onApplyAmenities}
				/>
			</>
		);
	}
);
