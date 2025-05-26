import React, { forwardRef } from 'react';
import VenueAvailabilitySearch, {
	VenueAvailabilitySearchRef,
} from './VenueAvailabilitySearch';
import { SearchParams } from '../../../App';
import { CommonButton } from '../../commons/Buttons';

interface SearchSectionProps {
	filters: SearchParams;
	setFilters: React.Dispatch<React.SetStateAction<SearchParams>>;
	onSearchClick: () => void;
	onClear: () => void;
}

export default forwardRef<VenueAvailabilitySearchRef, SearchSectionProps>(
	function SearchSection({ filters, setFilters, onSearchClick, onClear }, ref) {
		return (
			<>
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

				<div className="flex justify-end w-[calc(100%-2rem)] max-w-5xl mx-auto mt-4">

					<CommonButton
						onClick={onClear}
						bgColor="none"
						hoverColor="hover:bg-background"
						textColor="text-primary"
						borderClass="border border-primary"
						className="text-xs"
					>
						Clear Search
					</CommonButton>
				</div>
			</>
		);
	}
);
