import { useState, useEffect, JSX } from 'react';
import { FaCreditCard } from 'react-icons/fa';
import { SiApple, SiKlarna } from 'react-icons/si';
import { CommonButton, SplitButton } from '../commons/Buttons';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

type PaymentMethod = 'credit' | 'apple' | 'klarna';

type BookingModalProps = {
	/** Check-in date */
	startDate: Date;
	/** Check-out date */
	endDate: Date;
	/** Number of guests */
	guests: number;
	/** Price per night in NOK */
	pricePerNight: number;
	/** Called when modal is dismissed */
	onClose: () => void;
	/** Called on final confirmation with payment method */
	onConfirmBooking: (paymentMethod: PaymentMethod) => void;
};

/**
 * Booking confirmation modal with review and simulated payment step.
 */
export function BookingModal({
	                             startDate,
	                             endDate,
	                             guests,
	                             pricePerNight,
	                             onClose,
	                             onConfirmBooking,
                             }: BookingModalProps) {
	const [step, setStep] = useState<1 | 2>(1);
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('credit');
	const [bookingRef, setBookingRef] = useState('');
	const [userEmail, setUserEmail] = useState('');
	const navigate = useNavigate();

	const user = localStorage.getItem('SFUsername');

	const nights = Math.ceil((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
	const total = nights * pricePerNight;

	useEffect(() => {
		const email = localStorage.getItem('SFUserEmail') || '';
		setUserEmail(email);
		setBookingRef('REF-' + Math.random().toString(36).slice(2, 10).toUpperCase());
	}, []);

	const handleCancel = () => onClose();
	const handleFinalClose = () => {
		onClose();
		navigate(`/user/${user}`);
	};

	const handleConfirm = () => {
		toast.success('Booking confirmed!', {
			duration: 6000,
			style: { marginTop: '64px' },
		});
		setStep(2);
		onConfirmBooking(paymentMethod);
	};

	const paymentOptions: {
		value: PaymentMethod;
		label: string;
		icon: JSX.Element;
	}[] = [
		{ value: 'credit', label: 'Credit Card', icon: <FaCreditCard /> },
		{ value: 'apple', label: 'Apple Pay', icon: <SiApple /> },
		{ value: 'klarna', label: 'Klarna', icon: <SiKlarna /> },
	];

	return (
		<div
			className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
			role="dialog"
			aria-modal="true"
			aria-labelledby="bookingModalTitle"
		>
			<div className="modal bg-white rounded-lg w-[90%] max-w-md p-6 relative shadow-lg">
				<button
					onClick={step === 1 ? handleCancel : handleFinalClose}
					className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
					aria-label="Close booking modal"
				>
					✕
				</button>

				{/* Progress header */}
				<div className="flex items-center mb-6">
					<div className={`flex-1 text-center ${step === 1 ? 'font-bold' : 'text-gray-400'}`}>
						1. Review
					</div>
					<div className="w-8 h-px bg-gray-300 mx-2" />
					<div className={`flex-1 text-center ${step === 2 ? 'font-bold' : 'text-gray-400'}`}>
						2. Confirmed
					</div>
				</div>

				{step === 1 ? (
					<>
						{/* Booking Summary */}
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

						{/* Payment Method */}
						<fieldset className="mb-6">
							<legend className="sr-only">Choose payment method</legend>
							{paymentOptions.map(({ value, label, icon }) => (
								<label key={value} className="flex items-center mb-3 cursor-pointer">
									<input
										type="radio"
										name="payment"
										value={value}
										checked={paymentMethod === value}
										onChange={() => setPaymentMethod(value)}
										className="form-radio h-4 w-4 text-primary"
										aria-label={`Pay with ${label}`}
									/>
									<span className="ml-3 mr-2 text-xl" aria-hidden>{icon}</span>
									<span className="text-gray-700">{label}</span>
								</label>
							))}
						</fieldset>

						{/* Action Buttons */}
						<div className="flex gap-3 justify-between">
							<CommonButton
								onClick={handleCancel}
								bgColor="bg-white"
								textColor="text-gray-700"
								hoverColor="hover:bg-gray-100"
								borderClass="border border-gray-300"
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
					// Step 2: Confirmation
					<div className="text-center space-y-4">
						<h3 id="bookingModalTitle" className="text-lg font-semibold text-primary">
							Booking Confirmed!
						</h3>
						<p>Your reference:</p>
						<p className="font-mono text-sm">{bookingRef}</p>
						{userEmail && (
							<p className="text-sm text-gray-600">
								Details sent to: <strong>{userEmail}</strong>
							</p>
						)}
						<CommonButton
							onClick={handleFinalClose}
							bgColor="bg-secondary"
							textColor="text-primary"
							hoverColor="hover:bg-background"
							className="mt-4"
						>
							Close
						</CommonButton>
					</div>
				)}
			</div>
		</div>
	);
}
