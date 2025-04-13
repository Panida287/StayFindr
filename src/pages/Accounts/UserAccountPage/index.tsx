import { useFetchProfile } from '../../../hooks/useFetchProfile.ts';
import { Link } from 'react-router-dom';
import MyBookingCard from '../../../components/bookings/MyBookingCard.tsx';

export default function UserAccountPage() {
	const {profile} = useFetchProfile();

	if (!profile) return <p>Loading profile...</p>;

	const {name, bio, avatar, venueManager, bookings} = profile;

	return (
		<div className="max-w-4xl mx-auto p-4 space-y-6">
			{/* Profile Section */}
			<div className="flex items-center gap-4">
				<img
					src={avatar?.url || '/assets/avatar-placeholder.png'}
					alt={name}
					className="w-20 h-20 rounded-full object-cover"
				/>
				<div>
					<h2 className="text-2xl font-bold">{name}</h2>
					<p className="text-gray-600">{venueManager ? 'Venue Manager' : 'Traveler'}</p>
					{bio && <p className="text-sm mt-1 text-gray-500">{bio}</p>}
					<Link
						to={`/edit-profile`}
						className="mt-2 px-4 py-1 bg-primary text-white rounded hover:bg-primary-dark"
					>
						Edit Profile
					</Link>

				</div>
			</div>

			{/* Bookings Section */}
			<div>
				<h3 className="text-xl font-semibold mb-4">Upcoming Bookings</h3>
				{bookings.length === 0 ? (
					<p className="text-gray-500">You have no upcoming bookings.</p>
				) : (
					<div className="grid gap-4">
						{profile.bookings.map((booking) => (
						<MyBookingCard key={booking.id} booking={booking} />
					))}

					</div>
				)}
			</div>
		</div>
	);
}
