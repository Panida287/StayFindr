import { useEffect, useRef, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { format } from 'date-fns';
import { CommonButton, SplitButton } from '../commons/Buttons';
import ReactDatePicker from 'react-datepicker';

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
	return bookedRanges.some(({start, end}) => date >= start && date <= end);
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
export default function BookingCalendar({onDateChange, bookedRanges}: BookingCalendarProps) {
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

	const pickerRef = useRef<ReactDatePicker>(null);

	const handleClearDates = () => {
		setDateRange([null, null]);
		setError(null);
		onDateChange(null, null);
		pickerRef.current?.setPreSelection(null);
	};

	return (
		<div className="mt-8 flex flex-col gap-4" ref={calendarRef}>
			<SplitButton
				text="Check available date"
				bgColor="bg-yellow-600"
				textColor="text-yellow-600"
				arrowColor="text-white"
				borderColor="border-yellow-600"
				hoverTextColor="hover:text-yellow-600"
				arrowHoverColor="group-hover:text-yellow-600"
				onClick={() => setShowCalendar(prev => !prev)}
				className="font-heading w-[200px] py-1"
			/>

			{start && (
				<div className="flex gap-4">
					<div
						className="px-3 py-2 rounded-full text-xs border border-primary/50 drop-shadow-md text-primary"
					>
						Check-in: {format(start, 'EEE, dd-MMM-yyyy')}
					</div>
					{end && (
						<div
							className="px-3 py-2 rounded-full text-xs border border-primary/50 drop-shadow-md text-primary"
						>
							Check-out: {format(end, 'EEE, dd-MMM-yyyy')}
						</div>
					)}
				</div>
			)}

			{showCalendar && (
				<div className="flex flex-col p-2 w-fit rounded-3xl border-gray-300 border shadow-xl">
					<div className="relative w-full">
						<DatePicker
							ref={pickerRef}
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
							dayClassName={(date: Date) => isDateBooked(date, bookedRanges) ? 'booked-day' : ''}
						/>
					</div>
					<div className="flex justify-between items-center m-2">
						<CommonButton
							bgColor="bg-primary"
							textColor="text-white"
							hoverColor="hover:bg-background"
							className="px-4 py-2 text-sm font-medium shadow"
							hoverTextColor="hover:text-primary"
						>
							Apply
						</CommonButton>
						<CommonButton
							onClick={handleClearDates}
							borderClass="border border-primary"
							bgColor="bg-secondary"
							textColor="text-primary"
							hoverColor="hover:bg-background"
							className="px-4 py-2 text-sm font-medium shadow"
						>
							Clear Dates
						</CommonButton>

					</div>

					{error && (
						<p className="text-red-600 text-sm mt-2">{error}</p>
					)}

				</div>
			)}
		</div>
	);
}