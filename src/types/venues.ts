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
	bookings: Booking[];
	owner: Owner;
};

export type Booking = {
	id: string;
	dateFrom: string;
	dateTo: string;
	guests: number;
	customer: {
		name: string;
		email: string;
		bio: string;
		avatar: {
			url: string;
			alt: string;
		};
	};
	venue: Venue;
};

export type Owner = {
	name: string;
	email: string;
	bio: string;
	avatar: {
		url: string;
		alt: string;
	};
};

export type Meta = {
	isFirstPage: boolean;
	isLastPage: boolean;
	currentPage: number;
	previousPage: number | null;
	nextPage: number | null;
	pageCount: number;
	totalCount: number;
};


export type VenueListResponse = {
	data: Venue[];
	meta: Meta;
};
