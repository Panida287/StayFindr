import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useFetchVenues } from '../../hooks/useFetchVenues';
import { SortDropdown, SortValue } from '../../components/venues/SearchAndFilters/SortDropdown.tsx';
import VenueAvailabilitySearch, {
	VenueAvailabilitySearchRef
} from '../../components/venues/SearchAndFilters/VenueAvailabilitySearch.tsx';
import { VenueCard } from '../../components/venues/VenueCard';
import Pagination from '../../components/commons/Pagination.tsx';
import { format, differenceInCalendarDays } from 'date-fns';
import { SearchParams } from '../../App';
import AmenitiesFilter from '../../components/venues/SearchAndFilters/AmenitiesFilter.tsx';
import AdBanner from '../../components/commons/AdBanner.tsx';
import { CommonButton } from '../../components/commons/Buttons.tsx';

function BrowsePage() {
	const location = useLocation();
	const resultRef = useRef<HTMLDivElement | null>(null);
	const searchRef = useRef<VenueAvailabilitySearchRef>(null);
	const initialParams = (location.state as { params: SearchParams })?.params;

	const defaultParams: SearchParams = {
		city: '',
		guests: 1,
		dateFrom: '',
		dateTo: '',
		amenities: {wifi: false, parking: false, breakfast: false, pets: false},
	};

	const {
		venues,
		isLoading,
		error,
		meta,
		currentPage,
		currentSort,
		currentSortOrder,
		setPage,
		setSort,
		applyFilters,
	} = useFetchVenues();

	const [activeFilters, setActiveFilters] = useState<SearchParams>(initialParams || defaultParams);
	const [pendingSearch, setPendingSearch] = useState<SearchParams>(initialParams || defaultParams);
	const [pendingAmenities, setPendingAmenities] = useState(initialParams?.amenities || defaultParams.amenities);

	useEffect(() => {
		if (initialParams) {
			applyFilters({...initialParams, query: initialParams.city, page: 1});
		}
	}, []);

	useEffect(() => {
		if (resultRef.current) {
			resultRef.current.scrollIntoView({behavior: 'smooth'});
		}
	}, [currentPage]);

	const getSortValue = (sort: string, order: 'asc' | 'desc'): SortValue => {
		if (sort === 'price') return order === 'asc' ? 'priceAsc' : 'priceDesc';
		if (sort === 'rating') return 'rating';
		if (sort === 'bookings') return 'popularity';
		return 'newest';
	};

	const currentSortValue = getSortValue(currentSort, currentSortOrder);

	const scrollToResults = () => {
		if (resultRef.current) {
			resultRef.current.scrollIntoView({behavior: 'smooth'});
		}
	};

	const handleSortChange = (value: SortValue) => {
		let sortField = 'created';
		let sortOrder: 'asc' | 'desc' = 'desc';

		switch (value) {
			case 'priceAsc':
				sortField = 'price';
				sortOrder = 'asc';
				break;
			case 'priceDesc':
				sortField = 'price';
				sortOrder = 'desc';
				break;
			case 'rating':
				sortField = 'rating';
				sortOrder = 'desc';
				break;
			case 'popularity':
				sortField = 'bookings';
				sortOrder = 'desc';
				break;
		}

		const updated = {
			...activeFilters,
			sort: sortField,
			sortOrder,
			query: activeFilters.city,
			page: 1,
		};
		setSort(sortField, sortOrder);
		setActiveFilters(updated);
		applyFilters(updated);
		scrollToResults();
	};

	const handleClearSearch = () => {
		const reset = {...defaultParams, query: ''};
		setPendingSearch(reset);
		setPendingAmenities(reset.amenities);
		setActiveFilters(reset);
		applyFilters({...reset, page: 1});
		searchRef.current?.clearForm();
		scrollToResults();
	};

	const handleSearchClick = () => {
		const updated = {
			...pendingSearch,
			amenities: pendingAmenities,
			query: pendingSearch.city,
			page: 1,
		};
		setActiveFilters(updated);
		applyFilters(updated);
		scrollToResults();
	};

	const handleApplyAmenities = () => {
		const updated = {
			...pendingSearch,
			amenities: pendingAmenities,
			query: pendingSearch.city,
			page: 1,
		};
		setActiveFilters(updated);
		applyFilters(updated);
		scrollToResults();
	};

	const formattedFrom = activeFilters.dateFrom ? format(new Date(activeFilters.dateFrom), 'MMM d') : 'any date';
	const formattedTo = activeFilters.dateTo ? format(new Date(activeFilters.dateTo), 'MMM d') : '';
	const nights =
		activeFilters.dateFrom && activeFilters.dateTo
			? differenceInCalendarDays(new Date(activeFilters.dateTo), new Date(activeFilters.dateFrom))
			: 0;

	const activeAmenities = activeFilters.amenities
		? Object.entries(activeFilters.amenities).filter(([, v]) => v).map(([k]) => k)
		: [];

	return (
		<div className="translate-y-24 space-y-6">
			<AdBanner />
			<VenueAvailabilitySearch
				ref={searchRef}
				onInputChange={(params) => setPendingSearch({...params, amenities: pendingAmenities})}
				onSearchClick={handleSearchClick}
				initialCity={activeFilters.city}
				initialGuests={activeFilters.guests}
				initialDateFrom={activeFilters.dateFrom}
				initialDateTo={activeFilters.dateTo}
				initialAmenities={activeFilters.amenities}
			/>

			<div className="flex justify-end w-[calc(100%-2rem)] max-w-5xl mx-auto">
				<CommonButton
					onClick={handleClearSearch}
					bgColor="bg-red-500"
					hoverColor="hover:bg-red-400"
					textColor="text-white"
				>
					Clear Search
				</CommonButton>
			</div>

			<AmenitiesFilter
				amenities={pendingAmenities}
				onChange={(newAmenities) => setPendingAmenities(newAmenities)}
				onApply={handleApplyAmenities}
			/>

			<div ref={resultRef} className="bg-background px-4 py-3 rounded text-sm text-primary max-w-5xl mx-auto leading-loose">
				Showing results for <strong className="capitalize">{activeFilters.city || 'all cities'}</strong>
				{activeFilters.dateFrom && (
					<> from <strong>{formattedFrom}</strong></>
				)}
				{activeFilters.dateTo && (
					<> to <strong>{formattedTo}</strong></>
				)}
				{' — '}
				{nights > 0 && (
					<strong>{nights} night{nights > 1 ? 's' : ''}, </strong>
				)}
				<strong>{activeFilters.guests} guest{activeFilters.guests > 1 ? 's' : ''}</strong>
				{activeAmenities.length > 0 && (
					<span>
                        {' '}—{' '}
						{activeAmenities.map((a) => (
							<span
								key={a}
								className="inline-block bg-yellow-500 text-white text-xs px-3 py-1 rounded-full ml-2 shadow-sm capitalize font-semibold"
							>
                            {a}
                            </span>
						))}
                     </span>
				)}
			</div>


			<SortDropdown onChange={handleSortChange} currentSort={currentSortValue} />

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{isLoading ? (
					<p>Loading venues...</p>
				) : error ? (
					<p className="text-red-500">{error}</p>
				) : venues.length > 0 ? (
					venues.map((venue) => <VenueCard key={venue.id} venue={venue} />)
				) : (
					<p className="text-center text-gray-500 col-span-full">No venues match your search.</p>
				)}
			</div>

			{meta && meta.pageCount > 1 && (
				<Pagination
					currentPage={currentPage}
					pageCount={meta.pageCount}
					onPageChange={(page) => {
						setPage(page);
						applyFilters({...activeFilters, query: activeFilters.city, page});
						scrollToResults();
					}}
				/>
			)}
		</div>
	);
}

export default BrowsePage;
