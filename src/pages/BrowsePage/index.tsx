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
		amenities: {wifi: false, parking: false, breakfast: false, pets: false},
	};

	// ACTIVE = what's applied
	const [activeFilters, setActiveFilters] = useState<SearchParams>(
		initialParams || defaultParams
	);
	// PENDING = what's being edited
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

	const searchRef = useRef<any>(null);
	const resultRef = useRef<HTMLDivElement>(null);

	// Initial fetch + apply
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

	// Scroll on page change
	useEffect(() => {
		resultRef.current?.scrollIntoView({behavior: 'smooth'});
	}, [currentPage]);

	// Sort dropdown mapping
	const getSortValue = (sort: string, order: 'asc' | 'desc'): SortValue => {
		if (sort === 'price') return order === 'asc' ? 'priceAsc' : 'priceDesc';
		if (sort === 'rating') return 'rating';
		if (sort === 'bookings') return 'popularity';
		return 'newest';
	};
	const currentSortValue = getSortValue(currentSort, currentSortOrder);

	const handleSortChange = (value: SortValue) => {
		let sortField = 'created';
		let sortOrder: 'asc' | 'desc' = 'desc';
		if (value === 'priceAsc') {
			sortField = 'price';
			sortOrder = 'asc';
		}
		if (value === 'priceDesc') {
			sortField = 'price';
			sortOrder = 'desc';
		}
		if (value === 'rating') {
			sortField = 'rating';
			sortOrder = 'desc';
		}
		if (value === 'popularity') {
			sortField = 'bookings';
			sortOrder = 'desc';
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
		resultRef.current?.scrollIntoView({behavior: 'smooth'});
	};

	// “Search” button
	const handleSearchClick = () => {
		setActiveFilters(pendingFilters);
		applyFilters({
			...pendingFilters,
			query: pendingFilters.city,
			sort: currentSort,
			sortOrder: currentSortOrder,
			page: 1,
		});
		resultRef.current?.scrollIntoView({behavior: 'smooth'});
	};

	// “Apply Filter” under amenities
	const handleApplyAmenities = () => {
		setActiveFilters(pendingFilters);
		applyFilters({
			...pendingFilters,
			query: pendingFilters.city,
			sort: currentSort,
			sortOrder: currentSortOrder,
			page: 1,
		});
		resultRef.current?.scrollIntoView({behavior: 'smooth'});
	};

	// **Clear**: reset filters, clear inputs, scroll to results
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
		searchRef.current?.clearForm();
		resultRef.current?.scrollIntoView({behavior: 'smooth'});
	};

	// Pagination
	const onPageChange = (page: number) => {
		setPage(page);
		applyFilters({...activeFilters, query: activeFilters.city, page});
		resultRef.current?.scrollIntoView({behavior: 'smooth'});
	};

	return (
		<div className="mt-24 space-y-6">
			<SearchSection
				ref={searchRef}
				filters={pendingFilters}
				setFilters={setPendingFilters}
				onSearchClick={handleSearchClick}
				onClear={handleClear}
				onApplyAmenities={handleApplyAmenities}
			/>

			<ResultsBanner filters={activeFilters} ref={resultRef} />

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
