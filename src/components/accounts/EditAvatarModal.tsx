import { useState } from 'react';
import { updateAvatar } from '../../hooks/updateAvatar';
import { useFetchProfile } from '../../hooks/useFetchProfile';
import type { AxiosError } from 'axios';
import { CommonButton } from '../commons/Buttons';
import Modal from '../commons/Modal';

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
			setErrorMessage(
				error.response?.data?.errors?.[0]?.message || 'Something went wrong.'
			);
			console.error('Avatar update error:', error.response?.data || error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<Modal isOpen={true} onClose={onClose}>
			<div className="space-y-4 w-full max-w-sm mx-auto">
				<h2 className="text-xl flex justify-center font-semibold">
					Edit Avatar
				</h2>

				{errorMessage && (
					<div className="p-2 text-sm text-red-700 bg-red-100 rounded">
						{errorMessage}
					</div>
				)}

				<label className="block text-sm font-medium">Image URL</label>
				<input
					type="text"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					className="w-full p-2 border rounded"
					placeholder="https://example.com/image.jpg"
					disabled={loading}
				/>

				<label className="block text-sm font-medium">Alt Text</label>
				<input
					type="text"
					value={alt}
					onChange={(e) => setAlt(e.target.value)}
					className="w-full p-2 border rounded"
					placeholder="Your avatar description"
					disabled={loading}
				/>

				{url && (
					<div className="flex justify-center mt-2">
						<img
							src={url}
							alt={alt || 'Avatar preview'}
							className="w-20 h-20 rounded-full object-cover border"
						/>
					</div>
				)}

				<div className="flex justify-between w-full mt-4">
					<CommonButton
						onClick={onClose}
						bgColor="bg-white"
						hoverColor="hover:bg-gray-100"
						textColor="text-primary"
						borderClass="border border-primary"
						disabled={loading}
					>
						Cancel
					</CommonButton>
					<CommonButton
						onClick={handleSave}
						bgColor="bg-primary"
						hoverColor="hover:bg-primary-dark"
						textColor="text-white"
						disabled={loading || !url}
					>
						{loading ? 'Saving...' : 'Save'}
					</CommonButton>
				</div>
			</div>
		</Modal>
	);
}
