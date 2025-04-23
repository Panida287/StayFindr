import { useState } from 'react';
import axios from 'axios';
import { API_KEY, ENDPOINTS } from '../constants';
import { VenueFormValues } from '../types/forms.ts';

type Props = {
	onError?: (error: string) => void;
};

export function useCreateVenue({ onError }: Props = {}) {
	const [isLoading, setIsLoading] = useState(false);

	async function createVenue(data: VenueFormValues): Promise<boolean> {
		try {
			setIsLoading(true);
			const token = localStorage.getItem('SFToken');
			await axios.post(ENDPOINTS.venues, data, {
				headers: {
					Authorization: `Bearer ${token}`,
					'X-Noroff-API-Key': API_KEY,
				},
			});
			return true;
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				const message = error.response?.data?.errors?.[0]?.message || 'Failed to create venue.';
				if (onError) onError(message);
			} else {
				if (onError) onError('An unknown error occurred.');
			}
			return false;
		}
		finally {
			setIsLoading(false);
		}
	}

	return { createVenue, isLoading };
}
