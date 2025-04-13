import { useEffect } from 'react';
import { useProfileStore } from '../store/ProfileStore.ts';

export const useFetchProfile = () => {
	const { profile, isLoading, error, fetchProfile } = useProfileStore();

	useEffect(() => {
		const username = localStorage.getItem('SFUsername');

		if (username && !profile) {
			fetchProfile();
		}
	}, [fetchProfile, profile]);

	return { profile, isLoading, error, fetchProfile };
};
