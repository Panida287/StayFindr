// venues.ts

export type Venue = {
	id: string;
	name: string;
	description: string;
	media: {
		url: string;
		alt: string;
	}[];
	price: number;
	maxGuests: number;
	rating: number;
	created: string;
	updated: string;
	meta: {
		wifi: boolean;
		parking: boolean;
		breakfast: boolean;
		pets: boolean;
	};
	location: {
		address: string;
		city: string;
		zip: string;
		country: string;
		continent: string;
		lat: number;
		lng: number;
	};
};

export type VenueListResponse = {
	data: Venue[];
	meta: {
		isFirstPage: boolean;
		isLastPage: boolean;
		currentPage: number;
		previousPage: number | null;
		nextPage: number | null;
		pageCount: number;
		totalCount: number;
	};
};

export type SingleVenueResponse = {
	data: Venue;
	meta: Record<string, unknown>;
};
