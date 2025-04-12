import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type BookingCalendarProps = {
	onDateChange: (start: Date | null, end: Date | null) => void;
};

export default function BookingCalendar({ onDateChange }: BookingCalendarProps) {
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);

	const handleStartChange = (date: Date | null) => {
		setStartDate(date);
		if (date && (!endDate || date > endDate)) {
			setEndDate(null); // reset end date if before start
		}
		onDateChange(date, endDate);
	};

	const handleEndChange = (date: Date | null) => {
		setEndDate(date);
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
						placeholderText="Select a check-out date"
						showYearDropdown
						scrollableYearDropdown
						yearDropdownItemNumber={1}
						className="border p-2 rounded w-full"
					/>
				</div>
			</div>
		</div>
	);
}
