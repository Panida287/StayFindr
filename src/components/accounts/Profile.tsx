import { useState } from 'react';
import EditAvatarModal from './EditAvatarModal';
import { Profile } from '../../types/profile';

type ProfileHeaderProps = {
	profile: Profile;
};

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const { name, bio, avatar, venueManager } = profile;

	return (
		<div className="flex items-center gap-4 relative">
			<div>
				<img
					src={avatar?.url || '/assets/avatar-placeholder.png'}
					alt={name}
					className="w-20 h-20 rounded-full object-cover"
				/>
				<button
					onClick={() => setIsModalOpen(true)}
					className="text-md h-7 w-7 border border-gray-300 rounded-full flex justify-center items-center relative top-4 -mt-8 text-primary bg-gray-300/70 hover:scale-110 transition duration-200 ease-in-out"
				>
					<i className="fa-regular fa-camera"></i>
				</button>
			</div>

			<div>
			<h2 className="text-2xl font-bold">{name}</h2>
				<p className="text-gray-600">{venueManager ? 'Venue Manager' : 'Traveler'}</p>
				{bio && <p className="text-sm mt-1 text-gray-500">{bio}</p>}
			</div>

			{isModalOpen && <EditAvatarModal onClose={() => setIsModalOpen(false)} />}
		</div>
	);
}
