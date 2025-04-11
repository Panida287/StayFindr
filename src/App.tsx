import { useFetchVenues } from './hooks/useFetchVenues';
import { VenueCard } from './components/venues/VenueCard';
import { SortDropdown } from './components/venues/SortDropdown.tsx';
import { useState } from 'react';

type SortValue = 'newest' | 'priceAsc' | 'priceDesc' | 'rating';

function App() {
	const { venues, isLoading, error, meta, currentPage, setPage, setSort } = useFetchVenues();
	const [currentSort, setCurrentSort] = useState<SortValue>('newest');

	const handleSortChange = (value: SortValue) => {
		setCurrentSort(value);

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
	};

	if (isLoading) return <p>Loading venues...</p>;
	if (error) return <p>Error: {error}</p>;

	return (
		<div className="p-4 space-y-6">
			<SortDropdown onChange={handleSortChange} currentSort={currentSort} />
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
				{venues.map((venue) => (
					<VenueCard key={venue.id} venue={venue} />
				))}
			</div>

			{/* Pagination Controls */}
			{meta && meta.pageCount > 1 && (
				<div className="flex justify-center items-center gap-1 mt-6">
					{/* First Page */}
					<button
						onClick={() => setPage(1)}
						disabled={currentPage === 1}
						className="px-2 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
					>
						&lt;&lt;
					</button>

					{/* Previous Page */}
					<button
						onClick={() => currentPage > 1 && setPage(currentPage - 1)}
						disabled={currentPage === 1}
						className="px-2 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
					>
						&lt;
					</button>

					{/* Page Numbers - show 3 pages around current */}
					{Array.from({length: meta.pageCount}, (_, i) => i + 1)
						.filter((n) => Math.abs(n - currentPage) <= 1)
						.map((page) => (
							<button
								key={page}
								onClick={() => setPage(page)}
								className={`px-3 py-1 rounded text-sm ${
									currentPage === page
										? 'bg-pink-600 text-white'
										: 'bg-gray-200 text-gray-700 hover:bg-gray-300'
								}`}
							>
								{page}
							</button>
						))}

					{/* Next Page */}
					<button
						onClick={() => currentPage < meta.pageCount && setPage(currentPage + 1)}
						disabled={currentPage === meta.pageCount}
						className="px-2 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
					>
						&gt;
					</button>

					{/* Last Page */}
					<button
						onClick={() => setPage(meta.pageCount)}
						disabled={currentPage === meta.pageCount}
						className="px-2 py-1 text-sm rounded bg-gray-100 hover:bg-gray-200 disabled:opacity-50"
					>
						&gt;&gt;
					</button>
				</div>
			)}

		</div>
	);
}

export default App;
