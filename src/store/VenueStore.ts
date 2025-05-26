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
	guests?: number;
	dateFrom?: string;
	dateTo?: string;
	amenities?: Amenities;
};

type VenueStore = {
	allVenues: Venue[];
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
	currentQuery?: string;
	currentGuests?: number;
	currentDateFrom?: string;
	currentDateTo?: string;
	currentAmenities?: Amenities;

	fetchAllVenues: () => Promise<void>;
	applyFilters: (params?: FetchVenueParams) => void;
	setPage: (page: number) => void;
	setSort: (sort: string, sortOrder?: 'asc' | 'desc') => void;
	setQuery: (query: string) => void;

	singleVenue: Venue | null;
	isSingleVenueLoading: boolean;
	singleVenueError: string | null;
	fetchSingleVenue: (venueId: string) => Promise<void>;
	removeVenue: (venueId: string) => void;

	getTopVenues: () => Venue[];
};

export const useVenueStore = create<VenueStore>((set, get) => ({
	allVenues: [],
	venues: [],
	isLoading: false,
	error: null,
	meta: { pageCount: 1, limit: 12, totalCount: 0 },
	currentPage: 1,
	currentSort: 'created',
	currentSortOrder: 'desc',
	currentQuery: '',

	singleVenue: null,
	isSingleVenueLoading: false,
	singleVenueError: null,

	fetchAllVenues: async () => {
		set({ isLoading: true, error: null });
		try {
			let all: Venue[] = [];
			let page = 1;
			let totalPages = 1;

			while (page <= totalPages) {
				const response = await axios.get<VenueListResponse>(
					`${ENDPOINTS.venues}?_bookings=true`,
					{ params: { page, limit: 100 } }
				);
				all = [...all, ...response.data.data];
				totalPages = response.data.meta.pageCount;
				page++;
			}

			set({ allVenues: all, isLoading: false });

			const {
				currentQuery,
				currentSort,
				currentSortOrder,
				currentPage,
				currentGuests,
				currentDateFrom,
				currentDateTo,
				currentAmenities,
			} = get();

			get().applyFilters({
				query: currentQuery,
				sort: currentSort,
				sortOrder: currentSortOrder,
				page: currentPage,
				guests: currentGuests,
				dateFrom: currentDateFrom,
				dateTo: currentDateTo,
				amenities: currentAmenities,
			});
		} catch (error) {
			console.error('Failed to fetch all venues:', error);
			set({ error: 'Failed to load venues', isLoading: false });
		}
	},


	applyFilters: (params: FetchVenueParams = {}) => {
		const {
			query = get().currentQuery,
			sort = get().currentSort,
			sortOrder = get().currentSortOrder,
			page = get().currentPage,
			guests,
			dateFrom,
			dateTo,
			amenities,
		} = params;

		let filtered = [...get().allVenues];

		if (query?.trim()) {
			const q = query.toLowerCase();
			filtered = filtered.filter((venue) =>
				(venue.name?.toLowerCase().includes(q) ?? false) ||
				(venue.location?.city?.toLowerCase().includes(q) ?? false) ||
				(venue.location?.country?.toLowerCase().includes(q) ?? false)
			);
		}

		if (guests) {
			filtered = filtered.filter((v) => v.maxGuests >= guests);
		}

		if (dateFrom && dateTo) {
			const from = new Date(dateFrom);
			const to = new Date(dateTo);

			filtered = filtered.map((v) => {
				const overlap = v.bookings?.some(b => {
					const bFrom = new Date(b.dateFrom);
					const bTo = new Date(b.dateTo);
					return from <= bTo && to >= bFrom;
				});
				return { ...v, isUnavailable: overlap };
			});
		}

		if (amenities) {
			filtered = filtered.filter((venue) =>
				Object.entries(amenities).every(([key, val]) => {
					return !val || venue.meta?.[key as keyof Amenities] === true;
				})
			);
		}

		if (sort === 'price') {
			filtered.sort((a, b) => sortOrder === 'asc' ? a.price - b.price : b.price - a.price);
		} else if (sort === 'rating') {
			filtered.sort((a, b) => b.rating - a.rating);
		} else if (sort === 'bookings') {
			filtered.sort((a, b) => b.bookings.length - a.bookings.length);
		} else {
			filtered.sort((a, b) =>
				sortOrder === 'asc'
					? new Date(a.created).getTime() - new Date(b.created).getTime()
					: new Date(b.created).getTime() - new Date(a.created).getTime()
			);
		}

		const limit = 12;
		const total = filtered.length;
		const pageCount = Math.ceil(total / limit);
		const paginated = filtered.slice((page - 1) * limit, page * limit);

		set({
			venues: paginated,
			meta: { pageCount, limit, totalCount: total },
			currentPage: page,
			currentSort: sort,
			currentSortOrder: sortOrder,
			currentQuery: query,
			currentGuests: guests,
			currentDateFrom: dateFrom,
			currentDateTo: dateTo,
			currentAmenities: amenities,
		});
	},


	setPage: (page: number) => {
		get().applyFilters({ page });
	},

	setSort: (sort: string, sortOrder: 'asc' | 'desc' = 'desc') => {
		get().applyFilters({ sort, sortOrder, page: 1 });
	},

	setQuery: (query: string) => {
		set({ currentQuery: query });
	},

	fetchSingleVenue: async (venueId: string) => {
		set({ isSingleVenueLoading: true, singleVenueError: null });
		try {
			const response = await axios.get<{ data: Venue }>(
				`${ENDPOINTS.venues}/${venueId}?_owner=true&_bookings=true`
			);
			set({ singleVenue: response.data.data, isSingleVenueLoading: false });
		} catch (error) {
			console.error('Failed to fetch single venue:', error);
			set({ singleVenueError: 'Failed to load venue', isSingleVenueLoading: false });
		}
	},

	removeVenue: (venueId: string) => {
		set((state) => ({
			venues: state.venues.filter((venue) => venue.id !== venueId),
			allVenues: state.allVenues.filter((venue) => venue.id !== venueId),
		}));
	},

	getTopVenues: () => {
		const all = get().allVenues;
		return all
			.filter((venue) => Array.isArray(venue.bookings))
			.sort((a, b) => b.bookings.length - a.bookings.length)
			.slice(0, 5);
	},
}));
