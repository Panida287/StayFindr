import { create } from 'zustand';
import axios from 'axios';
import { Venue, VenueListResponse } from '../types/venues';

type FetchVenueParams = {
	page?: number;
	limit?: number;
	sort?: string;
	sortOrder?: 'asc' | 'desc';
};

type VenueStore = {
	venues: Venue[];
	isLoading: boolean;
	error: string | null;
	meta: VenueListResponse['meta'] | null;
	currentPage: number;
	currentSort: string;
	currentSortOrder: 'asc' | 'desc';
	fetchVenues: (params?: FetchVenueParams) => Promise<void>;
	setPage: (page: number) => void;
	setSort: (sort: string, sortOrder?: 'asc' | 'desc') => void;
};

export const useVenueStore = create<VenueStore>((set, get) => ({
	venues: [],
	isLoading: false,
	error: null,
	meta: null,
	currentPage: 1,
	currentSort: 'created',
	currentSortOrder: 'desc',

	fetchVenues: async (params: FetchVenueParams = {}) => {
		set({ isLoading: true, error: null });

		const {
			sort = get().currentSort,
			sortOrder = get().currentSortOrder,
			page = get().currentPage,
			limit = 12,
		} = params;

		try {
			const response = await axios.get<VenueListResponse>(
				'https://v2.api.noroff.dev/holidaze/venues',
				{
					params: {
						limit,
						sort,
						sortOrder,
						page,
					},
				}
			);

			set({
				venues: response.data.data,
				meta: response.data.meta,
				currentPage: page,
				currentSort: sort,
				currentSortOrder: sortOrder,
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
		const { currentSort, currentSortOrder } = get();
		get().fetchVenues({ sort: currentSort, sortOrder: currentSortOrder, page });
	},

	setSort: (sort: string, sortOrder: 'asc' | 'desc' = 'desc') => {
		const currentPage = get().currentPage || 1;
		get().fetchVenues({ sort, sortOrder, page: currentPage });
	},

}));
