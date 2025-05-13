import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useFetchVenues } from '../../hooks/useFetchVenues';
import { SortDropdown, SortValue } from '../../components/venues/SortDropdown';
import VenueAvailabilitySearch from '../../components/venues/VenueAvailabilitySearch';
import { VenueCard } from '../../components/venues/VenueCard';
import Pagination from '../../components/venues/Pagination';
import { format, differenceInCalendarDays } from 'date-fns';
import { SearchParams } from '../../App';

function BrowsePage() {
	const location = useLocation();
	const resultRef = useRef<HTMLDivElement | null>(null);
	const searchParams = (location.state as { params: SearchParams })?.params;

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

	useEffect(() => {
		if (searchParams) {
			applyFilters({ ...searchParams, page: 1 });
		}
	}, [searchParams, applyFilters]);

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

		setSort(sortField, sortOrder);
		if (searchParams) {
			applyFilters({ ...searchParams, sort: sortField, sortOrder, page: 1 });
		}
	};

	const formattedFrom = searchParams?.dateFrom ? format(new Date(searchParams.dateFrom), 'MMM d') : 'any date';
	const formattedTo = searchParams?.dateTo ? format(new Date(searchParams.dateTo), 'MMM d') : '';
	const nights = searchParams?.dateFrom && searchParams?.dateTo
		? differenceInCalendarDays(new Date(searchParams.dateTo), new Date(searchParams.dateFrom))
		: 0;

	const activeAmenities = searchParams
		? Object.entries(searchParams.amenities).filter(([, v]) => v).map(([k]) => k)
		: [];

	return (
		<div className="p-4 space-y-6">
			<VenueAvailabilitySearch
				onSearch={(params) => applyFilters({ ...params, page: 1 })}
				initialCity={searchParams?.city || ''}
				initialGuests={searchParams?.guests || 1}
				initialDateFrom={searchParams?.dateFrom || ''}
				initialDateTo={searchParams?.dateTo || ''}
				initialAmenities={searchParams?.amenities || {
					wifi: false,
					parking: false,
					breakfast: false,
					pets: false,
				}}
			/>

			<div ref={resultRef} className="bg-gray-100 px-4 py-3 rounded text-sm text-gray-700">
				Showing results for <strong>{searchParams?.city || 'all cities'}</strong>{' '}
				{searchParams?.dateFrom && `from ${formattedFrom}`} {searchParams?.dateTo && `to ${formattedTo}`} —{' '}
				{nights > 0 && `${nights} night${nights > 1 ? 's' : ''}, `}
				{searchParams?.guests} guest{searchParams?.guests && searchParams.guests > 1 ? 's' : ''}
				{activeAmenities.length > 0 && (
					<span>
            {' '}—{' '}
						{activeAmenities.map((a) => (
							<span key={a} className="bg-olive text-white px-2 py-0.5 rounded ml-1">
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
					onPageChange={setPage}
				/>
			)}
		</div>
	);
}

export default BrowsePage;
