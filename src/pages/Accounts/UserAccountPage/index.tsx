import { useState } from 'react';
import { useFetchProfile } from '../../../hooks/useFetchProfile.ts';
import MyBookingCard from '../../../components/bookings/MyBookingCard.tsx';
import EditAvatarModal from '../../../components/accounts/EditAvatarModal.tsx';
import ProfileHeader from '../../../components/accounts/Profile.tsx';

export default function UserAccountPage() {
	const { profile, fetchProfile } = useFetchProfile(); // ✅ Make sure this returns `fetchProfile`

	const [isModalOpen, setIsModalOpen] = useState(false);

	if (!profile) return <p>Loading profile...</p>;

	const { bookings } = profile;

	return (
		<div className="max-w-4xl mx-auto p-4 space-y-6">
			<ProfileHeader profile={profile} />

			<div className="my-bookings">
				<h3 className="text-xl font-semibold mb-4">Upcoming Bookings</h3>
				{bookings.length === 0 ? (
					<p className="text-gray-500">You have no upcoming bookings.</p>
				) : (
					<div className="grid gap-4">
						{bookings.map((b) => (
							<MyBookingCard key={b.id} booking={b} refreshBookings={fetchProfile} />
						))}
					</div>
				)}
			</div>

			{isModalOpen && <EditAvatarModal onClose={() => setIsModalOpen(false)} />}
		</div>
	);
}
