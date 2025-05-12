import { useVenueStore } from '../store/VenueStore.ts';

export const useFetchVenues = () => {
	const {
		venues,
		isLoading,
		error,
		meta,
		currentPage,
		currentSort,
		currentSortOrder,
		currentQuery,
		fetchVenues,
		setPage,
		setSort,
		setQuery,
	} = useVenueStore();

	return {
		venues,
		isLoading,
		error,
		meta,
		currentPage,
		currentSort,
		currentSortOrder,
		setPage,
		setSort,
		query: currentQuery,
		setQuery,
		fetchVenues,
	};
};
