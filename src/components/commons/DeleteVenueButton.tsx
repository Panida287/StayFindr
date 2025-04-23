import { useDeleteVenue } from '../../hooks/useDeleteVenue';
import { useProfileStore } from '../../store/ProfileStore.ts';

export default function DeleteVenueButton({ venueId }: { venueId: string }) {
	const { deleteVenue, isDeleting } = useDeleteVenue({
		onError: (msg) => alert(msg),
	});

	const refreshVenues = useProfileStore((state) => state.fetchVenuesByProfile);

	const handleDelete = async () => {
		if (!confirm('Are you sure you want to delete this venue?')) return;

		const success = await deleteVenue(venueId);
		if (success) {
			await refreshVenues(); // ✅ now from ProfileStore
		}
	};

	return (
		<button
			onClick={handleDelete}
			className="text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
		>
			{isDeleting ? 'Deleting...' : 'Delete'}
		</button>
	);
}
