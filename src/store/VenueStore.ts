import { create } from 'zustand';
import axios from 'axios';
import { Venue, VenueListResponse } from '../types/venues';
import { ENDPOINTS } from '../constants.ts';

type FetchVenueParams = {
	query?: string;
	sort?: string;
	sortOrder?: 'asc' | 'desc';
	page?: number;
	limit?: number;
	guests?: number;
	dateFrom?: string;
	dateTo?: string;
	amenities?: {
		wifi: boolean;
		parking: boolean;
		breakfast: boolean;
		pets: boolean;
	};
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
	meta: null,
	currentPage: 1,
	currentSort: 'created',
	currentSortOrder: 'desc',
	currentQuery: '',
	singleVenue: null,
	isSingleVenueLoading: false,
	singleVenueError: null,

	fetchVenues: async (params: FetchVenueParams = {}) => {
		set({ isLoading: true, error: null });

		const {
			sort = get().currentSort,
			sortOrder = get().currentSortOrder,
			page = get().currentPage,
			limit = 12,
			query = get().currentQuery,
			guests,
			dateFrom,
			dateTo,
			amenities,
		} = params;

		const isSearching = query && query.trim() !== '';
		const endpoint = isSearching
			? `${ENDPOINTS.venues}/search?_bookings=true`
			: `${ENDPOINTS.venues}?_bookings=true`;

		const requestParams: Record<string, string | number> = {
			q: query,
			sort,
			sortOrder,
			page,
			limit,
		};

		if (dateFrom) requestParams.dateFrom = dateFrom;
		if (dateTo) requestParams.dateTo = dateTo;

		try {
			const response = await axios.get<VenueListResponse>(endpoint, {
				params: requestParams,
			});

			const { data, meta } = response.data;

			// Step 1: Filter by guests
			let processedData = guests
				? data.filter((venue) => venue.maxGuests >= guests)
				: data;

			// Step 2: Mark isUnavailable based on booking overlap
			if (dateFrom && dateTo) {
				const from = new Date(dateFrom);
				const to = new Date(dateTo);

				processedData = processedData.map((venue) => {
					const hasOverlap = venue.bookings?.some((booking) => {
						const bookingFrom = new Date(booking.dateFrom);
						const bookingTo = new Date(booking.dateTo);
						return from <= bookingTo && to >= bookingFrom;
					});

					return {
						...venue,
						isUnavailable: hasOverlap,
					};
				});
			}

			if (amenities) {
				processedData = processedData.filter((venue) => {
					return Object.entries(amenities).every(([key, required]) => {
						if (!required) return true;
						return venue.meta[key as 'wifi' | 'parking' | 'breakfast' | 'pets'] === true;
					})
				});
			}

			set({
				venues: processedData,
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
		const { currentSort, currentSortOrder, currentQuery } = get();
		get().fetchVenues({
			sort: currentSort,
			sortOrder: currentSortOrder,
			page,
			query: currentQuery,
		});
	},

	setSort: (sort: string, sortOrder: 'asc' | 'desc' = 'desc') => {
		set({ currentSort: sort, currentSortOrder: sortOrder });
	},

	setQuery: (query: string) => {
		set({ currentQuery: query });
	},

	fetchSingleVenue: async (venueId: string) => {
		set({ isSingleVenueLoading: true, singleVenueError: null });

		try {
			const params = new URLSearchParams({
				_owner: 'true',
				_bookings: 'true',
			});
			const response = await axios.get<{ data: Venue }>(
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

	removeVenue: (venueId: string) => {
		set((state) => ({
			venues: state.venues.filter((venue) => venue.id !== venueId),
		}));
	},
}));
