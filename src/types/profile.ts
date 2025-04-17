import { Venue, Booking } from './venues';

export type Profile = {
	name: string;
	email: string;
	bio: string;
	avatar: {
		url: string;
		alt: string;
	};
	banner: {
		url: string;
		alt: string;
	};
	venueManager: boolean;
	venues: Venue[];
	bookings: Booking[];
	_count: {
		venues: number;
		bookings: number;
	};
};

export type ProfileResponse = {
	data: Profile;
	meta: Record<string, unknown>;
};
