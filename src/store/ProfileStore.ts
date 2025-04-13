import { create } from 'zustand';
import axios, { AxiosError } from 'axios';
import { Profile } from '../types/profile';
import { ENDPOINTS, API_KEY } from '../constants.ts';

type ProfileStore = {
	profile: Profile | null;
	isLoading: boolean;
	error: string | null;
	fetchProfile: () => Promise<void>;
};

export const useProfileStore = create<ProfileStore>((set) => ({
	profile: null,
	isLoading: false,
	error: null,

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
			set({ profile: response.data.data, isLoading: false });
		} catch (error) {
			const axiosError = error as AxiosError<{ message: string }>;
			set({
				error: axiosError.response?.data?.message || 'Failed to fetch profile',
				isLoading: false,
			});
		}
	},
}));
