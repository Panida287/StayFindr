import { useEffect } from 'react';
import { useVenueStore } from '../store/VenueStore';

type FetchParams = {
	_owner?: boolean;
	_bookings?: boolean;
};

export function useFetchVenues(params?: FetchParams) {
	const { venues, fetchVenues, isLoading, error } = useVenueStore();

	const safeParams = params ?? {};
	const stringifiedParams = JSON.stringify(safeParams);

	useEffect(() => {
		fetchVenues(safeParams);
	}, [stringifiedParams, fetchVenues]);

	return { venues, isLoading, error };
}
