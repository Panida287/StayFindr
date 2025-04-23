import { useDeleteVenue } from '../../hooks/useDeleteVenue.ts';

export default function DeleteVenueButton({ venueId }: { venueId: string }) {
	const { deleteVenue, isDeleting } = useDeleteVenue({
		onError: (msg) => alert(msg),
	});

	const handleDelete = async () => {
		if (!confirm('Are you sure you want to delete this venue?')) return;

		const success = await deleteVenue(venueId);
		if (success) {
			window.location.reload();
		}
	};

	return (
		<button onClick={handleDelete} className="text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
			{isDeleting ? 'Deleting...' : 'Delete'}
		</button>
	);
}
