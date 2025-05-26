import { useState } from 'react';
import ImageGallery from '../venues/ImageGallery';
import { format, differenceInDays } from 'date-fns';
import { Profile } from '../../types/profile';
import useUpdateGuests from '../../hooks/useUpdateGuests';
import Modal from '../commons/Modal';
import useDeleteBooking from '../../hooks/useDeleteBooking';
import toast from 'react-hot-toast';
import DropdownMenu from '../commons/DropdownMenu';
import { CommonButton } from '../commons/Buttons.tsx';
import { Link } from 'react-router-dom';

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
		const promise = updateGuests(id, newGuests);
		toast.promise(promise, {
			loading: 'Updating guests...',
			success: 'Guests updated!',
			error: 'Update failed.',
		}, {
			duration: 6000,
			style: { marginTop: '64px' },
		});
		const ok = await promise;
		if (ok) {
			setIsConfirming(false);
			setIsModalOpen(false);
			refreshBookings();
		}
	};

	const handleDelete = async () => {
		const promise = deleteBooking(id);
		toast.promise(promise, {
			loading: 'Cancelling booking...',
			success: 'Booking cancelled.',
			error: 'Cancellation failed.',
		}, {
			duration: 6000,
			style: { marginTop: '64px' },
		});
		const ok = await promise;
		if (ok) {
			setIsDeleting(false);
			refreshBookings();
		}
	};

	const menuItems = [
		{
			icon: <i className="fa-light fa-user-pen pr-2" />,
			label: 'Edit Guests',
			onClick: () => setIsModalOpen(true),
			className: 'text-gray-700',
			hoverClassName: 'hover:bg-gray-100',
		},
		{
			icon: <i className="fa-regular fa-trash pr-2" />,
			label: 'Cancel Booking',
			onClick: () => setIsDeleting(true),
			className: 'text-red-600',
			hoverClassName: 'hover:bg-red-50',
		},
	];

	return (
		<div className="relative flex flex-col md:flex-row rounded-lg overflow-hidden shadow-md bg-white transition hover:shadow-lg">

			{isOngoing && (
				<span className="absolute top-2 right-2 bg-green-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
					Ongoing
				</span>
			)}

			<ImageGallery
				images={venue.media}
				altFallback={venue.name}
				heightClass="h-56 md:h-52 md:max-w-[250px]"
			/>

			<div className="relative p-4 space-y-2 w-full md:flex-1">
				<h3 className="text-xl font-semibold">{venue.name}</h3>
				<p className="text-sm text-gray-600">
					{venue.location.city}, {venue.location.country}
				</p>
				<p className="text-sm text-gray-600">
					{formattedFrom} → {formattedTo} ({nights} night{nights > 1 ? 's' : ''})
				</p>
				<p className="text-sm text-gray-600">Guests: {guests}</p>

				<Link
					key={venue.id}
					to={`/venue/${venue.id}`}
					target="_blank"
					rel="noopener noreferrer"
					className="absolute bottom-0 px-2 py-1 rounded-full right-0 hover:bg-gray-100 transition"
					aria-label={`Open ${venue.name} in new tab`}
				>
					<i className="fa-light fa-arrow-up-right-from-square pr-1" />
				</Link>

				{isUpcoming && (
					<div className="absolute top-0 right-2 z-20">
						<DropdownMenu items={menuItems}>
							<button className="p-2 rounded-full w-full hover:bg-gray-100">
								<i className="fa-solid fa-ellipsis-vertical text-gray-600" />
							</button>
						</DropdownMenu>
					</div>
				)}
			</div>

			{/* Edit Modal */}
			<Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
				{!isConfirming ? (
					<div className="space-y-4 w-full">
						<h2 className="text-xl flex justify-center font-semibold">Edit Guests</h2>
						<div className="flex justify-center items-center gap-4">
							<button
								onClick={() => setNewGuests((g) => Math.max(1, g - 1))}
								className="h-10 w-10 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold"
							>
								−
							</button>
							<span className="text-lg font-medium">{newGuests}</span>
							<button
								onClick={() => setNewGuests((g) => Math.min(maxGuests, g + 1))}
								className="h-10 w-10 flex justify-center items-center rounded-full bg-gray-200 hover:bg-gray-300 text-xl font-bold"
							>
								+
							</button>
						</div>
						<p className="text-sm text-gray-500 w-full text-center">
							Maximum guests: {maxGuests}
						</p>
						<div className="flex justify-between w-full">
							<CommonButton
								onClick={() => setIsModalOpen(false)}
								bgColor="bg-white"
								hoverColor="hover:bg-background"
								textColor="text-primary"
								borderClass="border border-primary"
							>
								Cancel
							</CommonButton>
							<CommonButton
								onClick={() => setIsConfirming(true)}
								bgColor="bg-primary"
								hoverColor="hover:bg-background"
								textColor="text-white"
							>
								Continue
							</CommonButton>
						</div>
					</div>
				) : (
					<div className="space-y-4 w-full">
						<h2 className="text-xl flex justify-center font-semibold">Confirm Update</h2>
						<p className="text-center">Change guests to <strong>{newGuests}</strong>?</p>
						<div className="flex justify-between w-full">
							<CommonButton
								onClick={() => setIsConfirming(false)}
								bgColor="bg-white"
								hoverColor="hover:bg-background"
								textColor="text-primary"
								borderClass="border border-primary"
							>
								Back
							</CommonButton>
							<CommonButton
								onClick={handleGuestUpdate}
								disabled={updating}
								bgColor="bg-primary"
								hoverColor="hover:bg-background"
								textColor="text-white"
							>
								{updating ? 'Saving...' : 'Confirm'}
							</CommonButton>
						</div>
					</div>
				)}
			</Modal>

			{/* Delete Modal */}
			<Modal isOpen={isDeleting} onClose={() => setIsDeleting(false)}>
				<div className="space-y-4 w-full">
					<h2 className="text-xl flex justify-center font-semibold text-red-600">
						Cancel Booking
					</h2>
					<p className="text-center">Are you sure you want to cancel this booking?</p>
					<p className="text-sm text-gray-500 text-center">
						This action cannot be undone.
					</p>
					<div className="flex justify-between w-full">
						<CommonButton
							onClick={() => setIsDeleting(false)}
							bgColor="bg-white"
							hoverColor="hover:bg-background"
							textColor="text-primary"
							borderClass="border border-primary"
						>
							Back
						</CommonButton>
						<CommonButton
							onClick={handleDelete}
							disabled={deleting}
							bgColor="bg-red-600"
							hoverColor="hover:bg-red-700"
							textColor="text-white"
							hoverTextColor="hover:text-white"
						>
							{deleting ? 'Deleting...' : 'Yes, Cancel'}
						</CommonButton>
					</div>
				</div>
			</Modal>
		</div>
	);
}
