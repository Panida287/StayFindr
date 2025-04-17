import { useEffect } from 'react';
import { useProfileStore } from '../store/ProfileStore';

export const useFetchVenuesByProfile = () => {
	const profile = useProfileStore((state) => state.profile);
	const myVenues = useProfileStore((state) => state.myVenues);
	const isLoading = useProfileStore((state) => state.isLoading);
	const error = useProfileStore((state) => state.error);
	const fetchVenuesByProfile = useProfileStore((state) => state.fetchVenuesByProfile);

	useEffect(() => {
		fetchVenuesByProfile();
	}, [fetchVenuesByProfile]);

	const bookings = profile?.bookings || [];

	return {
		venues: myVenues,
		bookings,
		isLoading,
		error,
	};
};
