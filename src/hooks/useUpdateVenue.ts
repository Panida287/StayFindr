import { useState } from 'react';
import axios from 'axios';
import { API_KEY, ENDPOINTS } from '../constants';
import { VenueFormValues } from '../types/forms.ts';

type Props = {
	onError?: (message: string) => void;
};

export function useUpdateVenue({ onError }: Props = {}) {
	const [isUpdating, setIsUpdating] = useState(false);

	async function updateVenue(id: string, data: VenueFormValues): Promise<boolean> {
		try {
			setIsUpdating(true);
			const token = localStorage.getItem('SFToken');

			await axios.put(`${ENDPOINTS.venues}/${id}`, data, {
				headers: {
					Authorization: `Bearer ${token}`,
					'X-Noroff-API-Key': API_KEY,
				},
			});

			return true;
		} catch (error: unknown) {
			const msg =
				e.response?.data?.errors?.[0]?.message ||
				e.message ||
				'An error occurred';
			console.error(msg);
			onError?.(msg);
			return false;
		} finally {
			setIsUpdating(false);
		}
	}

	return { updateVenue, isUpdating };
}


