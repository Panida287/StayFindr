import { create } from 'zustand';
import axios from 'axios';
import { Venue, VenueListResponse } from '../types/venues';
import { ENDPOINTS } from '../constants.ts';

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
			page = get().currentPage,
			limit = 12,
			query = get().currentQuery,
			guests = get().currentGuests,
			dateFrom = get().currentDateFrom,
			dateTo = get().currentDateTo,
			amenities = get().currentAmenities,
		} = params;

		// Store filters for future page changes
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

		try {
			const isSearching = query && query.trim() !== '';
			const endpoint = isSearching
				? `${ENDPOINTS.venues}/search?_bookings=true`
				: `${ENDPOINTS.venues}?_bookings=true`;

			const response = await axios.get<VenueListResponse>(endpoint, {
				params: {
					q: query,
					sort,
					sortOrder,
					limit: 100, // fetch enough data to paginate manually
				},
			});

			let processedData = response.data.data;

			// Filter: guests
			if (guests) {
				processedData = processedData.filter((venue) => venue.maxGuests >= guests);
			}

			// Filter: date availability
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

			// Filter: amenities
			if (amenities) {
				processedData = processedData.filter((venue) =>
					Object.entries(amenities).every(([key, required]) => {
						if (!required) return true;
						return venue.meta[key as keyof Amenities] === true;
					})
				);
			}

			// Manual pagination
			const total = processedData.length;
			const startIndex = (page - 1) * limit;
			const endIndex = startIndex + limit;
			const paginatedData = processedData.slice(startIndex, endIndex);
			const pageCount = Math.ceil(total / limit);

			set({
				venues: paginatedData,
				meta: {
					pageCount,
					limit,
					totalCount: total,
				},
				isLoading: false,
			});
		} catch (error) {
			console.error('API error:', error);
			set({ error: 'Failed to fetch venues', isLoading: false });
		}
	},

	setPage: (page: number) => {
		get().fetchVenues({ page });
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
