import { create } from 'zustand';
import axios from 'axios';
import { Venue, VenueListResponse } from '../types/venues';

type VenueStore = {
	venues: Venue[];
	isLoading: boolean;
	error: string | null;
	fetchVenues: (params?: { _owner?: boolean; _bookings?: boolean }) => Promise<void>;
};

export const useVenueStore = create<VenueStore>((set) => ({
	venues: [],
	isLoading: false,
	error: null,

	fetchVenues: async (params = {}) => {
		set({ isLoading: true, error: null });

		try {
			const response = await axios.get<VenueListResponse>(
				'https://v2.api.noroff.dev/holidaze/venues',
				{
					params,
				}
			);

			const sortedVenues = response.data.data.sort((a, b) =>
				new Date(b.created).getTime() - new Date(a.created).getTime()
			);

			console.log('Number of venues fetched:', sortedVenues.length);
			console.log('📦 API meta:', response.data.meta);

			set({
				venues: sortedVenues,
				isLoading: false,
			});

		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				set({
					error: error.response?.data?.message || error.message || 'Something went wrong',
					isLoading: false,
				});
			} else {
				set({
					error: 'An unexpected error occurred',
					isLoading: false,
				});
			}
		}
	},
}));
