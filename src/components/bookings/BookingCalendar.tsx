import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type BookingCalendarProps = {
	onDateChange: (start: Date | null, end: Date | null) => void;
	bookedRanges: { start: Date; end: Date }[];
};

function isRangeValid(start: Date, end: Date, bookedRanges: { start: Date; end: Date }[]) {
	for (const { start: bookedStart, end: bookedEnd } of bookedRanges) {
		if (start <= bookedEnd && end >= bookedStart) {
			return false;
		}
	}
	return true;
}

export default function BookingCalendar({ onDateChange, bookedRanges }: BookingCalendarProps) {
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [error, setError] = useState<string | null>(null);

	const isDateBooked = (date: Date) => {
		return bookedRanges.some(({ start, end }) => date >= start && date <= end);
	};

	const filterDate = (date: Date) => !isDateBooked(date);

	const handleStartChange = (date: Date | null) => {
		setStartDate(date);
		setError(null);

		if (date && endDate && (date > endDate || !isRangeValid(date, endDate, bookedRanges))) {
			setEndDate(null);
			onDateChange(date, null);
		} else {
			onDateChange(date, endDate);
		}
	};

	const handleEndChange = (date: Date | null) => {
		if (!startDate || !date) return;

		if (!isRangeValid(startDate, date, bookedRanges)) {
			setError('Please select available dates.');
			setEndDate(null);
			onDateChange(startDate, null);
			return;
		}

		setEndDate(date);
		setError(null);
		onDateChange(startDate, date);
	};

	return (
		<div className="mt-8">
			<h2 className="text-lg font-semibold mb-2">Select Booking Dates</h2>
			<div className="flex flex-col sm:flex-row gap-4">
				<div className="flex flex-col w-full">
					<label className="text-sm text-gray-600 mb-1">Check-in</label>
					<DatePicker
						selected={startDate}
						onChange={handleStartChange}
						selectsStart
						startDate={startDate}
						endDate={endDate}
						minDate={new Date()}
						filterDate={filterDate}
						dayClassName={(date) => (isDateBooked(date) ? 'booked-day' : '')}
						placeholderText="Select a check-in date"
						showYearDropdown
						scrollableYearDropdown
						yearDropdownItemNumber={1}
						className="border p-2 rounded w-full"
					/>
				</div>

				<div className="flex flex-col w-full">
					<label className="text-sm text-gray-600 mb-1">Check-out</label>
					<DatePicker
						selected={endDate}
						onChange={handleEndChange}
						selectsEnd
						startDate={startDate}
						endDate={endDate}
						minDate={startDate || new Date()}
						filterDate={filterDate}
						dayClassName={(date) => (isDateBooked(date) ? 'booked-day' : '')}
						placeholderText="Select a check-out date"
						showYearDropdown
						scrollableYearDropdown
						yearDropdownItemNumber={1}
						className="border p-2 rounded w-full"
					/>
				</div>
			</div>

			{error && <p className="text-red-600 text-sm mt-2">{error}</p>}
		</div>
	);
}
