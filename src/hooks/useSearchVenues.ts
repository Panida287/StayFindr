import { useState, useEffect } from 'react';
import axios from 'axios';
import { Venue, VenueListResponse } from '../types/venues';

export function useSearchVenues() {
	const [venues, setVenues] = useState<Venue[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [meta, setMeta] = useState<VenueListResponse['meta'] | null>(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [query, setQuery] = useState('');

	const fetchSearchResults = async ({
		                                  query,
		                                  page = 1,
		                                  limit = 12,
	                                  }: {
		query: string;
		page?: number;
		limit?: number;
	}) => {
		setIsLoading(true);
		setError(null);

		try {
			const response = await axios.get<VenueListResponse>(
				'https://v2.api.noroff.dev/holidaze/venues/search',
				{
					params: {
						q: query,
						page,
						limit,
					},
				}
			);

			setVenues(response.data.data);
			setMeta(response.data.meta);
			setCurrentPage(page);
		} catch (err) {
			console.error('Search API error:', err);
			setError('Failed to fetch search results');
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		if (!query) {
			setVenues([]);
			setMeta(null);
		}
	}, [query]);

	return {
		venues,
		isLoading,
		error,
		meta,
		currentPage,
		setQuery,
		query,
		triggerSearch: (searchTerm: string) => {
			if (searchTerm.trim()) {
				setQuery(searchTerm);
				fetchSearchResults({ query: searchTerm, page: 1 });
			}
		},

		setPage: (page: number) => {
			if (query.trim()) {
				fetchSearchResults({ query, page });
			}
		},
	};
}
