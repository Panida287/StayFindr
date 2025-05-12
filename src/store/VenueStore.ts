import { create } from 'zustand';
import axios from 'axios';
import { Venue, VenueListResponse } from '../types/venues';
import { ENDPOINTS } from '../constants';

type Amenities = {
	wifi: boolean;
	parking: boolean;
	breakfast: boolean;
	pets: boolean;
};

type FetchVenueParams = {
	query?: string;
	sort?: string;
	sortOrder?: 'asc' | 'desc';
	page?: number;
	limit?: number;
	guests?: number;
	dateFrom?: string;
	dateTo?: string;
	amenities?: Amenities;
};

type VenueStore = {
	venues: Venue[];
	isLoading: boolean;
	error: string | null;
	meta: {
		pageCount: number;
		limit: number;
		totalCount: number;
	};
	allFilteredVenues: Venue[];
	currentPage: number;
	currentSort: string;
	currentSortOrder: 'asc' | 'desc';
	currentQuery: string;
	currentGuests?: number;
	currentDateFrom?: string;
	currentDateTo?: string;
	currentAmenities?: Amenities;
	fetchVenues: (params?: FetchVenueParams) => Promise<void>;
	setPage: (page: number) => void;
	setSort: (sort: string, sortOrder?: 'asc' | 'desc') => void;
	setQuery: (query: string) => void;

	singleVenue: Venue | null;
	isSingleVenueLoading: boolean;
	singleVenueError: string | null;
	fetchSingleVenue: (venueId: string) => Promise<void>;
	removeVenue: (venueId: string) => void;
};

export const useVenueStore = create<VenueStore>((set, get) => ({
	venues: [],
	isLoading: false,
	error: null,
	meta: { pageCount: 1, limit: 12, totalCount: 0 },
	allFilteredVenues: [],
	currentPage: 1,
	currentSort: 'created',
	currentSortOrder: 'desc',
	currentQuery: '',
	currentGuests: undefined,
	currentDateFrom: undefined,
	currentDateTo: undefined,
	currentAmenities: undefined,
	singleVenue: null,
	isSingleVenueLoading: false,
	singleVenueError: null,

	fetchVenues: async (params: FetchVenueParams = {}) => {
		set({ isLoading: true, error: null });

		const {
			sort = get().currentSort,
			sortOrder = get().currentSortOrder,
			page = 1,
			limit = 12,
			query = get().currentQuery,
			guests = get().currentGuests,
			dateFrom = get().currentDateFrom,
			dateTo = get().currentDateTo,
			amenities = get().currentAmenities,
		} = params;

		set({
			currentPage: page,
			currentSort: sort,
			currentSortOrder: sortOrder,
			currentQuery: query,
			currentGuests: guests,
			currentDateFrom: dateFrom,
			currentDateTo: dateTo,
			currentAmenities: amenities,
		});

		const isSearching = query && query.trim() !== '';
		const endpoint = isSearching
			? `${ENDPOINTS.venues}/search?_bookings=true`
			: `${ENDPOINTS.venues}?_bookings=true`;

		try {
			const response = await axios.get<VenueListResponse>(endpoint, {
				params: {
					q: query,
					sort: 'created', // server sort disabled, sorting is client-side
					sortOrder: 'desc',
					limit: 100,
				},
			});

			let data = response.data.data;

			if (guests) {
				data = data.filter((v) => v.maxGuests >= guests);
			}

			if (dateFrom && dateTo) {
				const from = new Date(dateFrom);
				const to = new Date(dateTo);
				data = data.map((venue) => {
					const hasOverlap = venue.bookings?.some((b) => {
						const bFrom = new Date(b.dateFrom);
						const bTo = new Date(b.dateTo);
						return from <= bTo && to >= bFrom;
					});
					return { ...venue, isUnavailable: hasOverlap };
				});
			}

			if (amenities) {
				data = data.filter((venue) =>
					Object.entries(amenities).every(([key, required]) =>
						!required || venue.meta[key as keyof Amenities]
					)
				);
			}

			// Client-side sort
			const sorted = [...data].sort((a, b) => {
				if (sort === 'price') {
					return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
				}
				if (sort === 'rating') {
					return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
				}
				return 0;
			});

			const total = sorted.length;
			const start = (page - 1) * limit;
			const paginated = sorted.slice(start, start + limit);
			const pageCount = Math.ceil(total / limit);

			set({
				allFilteredVenues: sorted,
				venues: paginated,
				meta: { limit, totalCount: total, pageCount },
				isLoading: false,
			});
		} catch (error) {
			console.error('API error:', error);
			set({ error: 'Failed to fetch venues', isLoading: false });
		}
	},

	setPage: (page: number) => {
		const { allFilteredVenues, meta } = get();
		const start = (page - 1) * meta.limit;
		const paginated = allFilteredVenues.slice(start, start + meta.limit);

		set({
			currentPage: page,
			venues: paginated,
		});
	},

	setSort: (sort: string, sortOrder: 'asc' | 'desc' = 'desc') => {
		const { allFilteredVenues, meta } = get();
		const sorted = [...allFilteredVenues].sort((a, b) => {
			if (sort === 'price') return sortOrder === 'asc' ? a.price - b.price : b.price - a.price;
			if (sort === 'rating') return sortOrder === 'asc' ? a.rating - b.rating : b.rating - a.rating;
			return 0;
		});
		const paginated = sorted.slice(0, meta.limit);
		const pageCount = Math.ceil(sorted.length / meta.limit);

		set({
			currentSort: sort,
			currentSortOrder: sortOrder,
			currentPage: 1,
			allFilteredVenues: sorted,
			venues: paginated,
			meta: {
				limit: meta.limit,
				pageCount,
				totalCount: sorted.length,
			},
		});
	},

	setQuery: (query: string) => set({ currentQuery: query }),

	fetchSingleVenue: async (venueId: string) => {
		set({ isSingleVenueLoading: true, singleVenueError: null });

		try {
			const response = await axios.get<{ data: Venue }>(
				`${ENDPOINTS.venues}/${venueId}?_owner=true&_bookings=true`
			);
			set({ singleVenue: response.data.data, isSingleVenueLoading: false });
		} catch (error) {
			console.error('Failed to fetch single venue', error);
			set({
				singleVenueError: 'Failed to load venue',
				isSingleVenueLoading: false,
			});
		}
	},

	removeVenue: (venueId: string) => {
		set((state) => ({
			venues: state.venues.filter((v) => v.id !== venueId),
			allFilteredVenues: state.allFilteredVenues.filter((v) => v.id !== venueId),
		}));
	},
}));
