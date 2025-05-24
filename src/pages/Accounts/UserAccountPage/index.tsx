import { useState } from 'react';
import { useFetchProfile } from '../../../hooks/useFetchProfile.ts';
import MyBookingCard from '../../../components/bookings/MyBookingCard.tsx';
import EditAvatarModal from '../../../components/accounts/EditAvatarModal.tsx';
import ProfileHeader from '../../../components/accounts/Profile.tsx';
import { Booking } from '../../../types/venues.ts';

export default function UserAccountPage() {
	const {profile, fetchProfile} = useFetchProfile();

	const [isModalOpen, setIsModalOpen] = useState(false);

	if (!profile) return <p>Loading profile...</p>;

	const {bookings} = profile;

	const now = new Date();
	const upcomingBookings: Booking[] = bookings
		.filter(b => new Date(b.dateFrom) > now)
		.sort((a, b) =>
			new Date(a.dateFrom).getTime() - new Date(b.dateFrom).getTime()
		);

	return (
		<div className="max-w-4xl mx-auto p-4 space-y-6 mt-20">
			<div className="w-full bg-white/60 rounded-xl p-4">
				<ProfileHeader profile={profile} />
			</div>

			<div
				className="flex flex-col justify-center items-center md:grid md:grid-cols-[1fr_2fr] md:items-start md:gap-4">
				<div
					className="flex flex-col items-center justify-ceter w-full bg-white/60 rounded-lg mx-auto mb-4 md:mt-14 md:mb-0 md:items-start">
					<button
						className="flex text-primary justify-center items-center px-2 py-3 rounded-lg w-full font-heading md:justify-start hover:bg-background">
						<i className="fa-light fa-address-card pr-2"></i>
						About me
					</button>
					<span className="h-[1px] w-[90%] mx-auto bg-primary/30"></span>
					<button
						className="text-primary flex justify-center items-center px-2 py-3 rounded-lg w-full font-heading md:justify-start hover:bg-background">
						<i className="fa-light fa-clock-rotate-left pr-2"></i>
						Booking History
					</button>
				</div>
				<div className="my-bookings">
					<h2 className="text-4xl mb-4">Upcoming Bookings</h2>
					{upcomingBookings.length === 0 ? (
						<p className="text-gray-500">You have no upcoming bookings.</p>
					) : (
						<div className="grid gap-4">
							{upcomingBookings.map(b => (
								<MyBookingCard
									key={b.id}
									booking={b}
									refreshBookings={fetchProfile}
								/>
							))}
						</div>
					)}
				</div>
			</div>

			{isModalOpen && <EditAvatarModal onClose={() => setIsModalOpen(false)} />}
		</div>
	);
}
