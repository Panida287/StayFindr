import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BookingCalendar from './BookingCalendar';
import { calculateNights } from '../../utilities/calculateNights';
import { SplitButton } from '../commons/Buttons.tsx';
import { BookingModal } from './BookingModal.tsx';

export interface BookingFormProps {
	price: number;
	maxGuests: number;
	bookedDateRanges: { start: Date; end: Date }[];
	handleBooking: (start: Date | null, end: Date | null, guests: number) => void;
	isBookingLoading: boolean;
	bookingError: string | null;
	success: boolean;

	/** seed the calendar */
	initialStartDate?: Date | null;
	initialEndDate?: Date | null;
	/** seed the guest count */
	initialGuests?: number;
}

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

	// keep state in sync if props change
	useEffect(() => {
		setStartDate(initialStartDate);
	}, [initialStartDate]);
	useEffect(() => {
		setEndDate(initialEndDate);
	}, [initialEndDate]);
	useEffect(() => {
		setGuests(initialGuests);
	}, [initialGuests]);

	const navigate = useNavigate();
	const token = localStorage.getItem('SFToken');
	const isLoggedIn = Boolean(token);
	const userId = localStorage.getItem('SFUserId');

	const totalPrice =
		startDate && endDate
			? calculateNights(startDate, endDate) * price
			: 0;

	const handleModalClose = () => {
		setShowModal(false);
		setStartDate(null);
		setEndDate(null);
		navigate(`/user/${userId}`);
	};

	return (
		<div className="flex flex-col items-center sm:block">
			<div className="mt-4 flex items-center gap-2">
				<label
					htmlFor="guests"
					className="block text-sm font-medium text-gray-700 mb-1"
				>
					Number of Guests
				</label>

				{/* ← wrap in a relative container */}
				<div className="relative inline-block">
					<select
						id="guests"
						value={guests}
						onChange={e => setGuests(Number(e.target.value))}
						className="appearance-none rounded-full border border-gray-300
							        bg-white pl-4 pr-10 py-2 text-sm text-gray-700
							        shadow-sm focus:outline-none focus:ring-2 focus:ring-primary
							        focus:border-transparent transition"
					>
						{Array.from({length: maxGuests}, (_, i) => i + 1).map(num => (
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

			<BookingCalendar
				onDateChange={(s, e) => {
					setStartDate(s);
					setEndDate(e);
				}}
				bookedRanges={bookedDateRanges}
				initialRange={[initialStartDate, initialEndDate]}
			/>

			{startDate && endDate && (
				<div>
					<h4 className="mt-6 text-primary font-medium">Booking Summary</h4>
					<div className="text-sm rounded-xl text-gray-700 bg-gray-50 mt-4 p-3 space-y-1">
						<div className="flex items-center justify-between gap-2">
							<div>
								<b>Check-in Date:</b>
							</div>
							<div>
								{startDate.toDateString()}
							</div>
						</div>

						<div className="flex items-center justify-between gap-2">
							<div>
								<b>Check-out Date:</b>
							</div>
							<div>
								{endDate.toDateString()}
							</div>
						</div>

						<div className="flex items-center justify-between gap-2">
							<div>
								<b>Total nights:</b>
							</div>
							<div>
								{calculateNights(startDate, endDate)}{' '}
								{calculateNights(startDate, endDate) === 1 ? 'night' : 'nights'}
							</div>
						</div>

						<div className="flex items-center justify-between gap-2">
							<div>
								<b>Guests</b>
							</div>
							<div>
								{guests} {guests === 1 ? 'guest' : 'guests'}
							</div>
						</div>
					</div>

				</div>
			)}

			{startDate && endDate && (
				<div className="text-primary text-heading font-semibold text-lg mt-2">
					<p>
						Total price: {totalPrice} NOK
						<p className="text-sm font-light text-gray-500">
							for {calculateNights(startDate, endDate)}{' '}
							{calculateNights(startDate, endDate) === 1 ? 'night' : 'nights'}
						</p>
					</p>
					<p className="text-sm font-light text-gray-500 pt-2">
						{price} NOK per night
					</p>
				</div>
			)}

			{/* … earlier parts of your JSX … */}

			{startDate && endDate && (
				isLoggedIn ? (
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
				)
			)}

			{showModal && startDate && endDate && (
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


			{bookingError && <p className="text-sm text-red-600 mt-2">{bookingError}</p>}
		</div>
	);
}
