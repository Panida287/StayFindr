import { create } from 'zustand';
import axios, { AxiosError } from 'axios';
import { Profile } from '../types/profile';
import { Venue } from '../types/venues.ts';
import { ENDPOINTS, API_KEY } from '../constants.ts';

type ProfileStore = {
	profile: Profile | null;
	isLoading: boolean;
	error: string | null;
	myVenues: Venue[];
	fetchProfile: () => Promise<void>;
	fetchVenuesByProfile: () => Promise<void>;
};

export const useProfileStore = create<ProfileStore>((set) => ({
	profile: null,
	isLoading: false,
	error: null,
	myVenues: [],

	fetchProfile: async () => {
		const username = localStorage.getItem('SFUsername');
		const token = localStorage.getItem('SFToken');

		if (!username) {
			set({ error: 'Username not found', isLoading: false });
			return;
		}

		set({ isLoading: true, error: null });

		try {
			const response = await axios.get(
				`${ENDPOINTS.profiles}/${username}?_bookings=true&_venues=true`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'X-Noroff-API-Key': API_KEY,
					},
				}
			);

			console.log('profile:', response.data);
			set({ profile: response.data.data, isLoading: false });
		} catch (error) {
			const axiosError = error as AxiosError<{ message: string }>;
			set({
				error: axiosError.response?.data?.message || 'Failed to fetch profile',
				isLoading: false,
			});
		}
	},

	fetchVenuesByProfile: async () => {
		const username = localStorage.getItem('SFUsername');
		const token = localStorage.getItem('SFToken');

		if (!username) {
			set({ error: 'Username not found' });
			return;
		}

		try {
			const response = await axios.get(
				`${ENDPOINTS.profiles}/${username}/venues?_venues=true&_bookings=true`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						'X-Noroff-API-Key': API_KEY,
					},
				}
			);

			console.log('venues by profile:', response.data);
			set({ myVenues: response.data.data });
		} catch (error) {
			const axiosError = error as AxiosError<{ message: string }>;
			set({
				error: axiosError.response?.data?.message || 'Failed to fetch venues by profile',
			});
		}
	},
}));
