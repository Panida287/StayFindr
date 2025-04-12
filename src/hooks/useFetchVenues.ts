import { useEffect } from 'react';
import { useVenueStore } from '../store/VenueStore.ts';

export const useFetchVenues = () => {
	const {
		venues,
		isLoading,
		error,
		meta,
		currentPage,
		currentQuery,
		fetchVenues,
		setPage,
		setSort,
		setQuery,
	} = useVenueStore();

	useEffect(() => {
		fetchVenues();
	}, [fetchVenues]);

	return {
		venues,
		isLoading,
		error,
		meta,
		currentPage,
		setPage,
		setSort,
		query: currentQuery,
		setQuery,
		fetchVenues,
	};
};
