import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useFetchVenues } from '../../hooks/useFetchVenues';
import SearchSection from '../../components/venues/SearchAndFilters/SearchSection';
import ResultsBanner from '../../components/venues/SearchAndFilters/ResultBanner';
import VenueList from '../../components/venues/VenueList';
import Pagination from '../../components/commons/Pagination';
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

	// ACTIVE = what's actually applied to your banner & data store
	const [activeFilters, setActiveFilters] = useState<SearchParams>(
		initialParams || defaultParams
	);
	// PENDING = what the user is currently editing
	const [pendingFilters, setPendingFilters] = useState<SearchParams>(
		initialParams || defaultParams
	);

	const {
		venues,
		isLoading,
		error,
		meta,
		currentPage,
		setPage,
		applyFilters,
		fetchAllVenues,
	} = useFetchVenues();

	const resultRef = useRef<HTMLDivElement>(null);

	// On mount, fetch & apply the ACTIVE filters once
	useEffect(() => {
		fetchAllVenues().then(() => {
			applyFilters({
				query: activeFilters.city,
				guests: activeFilters.guests,
				dateFrom: activeFilters.dateFrom,
				dateTo: activeFilters.dateTo,
				amenities: activeFilters.amenities,
				sort: 'created',
				sortOrder: 'desc',
				page: 1,
			});
		});
	}, []);

	useEffect(() => {
		resultRef.current?.scrollIntoView({ behavior: 'smooth' });
	}, [currentPage]);

	const handleSearchClick = () => {
		setActiveFilters(pendingFilters);
		applyFilters({
			...pendingFilters,
			query: pendingFilters.city,
			sort: 'created',
			sortOrder: 'desc',
			page: 1,
		});
	};

	const handleApplyAmenities = () => {
		setActiveFilters(pendingFilters);
		applyFilters({
			...pendingFilters,
			query: pendingFilters.city,
			sort: 'created',
			sortOrder: 'desc',
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
