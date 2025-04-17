export const API_BASE_URL = "https://v2.api.noroff.dev";

export const ENDPOINTS = {
	venues: `${API_BASE_URL}/holidaze/venues`,
	bookings: `${API_BASE_URL}/holidaze/bookings`,
	profiles: `${API_BASE_URL}/holidaze/profiles`,
	login: `${API_BASE_URL}/auth/login`,
	register: `${API_BASE_URL}/auth/register`,
};

export const FALLBACK = {
	// Noroff Oslo address
	lat: 59.9300048872585,
	lng: 10.755947969218308,
	name: 'John Smith',
	email: 'johnsmith@gmail.com',
	bio: 'I love warm hugs',
	avatar: 'assets/images/fallback/fallbackAvatar.jpg',
	banner: 'assets/images/fallback/fallbackBanner.jpg',
	venue: 'assets/images/fallback/fallbackVenue.jpg',
}

export const API_KEY = "83d13e66-565f-4321-9216-c12e9fa8f030"