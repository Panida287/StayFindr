import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingCalendar from './BookingCalendar';
import { calculateNights } from '../../utilities/calculateNights';

type Props = {
	price: number;
	maxGuests: number;
	bookedDateRanges: { start: Date; end: Date }[];
	handleBooking: (start: Date | null, end: Date | null, guests: number) => void;
	isBookingLoading: boolean;
	bookingError: string | null;
	success: boolean;
};

export default function BookingForm({
	                                    price,
	                                    maxGuests,
	                                    bookedDateRanges,
	                                    handleBooking,
	                                    isBookingLoading,
	                                    bookingError,
	                                    success,
                                    }: Props) {
	const [startDate, setStartDate] = useState<Date | null>(null);
	const [endDate, setEndDate] = useState<Date | null>(null);
	const [guests, setGuests] = useState<number>(1);

	const navigate = useNavigate();
	const token = localStorage.getItem('SFToken');
	const isLoggedIn = Boolean(token);

	const totalPrice = startDate && endDate ? calculateNights(startDate, endDate) * price : 0;

	return (
		<div className="mt-8">
			<BookingCalendar
				onDateChange={(start, end) => {
					setStartDate(start);
					setEndDate(end);
				}}
				bookedRanges={bookedDateRanges}
			/>

			{startDate && endDate && (
				<div className="text-sm text-gray-700 bg-gray-50 p-3 rounded mt-2 space-y-1">
					<p>
						<b>Booking from:</b> {startDate.toDateString()} to {endDate.toDateString()}
					</p>
					<p>
						<b>Total:</b> {calculateNights(startDate, endDate)}{' '}
						{calculateNights(startDate, endDate) === 1 ? 'night' : 'nights'}
					</p>
					<p>
						<b>{guests}</b> {guests === 1 ? 'adult' : 'adults'}
					</p>
				</div>
			)}

			<div className="mt-4">
				<label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">
					Number of Guests
				</label>
				<select
					id="guests"
					value={guests}
					onChange={(e) => setGuests(Number(e.target.value))}
					className="border rounded px-3 py-2 w-32 text-sm"
				>
					{Array.from({length: maxGuests}, (_, i) => i + 1).map((num) => (
						<option key={num} value={num}>
							{num} {num === 1 ? 'guest' : 'guests'}
						</option>
					))}
				</select>
				<p className="text-xs text-gray-500 mt-1">Max {maxGuests} guests allowed</p>
			</div>

			{startDate && endDate && (
				<div className="text-pink-600 font-semibold text-lg mt-2">
					Total price: ${totalPrice}
				</div>
			)}

			{isLoggedIn ? (
				<button
					onClick={() => handleBooking(startDate, endDate, guests)}
					className="mt-4 px-4 py-2 bg-pink-600 text-white rounded disabled:opacity-50"
					disabled={isBookingLoading || !startDate || !endDate}
				>
					{isBookingLoading ? 'Booking...' : 'Book Now'}
				</button>
			) : (
				<div className="mt-4 text-center">
					<p className="text-sm text-gray-600 mb-2">You must be logged in to book this venue.</p>
					<button
						onClick={() => navigate('/login')}
						className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700"
					>
						Login to Book
					</button>
				</div>
			)}

			{bookingError && <p className="text-sm text-red-600 mt-2">{bookingError}</p>}
			{success && <p className="text-sm text-green-600 mt-2">Booking successful!</p>}
		</div>
	);
}
