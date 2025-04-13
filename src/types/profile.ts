export type Profile = {
	name: string,
	email: string,
	bio: string,
	avatar: {
		url: string,
		alt: string,
	},
	banner: {
		url: string,
		alt: string,
	},
	VenueManager: boolean,
	Venues: {
		id: string,
		name: string,
		description: string,
		media: {
			url: string,
			alt: string,
		}[],
		price: number,
		maxGuests: number,
		rating: number,
		created: string,
		updated: string,
		meta: {
			wifi: boolean,
			parking: boolean,
			breakfast: boolean,
			pets: boolean,
		},
		location: {
			address: string,
			city: string,
			zip: string,
			country: string,
			continent: string,
			lat: number,
			lng: number,
		}
	}[],
	bookings: {
		id: string,
		dateFrom: string,
		dateTo: string,
		guests: number,
		created: string,
		updated: string,
		venue: {
			id: string,
			name: string,
			description: string,
			media: {
				url: string,
				alt: string,
			}[],
			price: number,
			maxGuests: number,
			rating: number,
			created: string,
			updated: string,
			meta: {
				wifi: boolean,
				parking: boolean,
				breakfast: boolean,
				pets: boolean,
			},
			location: {
				address: string,
				city: string,
				zip: string,
				country: string,
				continent: string,
				lat: number,
				lng: number,
			}
		}
	}[],
	_count: {
		venues: number,
		bookings: number,
	}
}