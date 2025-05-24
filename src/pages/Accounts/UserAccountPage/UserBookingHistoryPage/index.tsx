import {useFetchProfile} from '../../../../hooks/useFetchProfile.ts';
import UserHistoryBookings from '../../../../components/accounts/UserHistoryBookings.tsx';

export default function UserBookingHistoryPage() {
	const {profile, fetchProfile} = useFetchProfile();
	if (!profile) return <p>Loading profile…</p>;

	return (
		<>
			<UserHistoryBookings 	bookings={profile.bookings}
			                        refreshBookings={fetchProfile}/>
		</>
	)
}