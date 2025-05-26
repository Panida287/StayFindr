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
	initialRange?: [Date | null, Date | null];
};

/**
 * Checks if a specific date falls within any booked range.
 */
function isDateBooked(date: Date, bookedRanges: { start: Date; end: Date }[]): boolean {
	return bookedRanges.some(({start, end}) => date >= start && date <= end);
}

export default function BookingCalendar({
	                                        onDateChange,
	                                        bookedRanges,
	                                        initialRange = [null, null],
                                        }: BookingCalendarProps) {
	const [showCalendar, setShowCalendar] = useState(false);
	const [dateRange, setDateRange] = useState<[Date | null, Date | null]>(initialRange);
	const [error, setError] = useState<string | null>(null);
	const [unavailable, setUnavailable] = useState(false);
	const [initStart, initEnd] = initialRange;
	const [start, end] = dateRange;
	const calendarRef = useRef<HTMLDivElement>(null);
	const pickerRef = useRef<ReactDatePicker>(null);
	const didCheckInitial = useRef(false);

	useEffect(() => {
		if (didCheckInitial.current) return;
		didCheckInitial.current = true;

		const [s, e] = initialRange;
		const overlapsBook = (d: Date | null) =>
			!!d && bookedRanges.some(({start, end}) => d >= start && d <= end);

		if (overlapsBook(s) || overlapsBook(e)) {
			setDateRange([null, null]);
			setUnavailable(true);
			onDateChange(null, null);
		}
	}, [initialRange, bookedRanges, onDateChange]);

	useEffect(() => {
		const handleClickOutside = (ev: MouseEvent) => {
			if (calendarRef.current && !calendarRef.current.contains(ev.target as Node)) {
				setShowCalendar(false);
			}
		};
		if (showCalendar) document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [showCalendar]);

	const handleChange = (dates: [Date | null, Date | null]) => {
		setUnavailable(false);
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
			// 1-night minimum
			if (startDate.getTime() === endDate.getTime()) {
				setError('Minimum stay 1 night');
				setDateRange([startDate, null]);
				onDateChange(startDate, null);
				return;
			}
			onDateChange(startDate, endDate);
			setShowCalendar(false);
		}
	};

	const filterDate = (date: Date) => {
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

	const handleClearDates = () => {
		setDateRange([null, null]);
		setError(null);
		setUnavailable(false);
		onDateChange(null, null);
		pickerRef.current?.setPreSelection(null);
	};

	return (
		<div className="mt-8 flex flex-col gap-4" ref={calendarRef}>
			{unavailable && (
				<div className="text-red-600 text-sm font-medium">
					This property is unavailable during{' '}
					<span className="px-2 py-1 rounded-full bg-yellow-200/50 mx-1">
						{initStart ? format(initStart, 'EEE, dd MMM yyyy') : '––'}{' '}
					</span>
					-{' '}
					<span className="px-2 py-1 rounded-full bg-yellow-200/50 mx-1">
						{initEnd ? format(initEnd, 'EEE, dd MMM yyyy') : '––'}.
					</span>
				</div>
			)}

			<SplitButton
				text="Check Available Dates"
				bgColor="bg-yellow-600"
				textColor="text-yellow-600"
				arrowColor="text-white"
				borderColor="border-yellow-600"
				hoverTextColor="hover:text-yellow-600"
				arrowHoverColor="group-hover:text-yellow-600"
				onClick={() => setShowCalendar((v) => !v)}
				className="font-heading font-medium w-[210px] py-1"
			/>

			{start && (
				<div className="flex gap-4">
					<div
						className="px-3 py-2 rounded-full text-xs border border-primary/50 drop-shadow-md text-primary">
						Check-in: {format(start, 'EEE, dd-MMM-yyyy')}
					</div>
					{end && (
						<div
							className="px-3 py-2 rounded-full text-xs border border-primary/50 drop-shadow-md text-primary">
							Check-out: {format(end, 'EEE, dd-MMM-yyyy')}
						</div>
					)}
				</div>
			)}

			{showCalendar && (
				<div className="flex flex-col p-2 w-fit rounded-3xl bg-white border-gray-300 border shadow-xl">
					{/* 1. Close button at top right */}
					<div className="flex justify-end mb-2 mr-2">
						<button
							type="button"
							onClick={() => setShowCalendar(false)}
							className="h-8 w-8 bg-background flex justify-center items-center rounded-full hover:bg-primary hover:text-white transition-colors"
						>
							<i className="fa-regular fa-xmark-large"></i>
						</button>
					</div>

					{/* 2. Your existing date picker */}
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
						/>
					</div>

					{/* 3. Clear button */}
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

					{error && <p className="text-red-600 text-sm mt-2">{error}</p>}
				</div>
			)}
		</div>
	);
}
