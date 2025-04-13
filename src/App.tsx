import { useState } from 'react';
import { useFetchVenues } from './hooks/useFetchVenues';
import { VenueCard } from './components/venues/VenueCard';
import { SortDropdown } from './components/venues/SortDropdown';
import { useFetchProfile } from './hooks/useFetchProfile.ts';

type SortValue = 'newest' | 'priceAsc' | 'priceDesc' | 'rating';

function App() {
	useFetchProfile();
	const [currentSort, setCurrentSort] = useState<SortValue>('newest');

	const {
		venues,
		isLoading,
		error,
		meta,
		currentPage,
		setPage,
		setSort,
		query,
		setQuery,
		fetchVenues,
	} = useFetchVenues();

	const isSearching = query.trim() !== '';

	const handleSortChange = (value: SortValue) => {
		setCurrentSort(value);

		if (!isSearching) {
			setPage(1);

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


	const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			fetchVenues({ query, page: 1 });
		}
	};

	const handleClearSearch = () => {
		setQuery('');
		fetchVenues({ query: '', page: 1 });
	};

	if (isLoading) return <p>Loading venues...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className="p-4 space-y-6">
			<div className="flex gap-2">
				<input
					type="text"
					placeholder="Search venues..."
					value={query}
					onChange={(e) => setQuery(e.target.value)}
					onKeyDown={handleSearch}
					className="flex-1 px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-500"
				/>
				{isSearching && (
					<button
						onClick={handleClearSearch}
						className="px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
					>
						Clear
					</button>
				)}
			</div>

			{!isSearching && (
				<SortDropdown onChange={handleSortChange} currentSort={currentSort} />
			)}

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
