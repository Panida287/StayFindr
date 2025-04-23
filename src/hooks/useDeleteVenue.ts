import { useState } from 'react';
import axios from 'axios';
import { API_KEY, ENDPOINTS } from '../constants';
import { useVenueStore } from '../store/VenueStore.ts';

export function useDeleteVenue({ onError }: { onError?: (msg: string) => void }) {
	const [isDeleting, setIsDeleting] = useState(false);
	const removeVenue = useVenueStore((state) => state.removeVenue);

	const deleteVenue = async (id: string) => {
		try {
			setIsDeleting(true);
			const token = localStorage.getItem('SFToken');

			await axios.delete(`${ENDPOINTS.venues}/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
					'X-Noroff-API-Key': API_KEY,
				},
			});

			removeVenue(id);
			return true;
		} catch (error) {
			console.error('Delete error:', error);
			if (onError) onError('Failed to delete venue.');
			return false;
		} finally {
			setIsDeleting(false);
		}
	};

	return { deleteVenue, isDeleting };
}
