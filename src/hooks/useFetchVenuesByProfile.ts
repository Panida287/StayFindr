import { useEffect } from 'react';
import { useProfileStore } from '../store/ProfileStore.ts';

export const useFetchVenuesByProfile = () => {
	const {
		myVenues,
		isLoading,
		error,
		fetchVenuesByProfile,
	} = useProfileStore();

	useEffect(() => {
		fetchVenuesByProfile();
	}, [fetchVenuesByProfile]);

	return {
		venues: myVenues,
		isLoading,
		error,
	};
};
