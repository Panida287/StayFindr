import { useState } from 'react';
import ImageGallery from '../venues/ImageGallery.tsx';
import { format, differenceInDays } from 'date-fns';
import { Profile } from '../../types/profile.ts';
import useUpdateGuests from '../../hooks/useUpdateGuests.ts';
import Modal from '../commons/Modal.tsx';

type MyBookingCardProps = {
	booking: Profile['bookings'][0];
	refreshBookings: () => void;
};

export default function MyBookingCard({ booking, refreshBookings }: MyBookingCardProps) {
	const { dateFrom, dateTo, guests, venue, id } = booking;

	const nights = differenceInDays(new Date(dateTo), new Date(dateFrom));
	const formattedFrom = format(new Date(dateFrom), 'MMM d, yyyy');
	const formattedTo = format(new Date(dateTo), 'MMM d, yyyy');

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newGuests, setNewGuests] = useState(guests);
	const [isConfirming, setIsConfirming] = useState(false);
	const maxGuests = venue.maxGuests;

	const { updateGuests, loading } = useUpdateGuests();

	const handleSubmit = () => {
		if (newGuests < 1 || newGuests > maxGuests) {
			alert(`Guests must be between 1 and ${maxGuests}`);
			return;
		}
		setIsConfirming(true);
	};

	const handleConfirm = async () => {
		const success = await updateGuests(id, newGuests);
		if (success) {
			setIsConfirming(false);
			setIsModalOpen(false);
			refreshBookings(); // Refresh from parent
		}
	};

	return (
		<div className="border rounded-lg shadow-md overflow-hidden">
			<ImageGallery images={venue.media} altFallback={venue.name} heightClass="h-56" />

			<div className="p-4 space-y-2">
				<h3 className="text-xl font-semibold">{venue.name}</h3>
				<p className="text-sm text-gray-600">
					{venue.location.city}, {venue.location.country}
				</p>
				<p className="text-sm text-gray-600">
					{formattedFrom} → {formattedTo} ({nights} night{nights > 1 ? 's' : ''})
				</p>
				<p className="text-sm text-gray-600">Guests: {guests}</p>

				<div className="flex justify-between mt-3">
					<a
						href={`/venue/${venue.id}`}
						target="_blank"
						rel="noopener noreferrer"
						className="px-4 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600"
					>
						View Venue
					</a>
					<button
						onClick={() => setIsModalOpen(true)}
						className="px-4 py-1 text-sm bg-gray-200 rounded hover:bg-gray-300"
					>
						Edit Guests
					</button>
					<button className="px-4 py-1 text-sm text-red-600 border border-red-500 rounded hover:bg-red-50">
						Cancel Booking
					</button>
				</div>
			</div>

			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				{!isConfirming ? (
					<div className="space-y-4">
						<h2 className="text-xl font-semibold">Edit Guests</h2>

						<div className="flex items-center gap-4">
							<button
								onClick={() => setNewGuests((prev) => Math.max(1, prev - 1))}
								className="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold"
								aria-label="Decrease guests"
							>
								−
							</button>

							<span className="text-lg font-medium">{newGuests}</span>

							<button
								onClick={() => setNewGuests((prev) => Math.min(maxGuests, prev + 1))}
								className="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold"
								aria-label="Increase guests"
							>
								+
							</button>
						</div>

						<p className="text-sm text-gray-500">Maximum guests: {maxGuests}</p>

						<div className="flex justify-end gap-2">
							<button
								onClick={() => setIsModalOpen(false)}
								className="btn-base bg-gray-400"
							>
								Cancel
							</button>
							<button
								onClick={handleSubmit}
								className="btn-base bg-green-500"
							>
								Continue
							</button>
						</div>
					</div>

				) : (
					<div className="space-y-4">
						<h2 className="text-xl font-semibold">Confirm Update</h2>
						<p>Are you sure you want to change number of guests to {newGuests}?</p>
						<div className="flex justify-end gap-2">
							<button
								onClick={() => setIsConfirming(false)}
								className="btn-base bg-gray-400"
							>
								Back
							</button>
							<button
								onClick={handleConfirm}
								disabled={loading}
								className="btn-base bg-green-600"
							>
								{loading ? 'Saving...' : 'Confirm'}
							</button>
						</div>
					</div>
				)}
			</Modal>
		</div>
	);
}
