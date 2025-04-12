import { useState } from 'react';
import axios from 'axios';
import { ENDPOINTS } from '../constants.ts';

type BookingPayload = {
	dateFrom: string;
	dateTo: string;
	guests: number;
	venueId: string;
};

export function useCreateBooking() {
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	async function createBooking(payload: BookingPayload, token: string) {
		setIsLoading(true);
		setError(null);
		setSuccess(false);

		try {
			const response = await axios.post(
				ENDPOINTS.bookings,
				payload,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			setSuccess(true);
			return response.data;
		} catch (err: unknown) {
			if (axios.isAxiosError(err)) {
				setError(
					err.response?.data?.errors?.[0]?.message ||
					err.message ||
					'Booking failed'
				);
			} else {
				setError('An unknown error occurred during booking.');
			}
			throw err;
		} finally {
			setIsLoading(false);
		}
	}

	return { createBooking, isLoading, error, success };
}

