import { useState } from 'react';
import EditAvatarModal from './EditAvatarModal';
import EditBannerModal from './EditBannerModal';
import { Profile } from '../../types/profile';
import { FALLBACK } from '../../constants';
import SafeImage from '../../utilities/SafeImage';

type ProfileHeaderProps = {
	/** User profile data including avatar, banner, and role */
	profile: Profile;
};

/**
 * Displays a profile header with editable avatar and banner, and role indicator.
 */
export default function ProfileHeader({ profile }: ProfileHeaderProps) {
	const [isAvatarModalOpen, setIsAvatarModalOpen] = useState(false);
	const [isBannerModalOpen, setIsBannerModalOpen] = useState(false);

	const { name, avatar, banner, venueManager } = profile;

	return (
		<>
			<div className="relative">
				<SafeImage
					src={banner?.url}
					alt={`${name}'s banner`}
					fallbackSrc={FALLBACK.banner}
					className="w-full h-64 object-cover rounded-xl"
				/>
				<button
					onClick={() => setIsBannerModalOpen(true)}
					aria-label="Edit banner"
					className="absolute bottom-2 z-10 right-2 text-md h-8 w-8 border border-gray-300 rounded-full flex justify-center items-center bg-gray-300/70 hover:scale-110 transition duration-200 ease-in-out"
				>
					<i className="fa-regular fa-camera" />
				</button>
			</div>

			<div className="relative flex items-center gap-4 -mt-10 pl-4">
				<div>
					<SafeImage
						src={avatar?.url}
						alt={`${name}'s avatar`}
						fallbackSrc={FALLBACK.avatar}
						className="w-20 h-20 rounded-full object-cover border-2 border-white"
					/>
					<button
						onClick={() => setIsAvatarModalOpen(true)}
						aria-label="Edit avatar"
						className="text-md h-7 w-7 border border-gray-300 rounded-full flex justify-center items-center relative top-4 -mt-10 text-primary bg-gray-300/70 hover:scale-110 transition duration-200 ease-in-out"
					>
						<i className="fa-regular fa-camera" />
					</button>
				</div>
			</div>

			<div className="relative -z-10 flex flex-col gap-2 justify-start w-full -mt-12 pl-24 pt-7 pb-4 bg-white rounded-b-xl shadow-md">
				<h1 className="text-2xl font-bold text-primary">{name}</h1>
				<p className="text-gray-500 italic">
					{venueManager ? 'Venue Manager' : 'Traveler'}
				</p>
			</div>

			{isAvatarModalOpen && (
				<EditAvatarModal onClose={() => setIsAvatarModalOpen(false)} />
			)}
			{isBannerModalOpen && (
				<EditBannerModal onClose={() => setIsBannerModalOpen(false)} />
			)}
		</>
	);
}
