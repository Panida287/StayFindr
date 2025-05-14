import { useState } from 'react';
import axios from 'axios';
import { ENDPOINTS, API_KEY } from '../constants.ts';

export default function useUpdateGuests() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const updateGuests = async (bookingId: string, guests: number): Promise<boolean> => {
		setLoading(true);
		setError(null);

		const token = localStorage.getItem('SFToken'); // Consistent with your venue update

		try {
			await axios.put(
				`${ENDPOINTS.bookings}/${bookingId}`,
				{ guests },
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'X-Noroff-API-Key': API_KEY,
						'Content-Type': 'application/json',
					},
				}
			);

			return true;
		} catch (err: unknown) {
			let message = 'Something went wrong.';
			if (axios.isAxiosError(err)) {
				message = err.response?.data?.errors?.[0]?.message;
			}
			console.error('Booking update failed:', message);
			return false;
		} finally {
			setLoading(false);
		}
	};

	return { updateGuests, loading, error };
}
