import { useState } from 'react';
import { useFetchProfile } from '../../../hooks/useFetchProfile.ts';
import EditAvatarModal from '../../../components/accounts/EditAvatarModal.tsx';
import UserUpcomingBookings from '../../../components/accounts/UserUpcomingBookings.tsx';

export default function UserAccountPage() {
	const {profile, fetchProfile} = useFetchProfile();

	const [isModalOpen, setIsModalOpen] = useState(false);

	if (!profile) return <p>Loading profile...</p>;

	return (
		<div>
			<UserUpcomingBookings
					bookings={profile.bookings}
					refreshBookings={fetchProfile}
			/>

			{isModalOpen && <EditAvatarModal onClose={() => setIsModalOpen(false)} />}
		</div>
	);
}
