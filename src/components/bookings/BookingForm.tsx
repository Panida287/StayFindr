import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingCalendar from './BookingCalendar';
import { calculateNights } from '../../utilities/calculateNights';
import { SplitButton } from '../commons/Buttons';
import { BookingModal } from './BookingModal';

export interface BookingFormProps {
	/** Price per night */
	price: number;
	/** Maximum guests allowed */
	maxGuests: number;
	/** Date ranges already booked */
	bookedDateRanges: { start: Date; end: Date }[];
	/** Callback to trigger booking */
	handleBooking: (start: Date | null, end: Date | null, guests: number) => void;
	/** Whether booking request is in progress */
	isBookingLoading: boolean;
	/** Error message from booking request */
	bookingError: string | null;
	/** Whether booking was successful */
	success: boolean;
	/** Pre-filled check-in date */
	initialStartDate?: Date | null;
	/** Pre-filled check-out date */
	initialEndDate?: Date | null;
	/** Pre-filled guest count */
	initialGuests?: number;
}

/**
 * Booking form for selecting date range, guest count, and submitting a reservation.
 * Displays booking summary, total price, and modal confirmation.
 */
export default function BookingForm({
	                                    price,
	                                    maxGuests,
	                                    bookedDateRanges,
	                                    handleBooking,
	                                    bookingError,
	                                    initialStartDate = null,
	                                    initialEndDate = null,
	                                    initialGuests = 1,
                                    }: BookingFormProps) {
	const [startDate, setStartDate] = useState<Date | null>(initialStartDate);
	const [endDate, setEndDate] = useState<Date | null>(initialEndDate);
	const [guests, setGuests] = useState<number>(initialGuests);
	const [showModal, setShowModal] = useState(false);

	const navigate = useNavigate();
	const isLoggedIn = Boolean(localStorage.getItem('SFToken'));

	useEffect(() => {
		setStartDate(initialStartDate);
	}, [initialStartDate]);

	useEffect(() => {
		setEndDate(initialEndDate);
	}, [initialEndDate]);

	useEffect(() => {
		setGuests(initialGuests);
	}, [initialGuests]);

	const totalPrice =
		startDate && endDate
			? calculateNights(startDate, endDate) * price
			: 0;

	const handleModalClose = () => {
		setShowModal(false);
		setStartDate(null);
		setEndDate(null);
	};

	const isRangeAvailable = (
		start: Date | null,
		end: Date | null,
		booked: { start: Date; end: Date }[]
	) => {
		if (!start || !end) return false;
		return !booked.some(
			({ start: bookStart, end: bookEnd }) =>
				start <= bookEnd && end >= bookStart
		);
	};

	const isAvailable = isRangeAvailable(startDate, endDate, bookedDateRanges);
	const nights = startDate && endDate ? calculateNights(startDate, endDate) : 0;

	return (
		<div className="flex flex-col items-center sm:block">
			{/* Guest selector */}
			<div className="mt-4 flex items-center gap-2">
				<label
					htmlFor="guests"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Number of Guests
				</label>
				<div className="relative inline-block">
					<select
						id="guests"
						value={guests}
						onChange={e => setGuests(Number(e.target.value))}
						className="appearance-none rounded-full border border-gray-300 bg-white pl-4 pr-10 py-2 text-sm text-gray-700 shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
					>
						{Array.from({ length: maxGuests }, (_, i) => i + 1).map(num => (
							<option key={num} value={num}>
								{num} {num === 1 ? 'guest' : 'guests'}
							</option>
						))}
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
				<p className="text-xs text-gray-500 mt-1">
					Max {maxGuests} guests allowed
				</p>
			</div>

			{/* Calendar selection */}
			<BookingCalendar
				onDateChange={(s, e) => {
					setStartDate(s);
					setEndDate(e);
				}}
				bookedRanges={bookedDateRanges}
				initialRange={[initialStartDate, initialEndDate]}
			/>

			{/* Summary */}
			{startDate && endDate && isAvailable && (
				<>
					<h4 className="mt-6 text-primary font-medium">Booking Summary</h4>
					<div className="text-sm rounded-xl text-gray-700 bg-gray-50 mt-4 p-3 space-y-1">
						<div className="flex items-center justify-between gap-2">
							<div><b>Check-in Date:</b></div>
							<div>{startDate.toDateString()}</div>
						</div>
						<div className="flex items-center justify-between gap-2">
							<div><b>Check-out Date:</b></div>
							<div>{endDate.toDateString()}</div>
						</div>
						<div className="flex items-center justify-between gap-2">
							<div><b>Total nights:</b></div>
							<div>{nights} {nights === 1 ? 'night' : 'nights'}</div>
						</div>
						<div className="flex items-center justify-between gap-2">
							<div><b>Guests</b></div>
							<div>{guests} {guests === 1 ? 'guest' : 'guests'}</div>
						</div>
					</div>

					<div className="text-primary text-heading font-semibold text-lg mt-2">
						Total price: {totalPrice} NOK
						<p className="text-sm font-light text-gray-500">
							for {nights} {nights === 1 ? 'night' : 'nights'}
						</p>
						<p className="text-sm font-light text-gray-500 pt-2">
							{price} NOK per night
						</p>
					</div>

					{/* CTA Button */}
					{isLoggedIn ? (
						<SplitButton
							text="Book now"
							onClick={() => setShowModal(true)}
							bgColor="bg-primary"
							borderColor="border-primary"
							textColor="text-primary"
							hoverTextColor="group-hover:text-primary"
							arrowColor="text-white"
							arrowHoverColor="group-hover:text-primary"
							className="mt-4 disabled:opacity-50 font-heading"
						/>
					) : (
						<div className="mt-4 text-center">
							<p className="text-sm text-gray-600 mb-2">
								Login or register to book this property
							</p>
							<SplitButton
								text="Login or Register"
								onClick={() => navigate('/login')}
								bgColor="bg-primary"
								borderColor="border-primary"
								textColor="text-primary"
								hoverTextColor="group-hover:text-primary"
								arrowColor="text-white"
								arrowHoverColor="group-hover:text-primary"
								className="mt-4 font-heading"
							/>
						</div>
					)}
				</>
			)}

			{/* Booking Modal */}
			{showModal && startDate && endDate && isAvailable && (
				<BookingModal
					startDate={startDate}
					endDate={endDate}
					guests={guests}
					pricePerNight={price}
					onClose={handleModalClose}
					onConfirmBooking={() => {
						handleBooking(startDate, endDate, guests);
					}}
				/>
			)}

			{/* Error Message */}
			{bookingError && (
				<p className="text-sm text-red-600 mt-2" role="alert">
					{bookingError}
				</p>
			)}
		</div>
	);
}
