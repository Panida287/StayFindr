import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useFetchVenues } from '../../hooks/useFetchVenues';
import SearchSection from '../../components/venues/SearchAndFilters/SearchSection.tsx';
import ResultsBanner from '../../components/venues/SearchAndFilters/ResultBanner.tsx';
import VenueList from '../../components/venues/VenueList.tsx';
import Pagination from '../../components/commons/Pagination';

export default function BrowsePage() {
	const location = useLocation();
	const initialParams = (location.state as any)?.params;
	const defaultParams = { city: '', guests: 1, dateFrom: '', dateTo: '', amenities: { wifi: false, parking: false, breakfast: false, pets: false } };
	const [filters, setFilters] = useState(initialParams || defaultParams);
	const { venues, isLoading, error, meta, currentPage, setPage, applyFilters, fetchAllVenues } = useFetchVenues();

	const resultRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		fetchAllVenues().then(() => applyFilters({ ...filters, query: filters.city, sort: 'created', sortOrder: 'desc', page: 1 }));
	}, []);

	useEffect(() => { resultRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [currentPage]);

	return (
		<div className="translate-y-24 space-y-6">
			<SearchSection filters={filters} setFilters={setFilters} applyFilters={applyFilters} />
			<ResultsBanner filters={filters} ref={resultRef} />
			<VenueList venues={venues} isLoading={isLoading} error={error} />
			{meta.pageCount > 1 && (
				<Pagination
					currentPage={currentPage}
					pageCount={meta.pageCount}
					onPageChange={page => { setPage(page); applyFilters({ ...filters, query: filters.city, page }); }}
				/>
			)}
		</div>
	);
}
