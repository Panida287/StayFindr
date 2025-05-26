import axios from 'axios';
import { API_KEY, ENDPOINTS } from '../constants.ts';

export async function updateAvatar(name: string, avatar: { url: string; alt: string }) {
	const token = localStorage.getItem('SFToken');

	try {
		const response = await axios.put(
			`${ENDPOINTS.profiles}/${name}`,
			{ avatar },
			{
				headers: {
					Authorization: `Bearer ${token}`,
					'X-Noroff-API-Key': API_KEY,
				},
			}
		);
		return response.data;
	} catch (error) {
		console.error('Failed to update avatar:', error);
	}
}
