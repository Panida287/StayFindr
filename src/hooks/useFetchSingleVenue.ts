import { useEffect } from 'react';
import { useVenueStore } from '../store/VenueStore.ts';

export function useFetchSingleVenue(id: string) {
	const {
		singleVenue,
		isSingleVenueLoading,
		singleVenueError,
		fetchSingleVenue,
	} = useVenueStore();

	useEffect(() => {
		if (id) {
			fetchSingleVenue(id);
		}
	}, [id, fetchSingleVenue]);

	return {
		venue: singleVenue,
		isLoading: isSingleVenueLoading,
		error: singleVenueError,
	};
}
