export type SortValue = 'newest' | 'priceAsc' | 'priceDesc' | 'rating' | 'popularity';

type Props = {
	onChange: (sort: SortValue) => void;
	currentSort: SortValue;
};

export const SortDropdown = ({ onChange, currentSort }: Props) => {
	return (
		<div className="flex items-center gap-2 text-sm w-[calc(100%-2rem)] max-w-5xl mx-auto">
			<label htmlFor="sort" className="font-medium text-gray-700">
				Sort by:
			</label>
			<div className="relative inline-block">
				<select
					id="sort"
					value={currentSort}
					onChange={(e) => onChange(e.target.value as SortValue)}
					className="appearance-none rounded-full border border-gray-300 bg-white pl-4 pr-10 py-2 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
				>
					<option value="newest">Newest to Oldest</option>
					<option value="priceAsc">Price: Low to High</option>
					<option value="priceDesc">Price: High to Low</option>
					<option value="rating">Rating: High to Low</option>
					<option value="popularity">Most Popular</option>
				</select>

				{/* Custom arrow */}
				<div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
					<svg
						className="w-4 h-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
					</svg>
				</div>
			</div>

		</div>
	);
};

