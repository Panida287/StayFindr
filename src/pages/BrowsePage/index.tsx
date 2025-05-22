import { JSX, useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useFetchVenues } from '../../hooks/useFetchVenues';
import SearchSection from '../../components/venues/SearchAndFilters/SearchSection';
import ResultsBanner from '../../components/venues/SearchAndFilters/ResultBanner';
import AmenitiesFilter from '../../components/venues/SearchAndFilters/AmenitiesFilter';
import VenueList from '../../components/venues/VenueList';
import Pagination from '../../components/commons/Pagination';
import { SortDropdown, SortValue } from '../../components/venues/SearchAndFilters/SortDropdown';
import { SearchParams } from '../../App';
import { CommonButton } from '../../components/commons/Buttons.tsx';

export default function BrowsePage(): JSX.Element {
	const location = useLocation();
	const [currentPage, setCurrentPage] = useState(1);
	const [showMobileFilters, setShowMobileFilters] = useState(false);
	const resultRef = useRef<HTMLDivElement>(null);

	const initialParams = (location.state as { params?: SearchParams })?.params;
	const defaultParams: SearchParams = {
		city: '',
		guests: 2,
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

	// Initial load
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

	// Re-apply filters & scroll on page|filter|sort change
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
	}, [currentPage, activeFilters, currentSort, currentSortOrder, setPage, applyFilters]);

	// Handlers
	const onPageChange = (page: number) => setCurrentPage(page);

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
		setShowMobileFilters(false);
	};

	const handleApplyAmenities = () => {
		setActiveFilters(pendingFilters);
		setCurrentPage(1);
		setShowMobileFilters(false);
	};

	const handleClear = () => {
		setPendingFilters(defaultParams);
		setActiveFilters(defaultParams);
		setCurrentPage(1);
		setShowMobileFilters(false);
	};

	return (
		<div className="mt-24 px-4 max-w-7xl mx-auto space-y-6">
			{/* 1. Banner + Search stay unchanged */}
			<SearchSection
				filters={pendingFilters}
				setFilters={setPendingFilters}
				onSearchClick={handleSearchClick}
				onClear={handleClear}
			/>

			{/* 2. Mobile toggle for filters */}
			<div className="md:hidden text-center">
				<CommonButton
					onClick={() => setShowMobileFilters((v) => !v)}
					bgColor="bg-white"
					hoverColor="hover:bg-gray-50"
					textColor="text-gray-700"
					className="px-4 py-2 rounded-full border border-gray-300"
				>
					{showMobileFilters ? 'Hide Amenities' : 'Show Amenities'}
				</CommonButton>
			</div>

			{/* 3. On md+, two‐column: sidebar + results */}
			<div className="md:grid md:grid-cols-4 md:gap-6">
				{/* Sidebar: hidden on sm, shown on md+ */}
				<aside className="hidden md:block">
					<AmenitiesFilter
						amenities={pendingFilters.amenities}
						onChange={(a) => setPendingFilters((f) => ({ ...f, amenities: a }))}
						onApply={handleApplyAmenities}
					/>
				</aside>

				{/* Main results area */}
				<main className="md:col-span-3 space-y-6">
					{/* On mobile, show amenities under search when toggled */}
					{showMobileFilters && (
						<div className="md:hidden">
							<AmenitiesFilter
								amenities={pendingFilters.amenities}
								onChange={(a) => setPendingFilters((f) => ({ ...f, amenities: a }))}
								onApply={handleApplyAmenities}
							/>
						</div>
					)}

					{/* Results banner + sort + list + pagination */}
					<ResultsBanner filters={activeFilters} />

					<div className="flex justify-end">
						<SortDropdown
							onChange={handleSortChange}
							currentSort={(() => {
								if (currentSort === 'price' && currentSortOrder === 'asc') return 'priceAsc';
								if (currentSort === 'price' && currentSortOrder === 'desc') return 'priceDesc';
								if (currentSort === 'rating') return 'rating';
								if (currentSort === 'bookings') return 'popularity';
								return 'newest';
							})()}
						/>
					</div>

					<div ref={resultRef} className="space-y-6">
						<VenueList venues={venues} isLoading={isLoading} error={error} />
						{meta.pageCount > 1 && (
							<Pagination
								currentPage={currentPage}
								pageCount={meta.pageCount}
								onPageChange={onPageChange}
							/>
						)}
					</div>
				</main>
			</div>
		</div>
	);
}
