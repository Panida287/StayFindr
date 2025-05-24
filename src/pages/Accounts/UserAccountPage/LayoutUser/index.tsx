import { Outlet } from 'react-router-dom';
import ProfileHeader from '../../../../components/accounts/Profile.tsx';
import { useFetchProfile } from '../../../../hooks/useFetchProfile.ts';
import UserProfileTabs from '../../../../components/accounts/UserProfileTabs.tsx';
import EditAvatarModal from '../../../../components/accounts/EditAvatarModal.tsx';
import { useState } from 'react';

export default function LayoutUser() {
	const { profile, isLoading, error } = useFetchProfile();
	const [isModalOpen, setIsModalOpen] = useState(false);

	if (isLoading) return <p>Loading profile...</p>;
	if (error) return <p>Error: {error}</p>;
	if (!profile) return <p>No profile found</p>;

	return (
		<div className="max-w-4xl mx-auto p-4 space-y-6 mt-20">
			<div className="w-full bg-white/60 rounded-xl p-4">
				<ProfileHeader profile={profile} />
			</div>
			<div
				className="flex flex-col justify-center items-center sm:grid sm:grid-cols-[1fr_2fr] sm:items-start sm:gap-4">
				<UserProfileTabs/>
				<Outlet />
			</div>

			{isModalOpen && <EditAvatarModal onClose={() => setIsModalOpen(false)} />}

		</div>
	);
}
