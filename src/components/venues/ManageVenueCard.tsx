// components/venues/ManageVenueCard.tsx
import { useState, useRef, useEffect } from 'react';
import { Venue } from '../../types/venues.ts';
import { FALLBACK } from '../../constants.ts';
import { Link } from 'react-router-dom';
import { useDeleteVenue } from '../../hooks/useDeleteVenue';
import { useProfileStore } from '../../store/ProfileStore';
import RatingBadge from '../commons/RatingBadge';
import Modal from '../commons/Modal';
import toast from 'react-hot-toast';

type Props = { venue: Venue };

export default function ManageVenueCard({ venue }: Props) {
	const user = localStorage.getItem('SFUsername');

	const [menuOpen, setMenuOpen] = useState(false);
	const menuRef = useRef<HTMLDivElement>(null);

	const [confirmOpen, setConfirmOpen] = useState(false);

	const { deleteVenue } = useDeleteVenue({
		onError: (msg) => toast.error(msg),
	});
	const refreshVenues = useProfileStore((s) => s.fetchVenuesByProfile);

	// close dropdown on outside click
	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
				setMenuOpen(false);
			}
		};
		document.addEventListener('mousedown', handler);
		return () => document.removeEventListener('mousedown', handler);
	}, []);

	const handleDeleteConfirm = async () => {
		const success = await deleteVenue(venue.id);
		if (success) {
			await refreshVenues();
			toast.success('Venue has been deleted');
			setConfirmOpen(false);
		}
	};

	return (
		<div className="relative bg-white rounded-xl shadow-sm p-4 flex items-start gap-4">
			{/* Dropdown trigger */}
			<div ref={menuRef} className="absolute top-4 right-4">
				<button
					onClick={() => setMenuOpen((o) => !o)}
					className="p-2 rounded-full hover:bg-gray-100 focus:outline-none"
				>
					<i className="fa-solid fa-ellipsis-vertical text-gray-600"></i>
				</button>

				{menuOpen && (
					<div className="mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-20">
						<Link
							to={`/admin/${user}/edit-venue/${venue.id}`}
							className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
							onClick={() => setMenuOpen(false)}
						>
							<i className="fa-light fa-pen-to-square pr-2"></i>
							Edit
						</Link>
						<button
							onClick={() => {
								setMenuOpen(false);
								setConfirmOpen(true);
							}}
							className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
						>
							<i className="fa-light fa-trash pr-2"></i>
							Delete
						</button>
					</div>
				)}
			</div>

			{/* Venue image */}
			<img
				src={venue.media[0]?.url || FALLBACK.venue}
				alt={venue.media[0]?.alt || 'Venue image'}
				onError={(e) => {
					e.currentTarget.src = FALLBACK.venue;
				}}
				className="w-52 h-52 object-cover rounded-md"
			/>

			{/* Venue details */}
			<div className="flex-1 h-full">
				<div className="flex h-full justify-between items-start">
					<div className="flex flex-col h-full justify-between">
						<div>
							<h3 className="text-xl font-semibold">{venue.name}</h3>
							<p className="text-gray-500 text-sm mb-2">
								{venue.location.city}, {venue.location.country}
							</p>
							<p className="text-gray-500 text-sm mb-2">
								{venue.price} NOK / night
							</p>
							<p className="text-sm text-gray-600">
								Bookings:{' '}
								<span className="font-medium">
                  {venue.bookings?.length || 0}
                </span>
							</p>
						</div>
						<RatingBadge rating={venue.rating} />
					</div>
				</div>
			</div>

			{/* Delete Confirmation Modal */}
			{confirmOpen && (
				<Modal isOpen onClose={() => setConfirmOpen(false)}>
					<div className="space-y-4">
						<h2 className="text-xl font-semibold text-red-600">
							Delete Venue?
						</h2>
						<p>This action cannot be undone. Are you sure you want to delete this venue?</p>
						<div className="flex justify-end gap-2">
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
						</div>
					</div>
				</Modal>
			)}
		</div>
	);
}
