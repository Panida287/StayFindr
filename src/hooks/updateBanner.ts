import axios from 'axios';
import { API_KEY, ENDPOINTS } from '../constants.ts';

export async function updateBanner(
	name: string,
	banner: { url: string; alt: string }
) {
	const token = localStorage.getItem('SFToken');

	try {
		const response = await axios.put(
			`${ENDPOINTS.profiles}/${name}`,
			{ banner },
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'X-Noroff-API-Key': API_KEY,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error('Failed to update banner:', error);
		throw error;
	}
}
