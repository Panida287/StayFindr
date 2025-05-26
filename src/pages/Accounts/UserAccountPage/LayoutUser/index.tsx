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
		<div className="max-w-5xl mx-auto mt-20">
			<div className="w-full rounded-xl py-4">
				<ProfileHeader profile={profile} />
			</div>
			<div
				className="flex flex-col mt-4 justify-center items-center sm:grid sm:grid-cols-[1fr_2fr] sm:items-start sm:gap-4">
				<UserProfileTabs/>
				<Outlet />
			</div>

			{isModalOpen && <EditAvatarModal onClose={() => setIsModalOpen(false)} />}

		</div>
	);
}
