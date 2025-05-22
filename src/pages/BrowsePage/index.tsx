import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useFetchVenues } from '../../hooks/useFetchVenues';
import SearchSection from '../../components/venues/SearchAndFilters/SearchSection';
import ResultsBanner from '../../components/venues/SearchAndFilters/ResultBanner';
import VenueList from '../../components/venues/VenueList';
import Pagination from '../../components/commons/Pagination';
import { SortDropdown, SortValue } from '../../components/venues/SearchAndFilters/SortDropdown';
import { SearchParams } from '../../App';

export default function BrowsePage() {
	const location = useLocation();
	const initialParams = (location.state as { params?: SearchParams })?.params;
	const defaultParams: SearchParams = {
		city: '',
		guests: 1,
		dateFrom: '',
		dateTo: '',
		amenities: { wifi: false, parking: false, breakfast: false, pets: false },
	};

	// ACTIVE filters drive banner/data
	const [activeFilters, setActiveFilters] = useState<SearchParams>(
		initialParams || defaultParams
	);
	// PENDING filters drive the inputs
	const [pendingFilters, setPendingFilters] = useState<SearchParams>(
		initialParams || defaultParams
	);

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

	const resultRef = useRef<HTMLDivElement>(null);

	// initial load
	useEffect(() => {
		fetchAllVenues().then(() =>
			applyFilters({
				query: activeFilters.city,
				guests: activeFilters.guests,
				dateFrom: activeFilters.dateFrom,
				dateTo: activeFilters.dateTo,
				amenities: activeFilters.amenities,
				sort: 'created',
				sortOrder: 'desc',
				page: 1,
			})
		);
	}, []);

	// scroll on page change
	useEffect(() => {
		resultRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [currentPage]);

	// map store sort → dropdown value
	const getSortValue = (sort: string, order: 'asc' | 'desc'): SortValue => {
		if (sort === 'price') return order === 'asc' ? 'priceAsc' : 'priceDesc';
		if (sort === 'rating') return 'rating';
		if (sort === 'bookings') return 'popularity';
		return 'newest';
	};
	const currentSortValue = getSortValue(currentSort, currentSortOrder);

	// handle dropdown change
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
		resultRef.current?.scrollIntoView({ behavior: 'smooth' });
	};

	// Search, Apply, Clear handlers (unchanged)
	const handleSearchClick = () => {
		setActiveFilters(pendingFilters);
		applyFilters({
			...pendingFilters,
			query: pendingFilters.city,
			sort: currentSort,
			sortOrder: currentSortOrder,
			page: 1,
		});
	};

	const handleApplyAmenities = () => {
		setActiveFilters(pendingFilters);
		applyFilters({
			...pendingFilters,
			query: pendingFilters.city,
			sort: currentSort,
			sortOrder: currentSortOrder,
			page: 1,
		});
	};

	const handleClear = () => {
		setPendingFilters(defaultParams);
		setActiveFilters(defaultParams);
		applyFilters({
			...defaultParams,
			query: '',
			sort: 'created',
			sortOrder: 'desc',
			page: 1,
		});
	};

	// pagination
	const onPageChange = (page: number) => {
		setPage(page);
		applyFilters({ ...activeFilters, query: activeFilters.city, page });
	};

	return (
		<div className="translate-y-24 space-y-6">
			<SearchSection
				filters={pendingFilters}
				setFilters={setPendingFilters}
				onSearchClick={handleSearchClick}
				onClear={handleClear}
				onApplyAmenities={handleApplyAmenities}
			/>

			<ResultsBanner filters={activeFilters} ref={resultRef} />

			{/* Sort dropdown */}
			<div className="flex justify-end w-[calc(100%-2rem)] max-w-5xl mx-auto px-4">
				<SortDropdown onChange={handleSortChange} currentSort={currentSortValue} />
			</div>

			<VenueList venues={venues} isLoading={isLoading} error={error} />

			{meta.pageCount > 1 && (
				<Pagination
					currentPage={currentPage}
					pageCount={meta.pageCount}
					onPageChange={onPageChange}
				/>
			)}
		</div>
	);
}
