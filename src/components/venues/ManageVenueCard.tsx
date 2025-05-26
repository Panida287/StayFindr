import { useState } from 'react';
import { Venue } from '../../types/venues';
import { useDeleteVenue } from '../../hooks/useDeleteVenue';
import { useProfileStore } from '../../store/ProfileStore';
import RatingBadge from '../commons/RatingBadge';
import Modal from '../commons/Modal';
import toast from 'react-hot-toast';
import DropdownMenu from '../commons/DropdownMenu';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import SafeImage from '../../utilities/SafeImage.tsx';

type Props = {
	/** The venue object to render */
	venue: Venue;
};

/**
 * Card component for managing a venue (edit, delete, view).
 */
export default function ManageVenueCard({ venue }: Props) {
	const user = localStorage.getItem('SFUsername')!;
	const [confirmOpen, setConfirmOpen] = useState(false);

	const { deleteVenue } = useDeleteVenue({
		onError: (msg) => toast.error(msg),
	});
	const refreshVenues = useProfileStore((s) => s.fetchVenuesByProfile);

	const handleDeleteConfirm = async () => {
		const success = await deleteVenue(venue.id);
		if (success) {
			await refreshVenues();
			toast.success('Venue has been deleted', {
				duration: 6000,
				style: { marginTop: '64px' },
			});
			setConfirmOpen(false);
		}
	};

	const createdTs = new Date(venue.created).getTime();
	const updatedTs = venue.updated ? new Date(venue.updated).getTime() : null;

	return (
		<div className="flex flex-col sm:flex-row h-full bg-white rounded-xl shadow-sm p-4 items-start gap-4">
			<SafeImage
				src={venue.media?.[0]?.url}
				alt={venue.media?.[0]?.alt || 'Venue image'}
				className="w-full h-72 sm:w-52 sm:h-56 object-cover rounded-md"
			/>

			<div className="relative flex-1 w-full h-full">
				<div className="absolute top-0 right-0">
					<DropdownMenu
						items={[
							{
								icon: <i className="fa-light fa-pen pr-2" />,
								label: 'Edit',
								to: `/admin/${user}/edit-venue/${venue.id}`,
								className: 'text-gray-600',
								hoverClassName: 'hover:bg-blue-50',
							},
							{
								icon: <i className="fa-light fa-trash pr-2" />,
								label: 'Delete',
								onClick: () => setConfirmOpen(true),
								className: 'text-red-600',
								hoverClassName: 'hover:bg-red-50',
							},
						]}
					>
						<button
							className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
							aria-label="Open venue options"
						>
							<i className="fa-solid fa-ellipsis-vertical text-gray-600" />
						</button>
					</DropdownMenu>
				</div>

				<div className="flex h-full justify-between items-start">
					<div className="flex flex-col justify-between h-full">
						<div>
							<h3 className="text-xl font-semibold">{venue.name}</h3>
							{venue.location?.city && venue.location?.country && (
								<p className="text-gray-500 text-sm mb-2">
									{venue.location.city}, {venue.location.country}
								</p>
							)}
							<p className="text-gray-500 text-sm mb-2">{venue.price} NOK / night</p>
							<p className="text-sm text-gray-600">
								Bookings:{' '}
								<span className="font-medium">{venue.bookings?.length || 0}</span>
							</p>
							<p className="text-sm text-gray-600 mt-4">
								Created:{' '}
								<span className="font-medium">
									{format(new Date(venue.created), 'dd - MMMM - yyyy')}
								</span>
							</p>
							{updatedTs !== null && updatedTs !== createdTs && (
								<p className="text-sm text-blue-500 italic">
									Updated:{' '}
									<span>
										{format(new Date(venue.updated!), 'dd - MMMM - yyyy')}
									</span>
								</p>
							)}
						</div>

						<RatingBadge rating={venue.rating} />
					</div>
				</div>

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
			</div>

			<Modal
				isOpen={confirmOpen}
				onClose={() => setConfirmOpen(false)}
				title="Delete Venue?"
				footer={
					<>
						<button
							onClick={() => setConfirmOpen(false)}
							className="btn-base bg-gray-400"
						>
							Cancel
						</button>
						<button
							onClick={handleDeleteConfirm}
							className="btn-base bg-red-600 text-white"
						>
							Yes, delete
						</button>
					</>
				}
			>
				<p>This action cannot be undone. Are you sure you want to delete this venue?</p>
			</Modal>
		</div>
	);
}
