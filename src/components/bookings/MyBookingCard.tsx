import { useState } from 'react';
import ImageGallery from '../venues/ImageGallery.tsx';
import { format, differenceInDays } from 'date-fns';
import { Profile } from '../../types/profile.ts';
import useUpdateGuests from '../../hooks/useUpdateGuests.ts';
import Modal from '../commons/Modal.tsx';
import useDeleteBooking from '../../hooks/useDeleteBooking.ts';
import toast from 'react-hot-toast';
import { CommonButton } from '../commons/Buttons.tsx';

type MyBookingCardProps = {
	booking: Profile['bookings'][0];
	refreshBookings: () => void;
};

export default function MyBookingCard({
	                                      booking,
	                                      refreshBookings,
                                      }: MyBookingCardProps) {
	const { dateFrom, dateTo, guests, venue, id } = booking;
	const now = new Date();

	const isUpcoming = new Date(dateFrom) > now;
	const isOngoing = new Date(dateFrom) <= now && new Date(dateTo) >= now;

	const nights = differenceInDays(new Date(dateTo), new Date(dateFrom));
	const formattedFrom = format(new Date(dateFrom), 'MMM d, yyyy');
	const formattedTo = format(new Date(dateTo), 'MMM d, yyyy');

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [newGuests, setNewGuests] = useState(guests);
	const [isConfirming, setIsConfirming] = useState(false);
	const [isDeleting, setIsDeleting] = useState(false);

	const maxGuests = venue.maxGuests;

	const { updateGuests, loading: updating } = useUpdateGuests();
	const { deleteBooking, loading: deleting } = useDeleteBooking();

	const handleGuestUpdate = async () => {
		const updatePromise = updateGuests(id, newGuests);
		toast.promise(updatePromise, {
			loading: 'Updating booking...',
			success: 'Booking updated successfully',
			error: 'Failed to update booking',
		});
		const success = await updatePromise;
		if (success) {
			setIsConfirming(false);
			setIsModalOpen(false);
			refreshBookings();
		}
	};

	const handleDelete = async () => {
		const deletePromise = deleteBooking(id);
		toast.promise(deletePromise, {
			loading: 'Canceling booking...',
			success: 'Booking has been canceled',
			error: 'Failed to cancel booking',
		});
		const success = await deletePromise;
		if (success) {
			setIsDeleting(false);
			refreshBookings();
		}
	};

	const handleSubmit = () => {
		if (newGuests < 1 || newGuests > maxGuests) {
			toast.error(`Guests must be between 1 and ${maxGuests}`);
			return;
		}
		setIsConfirming(true);
	};

	return (
		<div className="relative flex flex-col rounded-lg overflow-hidden shadow-md bg-white/50 hover:shadow-lg transition">
			{/* Ongoing badge */}
			{isOngoing && (
				<span className="absolute top-2 z-20 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
          Ongoing
        </span>
			)}

			<a
				href={`/venue/${venue.id}`}
				target="_blank"
				rel="noopener noreferrer"
			>
				<ImageGallery
					images={venue.media}
					altFallback={venue.name}
					heightClass="h-56"
				/>

				<div className="space-y-2 p-4">
					<h3 className="text-xl font-semibold">{venue.name}</h3>
					<p className="text-sm text-gray-600">
						{venue.location.city}, {venue.location.country}
					</p>
					<p className="text-sm text-gray-600">
						{formattedFrom} → {formattedTo} ({nights} night
						{nights > 1 ? 's' : ''})
					</p>
					<p className="text-sm text-gray-600">Guests: {guests}</p>
				</div>
			</a>

			{/* Only future bookings get edit/delete */}
			{isUpcoming && (
				<>
					<div className="flex justify-between mt-3 p-4 pt-0">
						<CommonButton
							onClick={() => setIsModalOpen(true)}
							bgColor="bg-yellow-500"
							hoverColor="hover:bg-yellow-600"
							textColor="text-white"
							className="p-2 rounded-full border disabled:opacity-50"
						>
							<i className="fa-light fa-user-pen pr-2"></i>
							Edit Guests
						</CommonButton>
						<CommonButton
							onClick={() => setIsDeleting(true)}
							bgColor="bg-red-500"
							hoverColor="hover:bg-red-600"
							textColor="text-white"
							className="p-2 rounded-full disabled:opacity-50"
						>
							<i className="fa-regular fa-trash"></i>
						</CommonButton>
					</div>

					{/* Edit Guests Modal */}
					<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
						{!isConfirming ? (
							<div className="space-y-4">
								<h2 className="text-xl font-semibold">Edit Guests</h2>
								<div className="flex items-center gap-4">
									<button
										onClick={() => setNewGuests(prev => Math.max(1, prev - 1))}
										className="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold"
										aria-label="Decrease guests"
									>
										−
									</button>
									<span className="text-lg font-medium">{newGuests}</span>
									<button
										onClick={() =>
											setNewGuests(prev => Math.min(maxGuests, prev + 1))
										}
										className="px-3 py-1 rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold"
										aria-label="Increase guests"
									>
										+
									</button>
								</div>
								<p className="text-sm text-gray-500">
									Maximum guests: {maxGuests}
								</p>
								<div className="flex justify-end gap-2">
									<button
										onClick={() => setIsModalOpen(false)}
										className="btn-base bg-gray-400"
									>
										Cancel
									</button>
									<button onClick={handleSubmit} className="btn-base bg-green-500">
										Continue
									</button>
								</div>
							</div>
						) : (
							<div className="space-y-4">
								<h2 className="text-xl font-semibold">Confirm Update</h2>
								<p>
									Are you sure you want to change number of guests to {newGuests}?
								</p>
								<div className="flex justify-end gap-2">
									<button
										onClick={() => setIsConfirming(false)}
										className="btn-base bg-gray-400"
									>
										Back
									</button>
									<button
										onClick={handleGuestUpdate}
										disabled={updating}
										className="btn-base bg-green-600"
									>
										{updating ? 'Saving...' : 'Confirm'}
									</button>
								</div>
							</div>
						)}
					</Modal>

					{/* Delete Booking Modal */}
					<Modal isOpen={isDeleting} onClose={() => setIsDeleting(false)}>
						<div className="space-y-4">
							<h2 className="text-xl font-semibold text-red-600">
								Cancel Booking
							</h2>
							<p>Are you sure you want to cancel this booking?</p>
							<p className="text-sm text-gray-500">
								This action cannot be undone.
							</p>
							<div className="flex justify-end gap-2">
								<button
									onClick={() => setIsDeleting(false)}
									className="btn-base bg-gray-400"
								>
									Back
								</button>
								<button
									onClick={handleDelete}
									disabled={deleting}
									className="btn-base bg-red-600 text-white"
								>
									{deleting ? 'Deleting...' : 'Yes, Cancel'}
								</button>
							</div>
						</div>
					</Modal>
				</>
			)}
		</div>
	);
}
