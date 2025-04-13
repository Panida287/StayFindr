import { useCreateBooking } from './useCreateBooking';
import { useCallback } from 'react';

export function useHandleBooking(venueId: string | undefined) {
	const {
		createBooking,
		isLoading: isBookingLoading,
		error: bookingError,
		success,
	} = useCreateBooking();

	const handleBooking = useCallback(
		async (startDate: Date | null, endDate: Date | null, guests: number) => {
			if (!venueId || !startDate || !endDate || !guests) return;

			const userToken = localStorage.getItem('SFToken');
			if (!userToken) {
				console.error('No auth token found');
				return;
			}

			const payload: {
				dateFrom: string;
				dateTo: string;
				guests: number;
				venueId: string;
			} = {
				dateFrom: startDate.toISOString(),
				dateTo: endDate.toISOString(),
				guests,
				venueId,
			};

			try {
				await createBooking(payload, userToken);
			} catch (err) {
				console.error('Booking failed:', err);
			}
		},
		[venueId, createBooking]
	);

	return {
		handleBooking,
		isBookingLoading,
		bookingError,
		success,
	};
}
