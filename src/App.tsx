import { useFetchVenues } from './hooks/useFetchVenues';
import { useSearchVenues } from './hooks/useSearchVenues';
import { VenueCard } from './components/venues/VenueCard';
import { SortDropdown } from './components/venues/SortDropdown';
import { useState } from 'react';
import { SearchInput } from './components/venues/SearchInput';

type SortValue = 'newest' | 'priceAsc' | 'priceDesc' | 'rating';

function App() {
	const [currentSort, setCurrentSort] = useState<SortValue>('newest');

	const {
		venues: defaultVenues,
		isLoading: defaultLoading,
		error: defaultError,
		meta: defaultMeta,
		currentPage,
		setPage,
		setSort,
	} = useFetchVenues();

	const {
		venues: searchVenues,
		isLoading: searchLoading,
		error: searchError,
		meta: searchMeta,
		currentPage: searchPage,
		setPage: setSearchPage,
		query,
		setQuery,
		triggerSearch,
	} = useSearchVenues();

	const isSearching = query.trim() !== '';

	const venues = isSearching ? searchVenues : defaultVenues;
	const isLoading = isSearching ? searchLoading : defaultLoading;
	const error = isSearching ? searchError : defaultError;
	const meta = isSearching ? searchMeta : defaultMeta;
	const page = isSearching ? searchPage : currentPage;
	const setPageFn = isSearching ? setSearchPage : setPage;

	const handleSortChange = (value: SortValue) => {
		setCurrentSort(value);

		if (!isSearching) {
			switch (value) {
				case 'priceAsc':
					setSort('price', 'asc');
					break;
				case 'priceDesc':
					setSort('price', 'desc');
					break;
				case 'rating':
					setSort('rating', 'desc');
					break;
				default:
					setSort('created', 'desc');
			}
		}
	};

	if (isLoading) return <p>Loading venues...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className="p-4 space-y-6">
			<SearchInput
				query={query}
				setQuery={setQuery}
				triggerSearch={triggerSearch}
				clearSearch={() => {
					setQuery('');
				}}
			/>

			{!isSearching && (
				<SortDropdown onChange={handleSortChange} currentSort={currentSort} />
			)}

			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{venues.length > 0 ? (
					venues.map((venue) => <VenueCard key={venue.id} venue={venue} />)
				) : (
					<p className="text-center text-gray-500 col-span-full">No venues match your search.</p>
				)}
			</div>

			{/* Pagination */}
			{meta && meta.pageCount > 1 && (
				<div className="flex justify-center items-center gap-1 mt-6">
					<button onClick={() => setPageFn(1)} disabled={page === 1}
					        className="px-2 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50">
						First page
					</button>
					<button onClick={() => page > 1 && setPageFn(page - 1)} disabled={page === 1}
					        className="px-2 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50">
						&lt;
					</button>
					{Array.from({length: meta.pageCount}, (_, i) => i + 1)
						.filter((n) => Math.abs(n - page) <= 1)
						.map((p) => (
							<button
								key={p}
								onClick={() => setPageFn(p)}
								className={`px-3 py-1 rounded text-sm ${p === page ? 'bg-pink-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
							>
								{p}
							</button>
						))}
					<button onClick={() => page < meta.pageCount && setPageFn(page + 1)}
					        disabled={page === meta.pageCount}
					        className="px-2 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50">
						&gt;
					</button>
					<button onClick={() => setPageFn(meta.pageCount)} disabled={page === meta.pageCount}
					        className="px-2 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50">
						Last page
					</button>
				</div>
			)}
		</div>
	);
}

export default App;
