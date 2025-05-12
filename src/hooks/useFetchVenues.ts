import { useVenueStore } from '../store/VenueStore';

export function useFetchVenues() {
	const {
		venues,
		isLoading,
		error,
		meta,
		currentPage,
		currentSort,
		currentSortOrder,
		setPage,
		setSort,
		fetchAllVenues,
		applyFilters,
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
		fetchAllVenues,
		applyFilters,
	};
}
