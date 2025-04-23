import { useState } from 'react';
import axios from 'axios';
import { API_KEY, ENDPOINTS } from '../constants';

type Props = {
	onError?: (message: string) => void;
};

export function useDeleteVenue({ onError }: Props = {}) {
	const [isDeleting, setIsDeleting] = useState(false);

	async function deleteVenue(id: string): Promise<boolean> {
		try {
			setIsDeleting(true);
			const token = localStorage.getItem('SFToken');

			await axios.delete(`${ENDPOINTS.venues}/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
					'X-Noroff-API-Key': API_KEY,
				},
			});

			return true;
		} catch (error: unknown) {
			console.error(error);
			if (axios.isAxiosError(error)) {
				const message = error.response?.data?.errors?.[0]?.message || 'Failed to delete venue.';
				if (onError) onError(message);
			} else {
				if (onError) onError('An unknown error occurred.');
			}
			return false;
		} finally {
			setIsDeleting(false);
		}
	}

	return { deleteVenue, isDeleting };
}
