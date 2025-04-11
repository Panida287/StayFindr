type SortValue = 'newest' | 'priceAsc' | 'priceDesc' | 'rating';

type Props = {
	onChange: (sort: SortValue) => void;
	currentSort: SortValue;
};

export const SortDropdown = ({ onChange, currentSort }: Props) => {
	return (
		<div className="flex items-center gap-2">
			<label htmlFor="sort" className="text-sm font-medium">
				Sort by:
			</label>
			<select
				id="sort"
				value={currentSort}
				onChange={(e) => onChange(e.target.value as SortValue)}
				className="border rounded px-2 py-1"
			>
				<option value="newest">Newest to Oldest</option>
				<option value="priceAsc">Price: Low to High</option>
				<option value="priceDesc">Price: High to Low</option>
				<option value="rating">Rating: High to Low</option>
			</select>
		</div>
	);
};