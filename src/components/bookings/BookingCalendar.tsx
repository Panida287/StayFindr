// src/components/bookings/BookingCalendar.tsx
import { useEffect, useRef, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { format } from 'date-fns'

export type BookingCalendarProps = {
	/** Called whenever the user picks a (start,end) or just start */
	onDateChange: (start: Date | null, end: Date | null) => void
	/** Ranges that shouldn’t be selectable */
	bookedRanges: { start: Date; end: Date }[]
	/** Optional seed values on mount or when changed */
	initialRange?: [Date | null, Date | null]
}

/**
 * Utility: is this date within any booked range?
 */
function isDateBooked(date: Date, ranges: { start: Date; end: Date }[]) {
	return ranges.some(r => date >= r.start && date <= r.end)
}

/**
 * Utility: does [start,end] overlap any of the ranges?
 */
function overlaps(start: Date, end: Date, ranges: { start: Date; end: Date }[]) {
	return ranges.some(r => start <= r.end && end >= r.start)
}

export default function BookingCalendar({
	                                        onDateChange,
	                                        bookedRanges,
	                                        initialRange = [null, null],
                                        }: BookingCalendarProps) {
	const [showCalendar, setShowCalendar] = useState(false)
	// 1) Seed our internal state from props
	const [dateRange, setDateRange] = useState<[Date | null, Date | null]>(
		initialRange
	)
	const [error, setError] = useState<string | null>(null)

	const [start, end] = dateRange
	const calendarRef = useRef<HTMLDivElement>(null)

	// 2) If the parent ever changes initialRange, re-seed & notify
	useEffect(() => {
		setDateRange(initialRange)
		onDateChange(initialRange[0], initialRange[1])
		// we key off timestamps to detect changes
	}, [
		initialRange[0]?.getTime(),
		initialRange[1]?.getTime(),
		onDateChange,
	])

	// close on outside click
	useEffect(() => {
		function handleClickOutside(e: MouseEvent) {
			if (
				calendarRef.current &&
				!calendarRef.current.contains(e.target as Node)
			) {
				setShowCalendar(false)
			}
		}
		if (showCalendar) {
			document.addEventListener('mousedown', handleClickOutside)
		}
		return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
	}, [showCalendar])

	// handle date changes from the picker
	const handleChange = (dates: [Date | null, Date | null]) => {
		const [s, e] = dates

		// re-click same start = clear
		if (start && s && !e && start.getTime() === s.getTime()) {
			setDateRange([null, null])
			setError(null)
			onDateChange(null, null)
			setShowCalendar(false)
			return
		}

		setDateRange(dates)
		setError(null)
		if (s && e) {
			if (overlaps(s, e, bookedRanges)) {
				setError('Selected range overlaps with a booked date.')
				// reset to just start
				setDateRange([s, null])
				onDateChange(s, null)
			} else {
				onDateChange(s, e)
				setShowCalendar(false)
			}
		}
	}

	// filter out booked days
	const filterDate = (date: Date) => {
		if (isDateBooked(date, bookedRanges)) return false
		if (start) {
			for (const br of bookedRanges) {
				if (start < br.start && date > br.start) {
					return false
				}
			}
		}
		return true
	}

	return (
		<div className="mt-8 flex flex-col gap-4" ref={calendarRef}>
			<button
				onClick={() => setShowCalendar(v => !v)}
				className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 w-fit"
			>
				Check available date
			</button>

			{start && (
				<div className="flex gap-2">
					<div
						className="bg-gray-100 px-3 py-1 rounded text-sm cursor-pointer"
						onClick={() => setShowCalendar(true)}
					>
						Check-in: {format(start, 'EEE, dd/MM/yyyy')}
					</div>
					{end && (
						<div
							className="bg-gray-100 px-3 py-1 rounded text-sm cursor-pointer"
							onClick={() => setShowCalendar(true)}
						>
							Check-out: {format(end, 'EEE, dd/MM/yyyy')}
						</div>
					)}
				</div>
			)}

			{showCalendar && (
				<div>
					<DatePicker
						selectsRange
						startDate={start}
						endDate={end}
						onChange={handleChange}
						filterDate={filterDate}
						minDate={new Date()}
						inline
						monthsShown={2}
						dayClassName={date =>
							isDateBooked(date, bookedRanges) ? 'booked-day' : ''
						}
					/>
					{error && <p className="text-red-600 text-sm mt-1">{error}</p>}
				</div>
			)}
		</div>
	)
}
