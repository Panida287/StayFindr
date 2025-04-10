import { create } from 'zustand';
import axios from 'axios';
import { Venue, VenueListResponse } from '../types/venues';

type VenueStore = {
	venues: Venue[];
	isLoading: boolean;
	error: string | null;
	meta: VenueListResponse['meta'] | null;
	currentPage: number;
	fetchVenues: (page?: number) => Promise<void>;
	setPage: (page: number) => void;
};

export const useVenueStore = create<VenueStore>((set, get) => ({
	venues: [],
	isLoading: false,
	error: null,
	meta: null,
	currentPage: 1,

	fetchVenues: async (page = 1) => {
		set({ isLoading: true, error: null });

		try {
			const response = await axios.get<VenueListResponse>(
				'https://v2.api.noroff.dev/holidaze/venues',
				{
					params: {
						limit: 12,
						page,
						sort: 'created',
						sortOrder: 'desc',
					},
				}
			);

			set({
				venues: response.data.data,
				meta: response.data.meta,
				currentPage: page,
				isLoading: false,
			});
		} catch (error: unknown) {
			console.error('API error:', error);
			set({
				error: 'Failed to fetch venues',
				isLoading: false,
			});
		}
	},

	setPage: (page) => {
		get().fetchVenues(page);
	},
}));
