import { useState } from 'react';
import axios from 'axios';
import { API_KEY, ENDPOINTS } from '../constants';
import { VenueFormValues } from '../types/forms';

type Props = {
	onError?: (message: string) => void;
};

export function useUpdateVenue({ onError }: Props = {}) {
	const [isUpdating, setIsUpdating] = useState(false);

	async function updateVenue(id: string, data: VenueFormValues): Promise<boolean> {
		setIsUpdating(true);
		try {
			const token = localStorage.getItem('SFToken');
			await axios.put(
				`${ENDPOINTS.venues}/${id}`,
				data,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'X-Noroff-API-Key': API_KEY,
					},
				}
			);
			return true;
		} catch (err: unknown) {
			let message = 'An unknown error occurred.';
			if (axios.isAxiosError(err)) {
				message = err.response?.data?.errors?.[0]?.message || err.message;
			}
			console.error('Update venue error:', message);
			onError?.(message);
			return false;
		} finally {
			setIsUpdating(false);
		}
	}

	return { updateVenue, isUpdating };
}
