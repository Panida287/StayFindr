import { useState } from 'react';
import axios from 'axios';
import { API_KEY, ENDPOINTS } from '../constants';
import { VenueFormValues } from '../types/forms.ts';

type UseCreateVenueOptions = {
	onError?: (errorMessage: string) => void;
};

export function useCreateVenue({ onError }: UseCreateVenueOptions = {}) {
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
		} catch (error: any) {
			console.error(error);
			const message =
				error?.response?.data?.errors?.[0]?.message || 'Something went wrong. Please check your input and try again.';
			onError?.(message);
			return false;
		} finally {
			setIsLoading(false);
		}
	}

	return { createVenue, isLoading };
}


