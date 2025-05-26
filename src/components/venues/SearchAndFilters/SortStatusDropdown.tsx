export type StatusValue = 'all' | 'upcoming' | 'ongoing' | 'completed';

type Props = {
	currentStatus: StatusValue;
	onChange: (status: StatusValue) => void;
};

export function SortStatusDropdown({ currentStatus, onChange }: Props) {
	return (
		<div className="flex items-center gap-2 text-sm">
			<label htmlFor="status" className="font-medium text-gray-700">
				Show:
			</label>
			<div className="relative inline-block">
				<select
					id="status"
					value={currentStatus}
					onChange={(e) => onChange(e.target.value as StatusValue)}
					className="appearance-none rounded-full border border-gray-300 bg-white pl-4 pr-10 py-2 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
				>
					<option value="all">Show All</option>
					<option value="upcoming">Upcoming</option>
					<option value="ongoing">Ongoing</option>
					<option value="completed">Completed</option>
				</select>
				<div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500">
					<svg
						className="w-4 h-4"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 9l-7 7-7-7"
						/>
					</svg>
				</div>
			</div>
		</div>
	);
}
