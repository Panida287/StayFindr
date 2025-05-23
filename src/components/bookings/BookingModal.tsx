import { useState, useEffect } from 'react';
import { FaCreditCard } from 'react-icons/fa';
import { SiApple, SiKlarna } from 'react-icons/si';
import { CommonButton, SplitButton } from '../commons/Buttons';

//TODO: prohibit user from scrolling while modal appears

type BookingModalProps = {
	startDate: Date;
	endDate: Date;
	guests: number;
	pricePerNight: number;
	onClose: () => void;
	onConfirmBooking: (paymentMethod: string) => void;
};

export function BookingModal({
	                             startDate,
	                             endDate,
	                             guests,
	                             pricePerNight,
	                             onClose,
	                             onConfirmBooking,
                             }: BookingModalProps) {
	const [step, setStep] = useState<1 | 2>(1);
	const [paymentMethod, setPaymentMethod] = useState<string>('credit');
	const [bookingRef, setBookingRef] = useState<string>('');
	const [userEmail, setUserEmail] = useState<string>('');

	const nights = Math.ceil(
		(endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
	);
	const total = nights * pricePerNight;

	useEffect(() => {
		const email = localStorage.getItem('SFUserEmail') || '';
		setUserEmail(email);
		setBookingRef(
			'REF-' + Math.random().toString(36).slice(2, 10).toUpperCase()
		);
	}, []);

	const handleConfirm = () => {
		setStep(2);
		onConfirmBooking(paymentMethod);
	};

	const paymentOptions = [
		{ value: 'credit', label: 'Credit Card', icon: <FaCreditCard /> },
		{ value: 'apple', label: 'Apple Pay', icon: <SiApple /> },
		{ value: 'klarna', label: 'Klarna', icon: <SiKlarna /> },
	];

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white rounded-lg w-[90%] max-w-md p-6 relative">
				<button
					onClick={onClose}
					className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
				>
					✕
				</button>

				{/* Progress bar */}
				<div className="flex items-center mb-6">
					<div
						className={`flex-1 text-center ${
							step === 1 ? 'font-bold' : 'text-gray-400'
						}`}
					>
						1. Review
					</div>
					<div className="w-8 h-px bg-gray-300 mx-2" />
					<div
						className={`flex-1 text-center ${
							step === 2 ? 'font-bold' : 'text-gray-400'
						}`}
					>
						2. Confirmed
					</div>
				</div>

				{step === 1 ? (
					<>
						{/* Booking summary */}
						<div className="space-y-2 mb-4 text-sm text-gray-700">
							<div className="flex justify-between">
								<span>Check-in:</span>
								<span>{startDate.toDateString()}</span>
							</div>
							<div className="flex justify-between">
								<span>Check-out:</span>
								<span>{endDate.toDateString()}</span>
							</div>
							<div className="flex justify-between">
								<span>Nights:</span>
								<span>{nights}</span>
							</div>
							<div className="flex justify-between">
								<span>Guests:</span>
								<span>{guests}</span>
							</div>
							<div className="flex justify-between font-semibold">
								<span>Total:</span>
								<span>{total} NOK</span>
							</div>
						</div>

						{/* Payment options */}
						<div className="mb-6">
							{paymentOptions.map((opt) => (
								<label
									key={opt.value}
									className="flex items-center mb-3 cursor-pointer"
								>
									<input
										type="radio"
										name="payment"
										value={opt.value}
										checked={paymentMethod === opt.value}
										onChange={() => setPaymentMethod(opt.value)}
										className="form-radio h-4 w-4 text-primary"
									/>
									<span className="ml-3 mr-2 text-xl">{opt.icon}</span>
									<span className="text-gray-700">{opt.label}</span>
								</label>
							))}
						</div>

						{/* Cancel & Confirm buttons */}
						<div className="flex gap-3 justify-between">
							<CommonButton
								onClick={onClose}
								bgColor="bg-white"
								textColor="text-gray-700"
								hoverColor="hover:bg-gray-100"
								borderClass="border border-gray-300"
								className=""
							>
								Cancel
							</CommonButton>
							<SplitButton
								text="Confirm Booking"
								onClick={handleConfirm}
								bgColor="bg-primary"
								borderColor="border-primary"
								textColor="text-primary"
								arrowColor="text-white"
								arrowHoverColor="group-hover:text-primary"
								className="font-heading"
							/>
						</div>
					</>
				) : (
					<>
						{/* Confirmation */}
						<div className="text-center space-y-4">
							<p className="text-lg font-semibold text-primary">
								Booking Confirmed!
							</p>
							<p>Your reference:</p>
							<p className="font-mono">{bookingRef}</p>
							{userEmail && (
								<p className="text-sm text-gray-600">
									Details sent to: <b>{userEmail}</b>
								</p>
							)}
							<CommonButton
								onClick={onClose}
								bgColor="bg-secondary"
								textColor="text-primary"
								hoverColor="hover:bg-background"
								className="mt-4"
							>
								Close
							</CommonButton>
						</div>
					</>
				)}
			</div>
		</div>
	);
}
