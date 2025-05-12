import { useState } from 'react';
import { useFetchVenues } from './hooks/useFetchVenues';
import { VenueCard } from './components/venues/VenueCard';
import { SortDropdown } from './components/venues/SortDropdown';
import { useFetchProfile } from './hooks/useFetchProfile.ts';
import VenueAvailabilitySearch from './components/venues/VenueAvailabilitySearch';
import Pagination from './components/venues/Pagination';

type SortValue = 'newest' | 'priceAsc' | 'priceDesc' | 'rating';

type SearchParams = {
	city: string;
	guests: number;
	dateFrom: string;
	dateTo: string;
	amenities: {
		wifi: boolean;
		parking: boolean;
		breakfast: boolean;
		pets: boolean;
	};
};

function App() {
	useFetchProfile();

	const {
		venues,
		isLoading,
		error,
		meta,
		currentPage,
		setPage,
		setSort,
		currentSort,
		currentSortOrder,
		fetchVenues,
	} = useFetchVenues();

	const [hasSearched, setHasSearched] = useState(false);
	const [searchParams, setSearchParams] = useState<SearchParams | null>(null);

	const getSortValue = (sort: string, order: 'asc' | 'desc'): SortValue => {
		if (sort === 'price') return order === 'asc' ? 'priceAsc' : 'priceDesc';
		if (sort === 'rating') return 'rating';
		return 'newest';
	};

	const currentSortValue = getSortValue(currentSort, currentSortOrder);

	const handleAvailabilitySearch = (params: SearchParams) => {
		setHasSearched(true);
		setSearchParams(params);

		fetchVenues({
			query: params.city,
			guests: params.guests,
			dateFrom: params.dateFrom,
			dateTo: params.dateTo,
			amenities: params.amenities,
			page: 1,
		});
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
		}

		setSort(sortField, sortOrder);

		if (hasSearched && searchParams) {
			fetchVenues({
				query: searchParams.city,
				guests: searchParams.guests,
				dateFrom: searchParams.dateFrom,
				dateTo: searchParams.dateTo,
				amenities: searchParams.amenities,
				sort: sortField,
				sortOrder,
				page: 1,
			});
		}
	};

	if (!hasSearched) {
		return (
			<div className="p-4 space-y-6">
				<VenueAvailabilitySearch
					onSearch={handleAvailabilitySearch}
					initialCity=""
					initialGuests={1}
					initialDateFrom=""
					initialDateTo=""
				/>
			</div>
		);
	}

	if (isLoading) return <p>Loading venues...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className="p-4 space-y-6">
			<VenueAvailabilitySearch
				onSearch={handleAvailabilitySearch}
				initialCity={searchParams?.city || ''}
				initialGuests={searchParams?.guests || 1}
				initialDateFrom={searchParams?.dateFrom || ''}
				initialDateTo={searchParams?.dateTo || ''}
			/>

			<button
				onClick={() => {
					setSearchParams(null);
					setHasSearched(false);
				}}
				className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
			>
				Clear Search
			</button>

			<SortDropdown onChange={handleSortChange} currentSort={currentSortValue} />

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{venues.length > 0 ? (
					venues.map((venue) => <VenueCard key={venue.id} venue={venue} />)
				) : (
					<p className="text-center text-gray-500 col-span-full">
						No venues match your search.
					</p>
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

export default App;
