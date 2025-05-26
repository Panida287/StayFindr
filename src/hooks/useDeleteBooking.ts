import { useState } from 'react';
import axios from 'axios';
import { ENDPOINTS, API_KEY } from '../constants.ts';

export default function useDeleteBooking() {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const deleteBooking = async (id: string): Promise<boolean> => {
		setLoading(true);
		setError(null);

		const token = localStorage.getItem('SFToken');

		try {
			await axios.delete(`${ENDPOINTS.bookings}/${id}`, {
				headers: {
					Authorization: `Bearer ${token}`,
					'X-Noroff-API-Key': API_KEY,
				},
			});
			return true;
		} catch (err: unknown) {
			const message = axios.isAxiosError(err)
				? err.response?.data?.errors?.[0]?.message || err.message
				: 'Something went wrong.';
			console.error('Delete booking error:', message);
			setError(message);
			return false;
		} finally {
			setLoading(false);
		}
	};

	return { deleteBooking, loading, error };
}
