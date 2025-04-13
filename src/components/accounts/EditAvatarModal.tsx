import { useState } from 'react';
import { updateAvatar } from '../../hooks/updateAvatar.ts';
import { useFetchProfile } from '../../hooks/useFetchProfile.ts';
import type { AxiosError } from 'axios';

type Props = {
	onClose: () => void;
};

export default function EditAvatarModal({ onClose }: Props) {
	const { profile, fetchProfile } = useFetchProfile();
	const [url, setUrl] = useState('');
	const [alt, setAlt] = useState('');
	const [loading, setLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const handleSave = async () => {
		if (!profile?.name) return;

		setLoading(true);
		setErrorMessage('');

		try {
			await updateAvatar(profile.name, { url, alt });
			await fetchProfile();
			onClose();
		} catch (err) {
			const error = err as AxiosError<{ errors?: { message: string }[] }>;
			setErrorMessage(error.response?.data?.errors?.[0]?.message || 'Something went wrong.');
			console.error('Avatar update error:', error.response?.data || error);
		}
		finally {
			setLoading(false);
		}
	};

	return (
		<>
			{/* Overlay */}
			<div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />

			{/* Modal */}
			<div className="fixed inset-0 z-50 flex items-center justify-center">
				<div className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm relative">
					<h2 className="text-lg font-bold mb-4">Edit Avatar</h2>

					{/* Error Message */}
					{errorMessage && (
						<div className="mb-4 p-2 text-sm text-red-700 bg-red-100 rounded">
							{errorMessage}
						</div>
					)}

					<label className="block text-sm font-medium">Image URL</label>
					<input
						type="text"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
						className="w-full mt-1 mb-3 p-2 border rounded"
						placeholder="https://example.com/image.jpg"
					/>

					<label className="block text-sm font-medium">Alt Text</label>
					<input
						type="text"
						value={alt}
						onChange={(e) => setAlt(e.target.value)}
						className="w-full mt-1 mb-3 p-2 border rounded"
						placeholder="Your avatar description"
					/>

					{/* Preview */}
					{url && (
						<div className="flex justify-center mt-4">
							<img
								src={url}
								alt={alt || 'Avatar preview'}
								className="w-20 h-20 rounded-full object-cover border"
							/>
						</div>
					)}

					{/* Buttons */}
					<div className="mt-6 flex justify-end gap-2">
						<button
							onClick={onClose}
							className="px-4 py-1 bg-gray-200 rounded hover:bg-gray-300"
							disabled={loading}
						>
							Cancel
						</button>
						<button
							onClick={handleSave}
							className="px-4 py-1 bg-primary text-white rounded hover:bg-primary-dark"
							disabled={loading || !url}
						>
							{loading ? 'Saving...' : 'Save'}
						</button>
					</div>
				</div>
			</div>
		</>
	);
}
