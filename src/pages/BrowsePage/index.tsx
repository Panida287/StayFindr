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
	const [currentPage, setCurrentPage] = useState(1);
	const resultRef = useRef<HTMLDivElement>(null);

	const initialParams = (location.state as { params?: SearchParams })?.params;
	const defaultParams: SearchParams = {
		city: '',
		guests: 1,
		dateFrom: '',
		dateTo: '',
		amenities: { wifi: false, parking: false, breakfast: false, pets: false },
	};

	const [activeFilters, setActiveFilters] = useState<SearchParams>(
		initialParams || defaultParams
	);
	const [pendingFilters, setPendingFilters] = useState<SearchParams>(
		initialParams || defaultParams
	);

	const {
		venues,
		isLoading,
		error,
		meta,
		currentSort,
		currentSortOrder,
		fetchAllVenues,
		applyFilters,
		setPage,
		setSort,
	} = useFetchVenues();

	// Initial load: fetch all venues & apply default filters
	useEffect(() => {
		fetchAllVenues().then(() =>
			applyFilters({
				...activeFilters,
				query: activeFilters.city,
				sort: 'created',
				sortOrder: 'desc',
				page: 1,
			})
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Re-apply filters and scroll whenever page, filters, or sort change
	useEffect(() => {
		setPage(currentPage);
		applyFilters({
			...activeFilters,
			query: activeFilters.city,
			sort: currentSort,
			sortOrder: currentSortOrder,
			page: currentPage,
		});
		resultRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [currentPage, activeFilters, currentSort, currentSortOrder]);

	// Handlers
	const handleSortChange = (value: SortValue) => {
		let sortField = 'created';
		let sortOrder: 'asc' | 'desc' = 'desc';
		if (value === 'priceAsc') [sortField, sortOrder] = ['price', 'asc'];
		if (value === 'priceDesc') [sortField, sortOrder] = ['price', 'desc'];
		if (value === 'rating') [sortField, sortOrder] = ['rating', 'desc'];
		if (value === 'popularity') [sortField, sortOrder] = ['bookings', 'desc'];

		setSort(sortField, sortOrder);
		setCurrentPage(1);
	};

	const handleSearchClick = () => {
		setActiveFilters(pendingFilters);
		setCurrentPage(1);
	};

	const handleApplyAmenities = () => {
		setActiveFilters(pendingFilters);
		setCurrentPage(1);
	};

	const handleClear = () => {
		setPendingFilters(defaultParams);
		setActiveFilters(defaultParams);
		setCurrentPage(1);
	};

	const onPageChange = (page: number) => {
		setCurrentPage(page);
	};

	return (
		<div className="mt-24 space-y-6">
			<SearchSection
				filters={pendingFilters}
				setFilters={setPendingFilters}
				onSearchClick={handleSearchClick}
				onClear={handleClear}
				onApplyAmenities={handleApplyAmenities}
			/>

			<div ref={resultRef} className="space-y-6">
				<ResultsBanner filters={activeFilters} />

				<div className="flex justify-end w-[calc(100%-2rem)] max-w-5xl mx-auto px-4">
					<SortDropdown onChange={handleSortChange} currentSort={(() => {
						if (currentSort === 'price' && currentSortOrder === 'asc') return 'priceAsc';
						if (currentSort === 'price' && currentSortOrder === 'desc') return 'priceDesc';
						if (currentSort === 'rating') return 'rating';
						if (currentSort === 'bookings') return 'popularity';
						return 'newest';
					})()} />
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
		</div>
	);
}
