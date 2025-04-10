import { useEffect } from 'react';
import { useVenueStore } from '../store/VenueStore.ts';

export const useFetchVenues = () => {
	const { venues, isLoading, error, meta, currentPage, fetchVenues, setPage } = useVenueStore();

	useEffect(() => {
		fetchVenues();
	}, []);

	return { venues, isLoading, error, meta, currentPage, setPage };
};
