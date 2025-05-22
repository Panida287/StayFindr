import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useFetchVenues } from '../../hooks/useFetchVenues';
import { SortDropdown, SortValue } from '../../components/venues/SearchAndFilters/SortDropdown';
import VenueAvailabilitySearch, { VenueAvailabilitySearchRef } from '../../components/venues/SearchAndFilters/VenueAvailabilitySearch';
import { VenueCard } from '../../components/venues/VenueCard';
import Pagination from '../../components/commons/Pagination';
import { format, differenceInCalendarDays } from 'date-fns';
import { SearchParams } from '../../App';
import AmenitiesFilter from '../../components/venues/SearchAndFilters/AmenitiesFilter';
import AdBanner from '../../components/commons/AdBanner';
import { CommonButton } from '../../components/commons/Buttons';

export default function BrowsePage() {
	const location = useLocation();
	const resultRef = useRef<HTMLDivElement | null>(null);
	const searchRef = useRef<VenueAvailabilitySearchRef>(null);

	// If coming from homepage, we get params via state; otherwise fallback to defaults
	const initialParams = (location.state as { params?: SearchParams })?.params;

	const defaultParams: SearchParams = {
		city: '',
		guests: 1,
		dateFrom: '',
		dateTo: '',
		amenities: { wifi: false, parking: false, breakfast: false, pets: false },
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
		fetchAllVenues,
	} = useFetchVenues();

	const [activeFilters, setActiveFilters] = useState<SearchParams>(initialParams || defaultParams);
	const [pendingSearch, setPendingSearch] = useState<SearchParams>(initialParams || defaultParams);
	const [pendingAmenities, setPendingAmenities] = useState(initialParams?.amenities || defaultParams.amenities);

	// On mount: fetch and apply either initialParams or defaults
	useEffect(() => {
		fetchAllVenues().then(() => {
			applyFilters({
				query: activeFilters.city,
				sort: 'created',
				sortOrder: 'desc',
				page: 1,
				guests: activeFilters.guests,
				dateFrom: activeFilters.dateFrom,
				dateTo: activeFilters.dateTo,
				amenities: activeFilters.amenities,
			});
		});
	}, []);

	// Scroll into view when page changes
	useEffect(() => {
		resultRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [currentPage]);

	// Map server sort fields to dropdown keys
	const getSortValue = (sort: string, order: 'asc' | 'desc'): SortValue => {
		if (sort === 'price') return order === 'asc' ? 'priceAsc' : 'priceDesc';
		if (sort === 'rating') return 'rating';
		if (sort === 'bookings') return 'popularity';
		return 'newest';
	};
	const currentSortValue = getSortValue(currentSort, currentSortOrder);

	// Helper to scroll
	const scrollToResults = () => {
		resultRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	// Sort change handler
	const handleSortChange = (value: SortValue) => {
		let sortField = 'created';
		let sortOrder: 'asc' | 'desc' = 'desc';
		if (value === 'priceAsc') { sortField = 'price'; sortOrder = 'asc'; }
		if (value === 'priceDesc') { sortField = 'price'; sortOrder = 'desc'; }
		if (value === 'rating') { sortField = 'rating'; sortOrder = 'desc'; }
		if (value === 'popularity') { sortField = 'bookings'; sortOrder = 'desc'; }

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

	// Clear search → reset everything
	const handleClearSearch = () => {
		const reset: SearchParams = { ...defaultParams };
		setPendingSearch(reset);
		setPendingAmenities(reset.amenities);
		setActiveFilters(reset);
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
		scrollToResults();
	};

	// “Search” button on BrowsePage
	const handleSearchClick = () => {
		const updated = {
			...pendingSearch,
			amenities: pendingAmenities,
			query: pendingSearch.city,
			sort: currentSort,
			sortOrder: currentSortOrder,
			page: 1,
		};
		setActiveFilters(updated);
		applyFilters(updated);
		scrollToResults();
	};

	// “Apply Filter” for amenities
	const handleApplyAmenities = () => {
		const updated = {
			...pendingSearch,
			amenities: pendingAmenities,
			query: pendingSearch.city,
			sort: currentSort,
			sortOrder: currentSortOrder,
			page: 1,
		};
		setActiveFilters(updated);
		applyFilters(updated);
		scrollToResults();
	};

	// Build the “Showing results for…” banner
	const formattedFrom = activeFilters.dateFrom ? format(new Date(activeFilters.dateFrom), 'MMM d') : '';
	const formattedTo = activeFilters.dateTo ? format(new Date(activeFilters.dateTo), 'MMM d') : '';
	const nights = activeFilters.dateFrom && activeFilters.dateTo
		? differenceInCalendarDays(new Date(activeFilters.dateTo), new Date(activeFilters.dateFrom))
		: 0;
	const activeAmenities = Object.entries(activeFilters.amenities)
		.filter(([, v]) => v)
		.map(([key]) => key);

	return (
		<div className="translate-y-24 space-y-6">
			<AdBanner />

			<VenueAvailabilitySearch
				ref={searchRef}
				onInputChange={params => setPendingSearch({ ...params, amenities: pendingAmenities })}
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
				onChange={setPendingAmenities}
				onApply={handleApplyAmenities}
			/>

			<div
				ref={resultRef}
				className="bg-background px-4 py-3 rounded text-sm text-primary max-w-5xl mx-auto leading-loose"
			>
				Showing results for <strong className="capitalize">{activeFilters.city || 'all cities'}</strong>
				{formattedFrom && <> from <strong>{formattedFrom}</strong></>}
				{formattedTo && <> to <strong>{formattedTo}</strong></>}
				{' — '}
				{nights > 0 && <strong>{nights} night{nights > 1 ? 's' : ''}, </strong>}
				<strong>{activeFilters.guests} guest{activeFilters.guests > 1 ? 's' : ''}</strong>
				{activeAmenities.length > 0 && (
					<span> —{' '}
						{activeAmenities.map(a => (
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

			<div className="grid w-[calc(100%-2rem)] max-w-5xl mx-auto gap-6">
				{isLoading
					? <p>Loading venues...</p>
					: error
						? <p className="text-red-500">{error}</p>
						: venues.length > 0
							? venues.map(v => <VenueCard key={v.id} venue={v} />)
							: <p className="text-center text-gray-500 col-span-full">No venues match your search.</p>
				}
			</div>

			{meta.pageCount > 1 && (
				<Pagination
					currentPage={currentPage}
					pageCount={meta.pageCount}
					onPageChange={page => {
						setPage(page);
						applyFilters({ ...activeFilters, query: activeFilters.city, page });
						scrollToResults();
					}}
				/>
			)}
		</div>
	);
}
