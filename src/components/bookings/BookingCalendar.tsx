import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';

/**
 * Props for the BookingCalendar component.
 */
type BookingCalendarProps = {
	onDateChange: (start: Date | null, end: Date | null) => void;
	bookedRanges: { start: Date; end: Date }[];
};

/**
 * Checks if a specific date falls within any booked range.
 *
 * @param {Date} date - The date to check.
 * @param {{ start: Date; end: Date }[]} bookedRanges - The array of booked date ranges.
 * @returns {boolean} - Returns true if the date is booked, false otherwise.
 */
function isDateBooked(date: Date, bookedRanges: { start: Date; end: Date }[]): boolean {
	return bookedRanges.some(({ start, end }) => date >= start && date <= end);
}

/**
 * Checks whether a selected range overlaps with any booked ranges.
 *
 * @param {Date} start - Start of selected date range.
 * @param {Date} end - End of selected date range.
 * @param {{ start: Date; end: Date }[]} ranges - The array of booked date ranges.
 * @returns {boolean} - True if overlap is found, otherwise false.
 */
function overlaps(start: Date, end: Date, ranges: { start: Date; end: Date }[]): boolean {
	return ranges.some(range => start <= range.end && end >= range.start);
}

/**
 * A calendar component for selecting a booking date range, with booked dates blocked out.
 * Includes toggling, outside click detection, and inline double-calendar view.
 *
 * @component
 * @param {BookingCalendarProps} props - The component props.
 * @returns {JSX.Element} - Rendered calendar component.
 */
export default function BookingCalendar({ onDateChange, bookedRanges }: BookingCalendarProps) {
	const [showCalendar, setShowCalendar] = useState(false);
	const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);
	const [error, setError] = useState<string | null>(null);

	const [start, end] = dateRange;
	const calendarRef = useRef<HTMLDivElement>(null);

	// Close calendar on outside click
	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
				setShowCalendar(false);
			}
		};

		if (showCalendar) {
			document.addEventListener('mousedown', handleClickOutside);
		}

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [showCalendar]);

	/**
	 * Handles changes in date selection.
	 *
	 * - Re-clicking the same check-in date will reset the calendar.
	 * - If both start and end are selected and overlap a booked range, selection is invalid.
	 *
	 * @param {[Date | null, Date | null]} dates - Selected start and end dates.
	 */
	const handleChange = (dates: [Date | null, Date | null]) => {
		const [startDate, endDate] = dates;

		if (start && startDate && !endDate && start.getTime() === startDate.getTime()) {
			setDateRange([null, null]);
			setError(null);
			setShowCalendar(false);
			onDateChange(null, null);
			return;
		}

		setDateRange(dates);
		setError(null);

		if (startDate && endDate) {
			// Minimum stay 1 night (endDate must be AFTER startDate)
			if (startDate.getTime() === endDate.getTime()) {
				setError('Minimum stay 1 night');
				setDateRange([startDate, null]);
				onDateChange(startDate, null);
				return;
			}

			if (overlaps(startDate, endDate, bookedRanges)) {
				setError('Selected range overlaps with a booked date.');
				setDateRange([startDate, null]);
				onDateChange(startDate, null);
				return;
			}

			onDateChange(startDate, endDate);
			setShowCalendar(false);
		}
	};

	/**
	 * Filters out dates that should not be selectable.
	 * - Disables already booked dates.
	 * - If a check-in date is selected, disables dates after a future booked range.
	 *
	 * @param {Date} date - The date to evaluate.
	 * @returns {boolean} - Whether the date is selectable.
	 */
	const filterDate = (date: Date): boolean => {
		if (isDateBooked(date, bookedRanges)) return false;

		if (start) {
			for (const range of bookedRanges) {
				if (start < range.start && date > range.start) {
					return false;
				}
			}
		}
		return true;
	};

	/**
	 * Shows the calendar when user clicks on date summary box.
	 */
	const handleDateBoxClick = () => {
		setShowCalendar(true);
	};

	const handleClearDates = () => {
		setDateRange([null, null]);
		setError(null);
		onDateChange(null, null);
	};

	return (
		<div className="mt-8 flex flex-col gap-4" ref={calendarRef}>
			<button
				onClick={() => setShowCalendar(prev => !prev)}
				className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 w-fit"
			>
				Check available date
			</button>

			{start && (
				<div className="flex gap-4">
					<div
						className="bg-gray-100 px-3 py-1 rounded text-sm cursor-pointer"
						onClick={handleDateBoxClick}
					>
						Check-in: {format(start, 'EEE, dd/MM/yyyy')}
					</div>
					{end && (
						<div
							className="bg-gray-100 px-3 py-1 rounded text-sm cursor-pointer"
							onClick={handleDateBoxClick}
						>
							Check-out: {format(end, 'EEE, dd/MM/yyyy')}
						</div>
					)}
				</div>
			)}

			{showCalendar && (
				<div className="relative">
					<DatePicker
						selectsRange
						startDate={start}
						endDate={end}
						onChange={handleChange}
						minDate={new Date()}
						filterDate={filterDate}
						placeholderText="Select a date range"
						className="border p-2 rounded w-full"
						inline
						monthsShown={2}
						calendarClassName="!p-0"
						dayClassName={(date: Date) => isDateBooked(date, bookedRanges) ? "booked-day" : ""}
					/>

					<button
						onClick={handleClearDates}
						className="absolute right-4 bottom-4 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 text-sm font-medium shadow"
						type="button"
					>
						Clear Dates
					</button>

					{error && (
						<p className="text-red-600 text-sm mt-2">{error}</p>
					)}
				</div>
			)}
		</div>
	);
}