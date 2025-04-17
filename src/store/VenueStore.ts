import { create } from 'zustand';
import axios from 'axios';
import { Venues, VenueListResponse } from '../types/venues';
import { ENDPOINTS } from '../constants.ts';

type FetchVenueParams = {
	page?: number;
	limit?: number;
	sort?: string;
	sortOrder?: 'asc' | 'desc';
	query?: string;
};

type VenueStore = {
	venues: Venues[];
	isLoading: boolean;
	error: string | null;
	meta: VenueListResponse['meta'] | null;
	currentPage: number;
	currentSort: string;
	currentSortOrder: 'asc' | 'desc';
	currentQuery: string;
	fetchVenues: (params?: FetchVenueParams) => Promise<void>;
	setPage: (page: number) => void;
	setSort: (sort: string, sortOrder?: 'asc' | 'desc') => void;
	setQuery: (query: string) => void;
	singleVenue: Venues | null;
	isSingleVenueLoading: boolean;
	singleVenueError: string | null;
	fetchSingleVenue: (venueId: string) => Promise<void>;
};

export const useVenueStore = create<VenueStore>((set, get) => ({
	venues: [],
	isLoading: false,
	error: null,
	meta: null,
	currentPage: 1,
	currentSort: 'created',
	currentSortOrder: 'desc',
	currentQuery: '',
	singleVenue: null,
	isSingleVenueLoading: false,
	singleVenueError: null,

	fetchVenues: async (params: FetchVenueParams = {}) => {
		set({isLoading: true, error: null});

		const {
			sort = get().currentSort,
			sortOrder = get().currentSortOrder,
			page = get().currentPage,
			limit = 12,
			query = get().currentQuery,
		} = params;

		const isSearching = query && query.trim() !== '';
		const endpoint = isSearching ? `${ENDPOINTS.venues}/search?_bookings=true` : `${ENDPOINTS.venues}?_bookings=true`;

		const requestParams: Record<string, string | number> = isSearching
			? {q: query}
			: {limit, sort, sortOrder, page};

		try {
			const response = await axios.get<VenueListResponse>(endpoint, {
				params: requestParams,
			});

			const { data, meta } = response.data;

			set({
				venues: data,
				meta,
				currentPage: page,
				currentSort: sort,
				currentSortOrder: sortOrder,
				currentQuery: query,
				isLoading: false,
			});

		} catch (error: unknown) {
			console.error('API error:', error);
			set({
				error: 'Failed to fetch venues',
				isLoading: false,
			});
		}
	},

	setPage: (page: number) => {
		const {currentSort, currentSortOrder, currentQuery} = get();
		get().fetchVenues({sort: currentSort, sortOrder: currentSortOrder, page, query: currentQuery});
	},

	setSort: (sort: string, sortOrder: 'asc' | 'desc' = 'desc') => {
		set({ currentSort: sort, currentSortOrder: sortOrder });
	},


	setQuery: (query: string) => {
		set({currentQuery: query});
	},

	fetchSingleVenue: async (venueId: string) => {
		set({isSingleVenueLoading: true, singleVenueError: null});

		try {
			const params = new URLSearchParams({
				_owner: 'true',
				_bookings: 'true',
			});
			const response = await axios.get<{ data: Venues }>(
				`${ENDPOINTS.venues}/${venueId}?${params.toString()}`
			);

			set({
				singleVenue: response.data.data,
				isSingleVenueLoading: false,
			});
		} catch (error) {
			console.error('Failed to fetch single venue', error);
			set({
				singleVenueError: 'Failed to load venue',
				isSingleVenueLoading: false,
			});
		}
	},
}));
