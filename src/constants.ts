export const API_BASE_URL = "https://v2.api.noroff.dev";

export const ENDPOINTS = {
	venues: `${API_BASE_URL}/holidaze/venues`,
	bookings: `${API_BASE_URL}/holidaze/bookings`,
	profiles: `${API_BASE_URL}/holidaze/profiles`,
	login: `${API_BASE_URL}/auth/login?_holidaze=true`,
	register: `${API_BASE_URL}/auth/register`,
};

export const FALLBACK = {
	// Noroff Oslo address
	lat: 59.9300048872585,
	lng: 10.755947969218308,
	name: 'John Smith',
	email: 'johnsmith@gmail.com',
	bio: 'I love warm hugs',
	avatar: '/assets/images/fallbackImages/fallbackAvatar.jpg',
	banner: '/assets/images/fallbackImages/fallbackBanner.jpg',
	venue: '/assets/images/fallbackImages/fallbackVenue.jpg',
	city: 'Unknown City',
	country: 'Unknown Country',
}

export const API_KEY = import.meta.env.VITE_API_KEY;