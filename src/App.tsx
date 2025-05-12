import { useState } from 'react';
import { useFetchVenues } from './hooks/useFetchVenues';
import { VenueCard } from './components/venues/VenueCard';
import { SortDropdown } from './components/venues/SortDropdown';
import { useFetchProfile } from './hooks/useFetchProfile.ts';
import VenueAvailabilitySearch from './components/venues/VenueAvailabilitySearch';

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
				<div className="flex justify-center items-center gap-1 mt-6 flex-wrap">
					<button
						onClick={() => setPage(1)}
						disabled={currentPage === 1}
						className="px-2 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
					>
						First page
					</button>
					<button
						onClick={() => currentPage > 1 && setPage(currentPage - 1)}
						disabled={currentPage === 1}
						className="px-2 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
					>
						&lt;
					</button>
					{(() => {
						const totalPages = meta.pageCount;
						const range: number[] = [];

						if (totalPages <= 3) {
							for (let i = 1; i <= totalPages; i++) range.push(i);
						} else if (currentPage === 1) {
							range.push(1, 2, 3);
						} else if (currentPage === totalPages) {
							range.push(totalPages - 2, totalPages - 1, totalPages);
						} else {
							range.push(currentPage - 1, currentPage, currentPage + 1);
						}

						return range.map((p) => (
							<button
								key={p}
								onClick={() => setPage(p)}
								className={`px-3 py-1 rounded text-sm ${
									p === currentPage
										? 'bg-pink-600 text-white'
										: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
								}`}
							>
								{p}
							</button>
						));
					})()}
					<button
						onClick={() => currentPage < meta.pageCount && setPage(currentPage + 1)}
						disabled={currentPage === meta.pageCount}
						className="px-2 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
					>
						&gt;
					</button>
					<button
						onClick={() => setPage(meta.pageCount)}
						disabled={currentPage === meta.pageCount}
						className="px-2 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
					>
						Last page
					</button>
				</div>
			)}
		</div>
	);
}

export default App;
