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
	/** Optional seed dates for start/end */
	initialRange?: [Date | null, Date | null];
};

/**
 * Checks if a specific date falls within any booked range.
 */
function isDateBooked(
	date: Date,
	bookedRanges: { start: Date; end: Date }[]
): boolean {
	return bookedRanges.some(({ start, end }) => date >= start && date <= end);
}

/**
 * Checks whether a selected range overlaps with any booked ranges.
 */
function overlaps(
	start: Date,
	end: Date,
	ranges: { start: Date; end: Date }[]
): boolean {
	return ranges.some(range => start <= range.end && end >= range.start);
}

/**
 * A calendar component for selecting a booking date range,
 * with booked dates blocked out. Supports an initial seeded range.
 */
export default function BookingCalendar({
	                                        onDateChange,
	                                        bookedRanges,
	                                        initialRange = [null, null],
                                        }: BookingCalendarProps) {
	const [showCalendar, setShowCalendar] = useState(false);
	const [dateRange, setDateRange] = useState<[Date | null, Date | null]>(initialRange);
	const [error, setError] = useState<string | null>(null);

	// If parent ever changes initialRange, reset it
	useEffect(() => {
		setDateRange(initialRange);
	}, [initialRange]);

	const [start, end] = dateRange;
	const calendarRef = useRef<HTMLDivElement>(null);
	const pickerRef = useRef<ReactDatePicker>(null);

	// Close calendar on outside click
	useEffect(() => {
		const handleClickOutside = (e: MouseEvent) => {
			if (calendarRef.current && !calendarRef.current.contains(e.target as Node)) {
				setShowCalendar(false);
			}
		};
		if (showCalendar) document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [showCalendar]);

	/**
	 * Handles changes in date selection.
	 */
	const handleChange = (dates: [Date | null, Date | null]) => {
		const [s, e] = dates;

		// reset on re-click same start
		if (start && s && !e && start.getTime() === s.getTime()) {
			setDateRange([null, null]);
			setError(null);
			setShowCalendar(false);
			onDateChange(null, null);
			return;
		}

		setDateRange(dates);
		setError(null);

		if (s && e) {
			// minimum 1 night
			if (s.getTime() === e.getTime()) {
				setError('Minimum stay 1 night');
				setDateRange([s, null]);
				onDateChange(s, null);
				return;
			}
			// no overlap
			if (overlaps(s, e, bookedRanges)) {
				setError('Selected range overlaps with a booked date.');
				setDateRange([s, null]);
				onDateChange(s, null);
				return;
			}
			// valid range
			onDateChange(s, e);
			setShowCalendar(false);
		}
	};

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
					<div className="px-3 py-2 rounded-full text-xs border border-primary/50 drop-shadow-md text-primary">
						Check-in: {format(start, 'EEE, dd-MMM-yyyy')}
					</div>
					{end && (
						<div className="px-3 py-2 rounded-full text-xs border border-primary/50 drop-shadow-md text-primary">
							Check-out: {format(end, 'EEE, dd-MMM-yyyy')}
						</div>
					)}
				</div>
			)}

			{showCalendar && (
				<div className="flex flex-col p-2 w-fit rounded-3xl bg-white border-gray-300 border shadow-xl">
					<div className="relative w-full">
						<DatePicker
							ref={pickerRef}
							selectsRange
							startDate={start}
							endDate={end}
							onChange={handleChange}
							minDate={new Date()}
							filterDate={date => !isDateBooked(date, bookedRanges)}
							placeholderText="Select a date range"
							className="border p-2 rounded w-full"
							inline
							monthsShown={2}
							calendarClassName="!p-0"
							dayClassName={date =>
								isDateBooked(date, bookedRanges) ? 'booked-day' : ''
							}
						/>
					</div>
					<div className="flex justify-end items-center m-2">
						<CommonButton
							onClick={handleClearDates}
							borderClass="border border-primary/50"
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
