import { useState, useEffect } from 'react';

type Props = {
	setQuery: (q: string) => void;
	triggerSearch: (q: string) => void;
	query: string;
	clearSearch: () => void;
};

export function SearchInput({ setQuery, triggerSearch, query, clearSearch }: Props) {
	const [input, setInput] = useState(query);

	const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
		if (e.key === 'Enter') {
			setQuery(input);
			triggerSearch(input);
		}
	};

	useEffect(() => {
		setInput(query);
	}, [query]);

	return (
		<div className="flex gap-2 items-center">
			<input
				type="text"
				placeholder="Search venues..."
				value={input}
				onChange={(e) => setInput(e.target.value)}
				onKeyDown={handleKeyDown}
				className="border px-3 py-2 rounded w-full sm:w-64"
			/>
			{query && (
				<button
					onClick={clearSearch}
					className="text-sm px-3 py-2 rounded bg-gray-200 hover:bg-gray-300"
				>
					Clear
				</button>
			)}
		</div>
	);
}
