import { create } from 'zustand';
import axios from 'axios';
import { Venue, VenueListResponse } from '../types/venues';
import { ENDPOINTS } from '../constants.ts';

type FetchVenueParams = {
	page?: number;
	limit?: number;
	sort?: string;
	sortOrder?: 'asc' | 'desc';
	query?: string;
};

type VenueStore = {
	venues: Venue[];
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

	fetchVenues: async (params: FetchVenueParams = {}) => {
		set({ isLoading: true, error: null });

		const {
			sort = get().currentSort,
			sortOrder = get().currentSortOrder,
			page = get().currentPage,
			limit = 12,
			query = get().currentQuery,
		} = params;

		const isSearching = query.trim() !== '';
		const endpoint = isSearching ? `${ENDPOINTS.venues}/search` : ENDPOINTS.venues;

		const requestParams = isSearching
			? { q: query }
			: { limit, sort, sortOrder, page };

		try {
			const response = await axios.get(endpoint, { params: requestParams });

			const isWrapped = 'data' in response.data;
			const data = isWrapped ? response.data.data : response.data;
			const meta = isWrapped ? response.data.meta ?? null : null;
			const venues = Array.isArray(data) ? data : [];

			set({
				venues,
				meta,
				currentPage: page,
				currentSort: sort,
				currentSortOrder: sortOrder,
				currentQuery: query,
				isLoading: false,
			});
		} catch (error) {
			console.error('API error:', error);
			set({
				error: 'Failed to fetch venues',
				isLoading: false,
			});
		}
	},


	setPage: (page: number) => {
		const { currentSort, currentSortOrder, currentQuery } = get();
		get().fetchVenues({ sort: currentSort, sortOrder: currentSortOrder, page, query: currentQuery });
	},

	setSort: (sort: string, sortOrder: 'asc' | 'desc' = 'desc') => {
		const { currentPage, currentQuery } = get();
		get().fetchVenues({ sort, sortOrder, page: currentPage, query: currentQuery });
	},

	setQuery: (query: string) => {
		set({ currentQuery: query });
	},

}));
