import { useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useFetchVenues } from '../../hooks/useFetchVenues';
import { SortDropdown, SortValue } from '../../components/venues/SearchAndFilters/SortDropdown.tsx';
import VenueAvailabilitySearch from '../../components/venues/SearchAndFilters/VenueAvailabilitySearch.tsx';
import { VenueCard } from '../../components/venues/VenueCard';
import Pagination from '../../components/commons/Pagination.tsx';
import { format, differenceInCalendarDays } from 'date-fns';
import { SearchParams } from '../../App';
import AmenitiesFilter from '../../components/venues/SearchAndFilters/AmenitiesFilter.tsx';

function BrowsePage() {
	const location = useLocation();
	const resultRef = useRef<HTMLDivElement | null>(null);
	const initialParams = (location.state as { params: SearchParams })?.params;

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

	const [activeFilters, setActiveFilters] = useState<SearchParams>({
		city: initialParams?.city || '',
		guests: initialParams?.guests || 1,
		dateFrom: initialParams?.dateFrom || '',
		dateTo: initialParams?.dateTo || '',
		amenities: initialParams?.amenities || {
			wifi: false,
			parking: false,
			breakfast: false,
			pets: false,
		},
	});

	useEffect(() => {
		if (initialParams) {
			const filters = {
				...activeFilters,
				query: initialParams.city,
				page: 1,
			};
			setActiveFilters(filters);
			applyFilters(filters);
		}
	}, []);

	useEffect(() => {
		if (resultRef.current) {
			resultRef.current.scrollIntoView({ behavior: 'smooth' });
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
			resultRef.current.scrollIntoView({ behavior: 'smooth' });
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

		setSort(sortField, sortOrder);

		const updated = { ...activeFilters, sort: sortField, sortOrder, page: 1 };
		setActiveFilters(updated);
		applyFilters(updated);
		scrollToResults();
	};

	const handleClearSearch = () => {
		const reset = {
			city: '',
			guests: 1,
			dateFrom: '',
			dateTo: '',
			amenities: {
				wifi: false,
				parking: false,
				breakfast: false,
				pets: false,
			},
		};
		setActiveFilters(reset);
		applyFilters({ ...reset, page: 1 });
		scrollToResults();
	};

	const handleSearch = (params: SearchParams) => {
		const updated = { ...params, page: 1 };
		setActiveFilters(updated);
		applyFilters(updated);
		scrollToResults();
	};

	const handleAmenitiesApply = (newAmenities: SearchParams['amenities']) => {
		const updated = {
			...activeFilters,
			amenities: newAmenities,
			page: 1,
		};
		setActiveFilters(updated);
		applyFilters(updated);
		scrollToResults();
	};

	const handlePageChange = (page: number) => {
		const updated = { ...activeFilters, page };
		setPage(page);
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
		<div className="p-4 space-y-6">
			<VenueAvailabilitySearch
				onSearch={handleSearch}
				initialCity={activeFilters.city}
				initialGuests={activeFilters.guests}
				initialDateFrom={activeFilters.dateFrom}
				initialDateTo={activeFilters.dateTo}
				initialAmenities={activeFilters.amenities}
			/>

			<button
				onClick={handleClearSearch}
				className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
			>
				Clear Search
			</button>

			{/* New Amenity Filter Section */}
			<div className="bg-white p-4 rounded shadow space-y-4">
				<h2 className="text-lg font-semibold">Filter by Amenities</h2>
				<AmenitiesFilter
					amenities={activeFilters.amenities}
					onChange={(newAmenities) => handleAmenitiesApply(newAmenities)}
				/>
			</div>

			<div ref={resultRef} className="bg-gray-100 px-4 py-3 rounded text-sm text-gray-700">
				Showing results for <strong>{activeFilters.city || 'all cities'}</strong>{' '}
				{activeFilters.dateFrom && `from ${formattedFrom}`} {activeFilters.dateTo && `to ${formattedTo}`} —{' '}
				{nights > 0 && `${nights} night${nights > 1 ? 's' : ''}, `}
				{activeFilters.guests} guest{activeFilters.guests > 1 ? 's' : ''}
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
					onPageChange={handlePageChange}
				/>
			)}
		</div>
	);
}

export default BrowsePage;
