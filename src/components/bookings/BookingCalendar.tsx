import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

export type BookingCalendarProps = {
	/** Called whenever the user picks a (start,end) or just start */
	onDateChange: (start: Date | null, end: Date | null) => void;
	/** Ranges that shouldn’t be selectable */
	bookedRanges: { start: Date; end: Date }[];
	/** Optional seed values on mount or when changed */
	initialRange?: [Date | null, Date | null];
};

function isDateBooked(date: Date, ranges: { start: Date; end: Date }[]) {
	return ranges.some(r => date >= r.start && date <= r.end);
}

function overlaps(start: Date, end: Date, ranges: { start: Date; end: Date }[]) {
	return ranges.some(r => start <= r.end && end >= r.start);
}

export default function BookingCalendar({
	                                        onDateChange,
	                                        bookedRanges,
	                                        initialRange = [null, null],
                                        }: BookingCalendarProps) {
	const [showCalendar, setShowCalendar] = useState(false);
	const [range, setRange] = useState<[Date | null, Date | null]>(initialRange);
	const [error, setError] = useState<string | null>(null);
	const [start, end] = range;
	const ref = useRef<HTMLDivElement>(null);

	// Sync prop→state if initialRange changes
	useEffect(() => {
		setRange(initialRange);
	}, [initialRange]);

	// Close on outside click
	useEffect(() => {
		function onClickOutside(e: MouseEvent) {
			if (ref.current && !ref.current.contains(e.target as Node)) {
				setShowCalendar(false);
			}
		}
		if (showCalendar) document.addEventListener('mousedown', onClickOutside);
		return () => document.removeEventListener('mousedown', onClickOutside);
	}, [showCalendar]);

	const handleChange = (dates: [Date | null, Date | null]) => {
		const [s, e] = dates;
		// If clicking the same start again, reset
		if (start && s && !e && start.getTime() === s.getTime()) {
			setRange([null, null]);
			setError(null);
			onDateChange(null, null);
			setShowCalendar(false);
			return;
		}

		setRange(dates);
		setError(null);
		if (s && e) {
			if (overlaps(s, e, bookedRanges)) {
				setError('Overlaps an existing booking.');
				setRange([s, null]);
				onDateChange(s, null);
			} else {
				onDateChange(s, e);
				setShowCalendar(false);
			}
		}
	};

	const filterDate = (date: Date) => {
		if (isDateBooked(date, bookedRanges)) return false;
		if (start) {
			for (const r of bookedRanges) {
				if (start < r.start && date > r.start) return false;
			}
		}
		return true;
	};

	return (
		<div className="flex flex-col gap-3" ref={ref}>
			<button
				onClick={() => setShowCalendar(v => !v)}
				className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 w-fit"
			>
				Check available date
			</button>

			{start && (
				<div className="flex gap-2">
					<div
						className="bg-gray-100 px-2 py-1 rounded text-sm cursor-pointer"
						onClick={() => setShowCalendar(true)}
					>
						Check-in: {format(start, 'yyyy-MM-dd')}
					</div>
					{end && (
						<div
							className="bg-gray-100 px-2 py-1 rounded text-sm cursor-pointer"
							onClick={() => setShowCalendar(true)}
						>
							Check-out: {format(end, 'yyyy-MM-dd')}
						</div>
					)}
				</div>
			)}

			{showCalendar && (
				<div className="z-10">
					<DatePicker
						selectsRange
						startDate={start}
						endDate={end}
						onChange={handleChange}
						filterDate={filterDate}
						minDate={new Date()}
						inline
						monthsShown={2}
						calendarClassName="two-months inline-flex gap-4"
						className="border rounded"
					/>
					{error && <p className="text-red-600 text-sm mt-1">{error}</p>}
				</div>
			)}
		</div>
	);
}
