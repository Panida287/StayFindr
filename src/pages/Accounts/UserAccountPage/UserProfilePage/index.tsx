import { useFetchProfile } from '../../../../hooks/useFetchProfile.ts';
import LoadingSpinner from '../../../../components/commons/LoadingSpinner.tsx';
import BioWithEdit from '../../../../components/accounts/BioWithEdit.tsx';
import UserReviewCard from '../../../../components/accounts/UserReviewCard.tsx';

const reviews = [
	{
		id: 1,
		venueName: 'Cozy Mountain Cabin',
		date: '2025-04-12',
		rating: 5,
		text: "Amazing stay—with the best views I've ever seen!",
	},
	{
		id: 2,
		venueName: 'Beachfront Bungalow',
		date: '2025-02-27',
		rating: 4,
		text: 'Great location but the Wi-Fi was a bit spotty.',
	},
	{
		id: 3,
		venueName: 'Urban Loft Apartment',
		date: '2024-12-08',
		rating: 5,
		text: 'Stylish, clean, and super central—loved it!',
	},
];

export default function UserProfilePage() {
	const { profile, isLoading, error } = useFetchProfile();

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-[500px] w-full">
				<LoadingSpinner size={64} colorClass="text-primary" />
			</div>
		);
	}

	if (error) {
		return (
			<p className="p-8 text-center text-red-600">
				Error loading profile: {error}
			</p>
		);
	}

	if (!profile) {
		return <p className="p-8 text-center">No profile data available.</p>;
	}

	return (
		<div>
			<h2 className="text-4xl mb-4">My Profile</h2>
			<div className="max-w-3xl mx-auto space-y-4">
				<div className="flex items-center gap-4 relative bg-white/60 rounded-lg p-4 shadow">
					<div>
						<p className="font-bold ">
							<i className="fa-solid fa-circle-user pr-2"></i>
							{profile.name}</p>
						<p className="text-gray-600">
							<i className="fa-solid fa-briefcase pr-2"></i>{profile.venueManager ? 'Venue Manager' : 'Traveler'}
						</p>
						<p className="text-sm text-gray-500">
							<i className="fa-solid fa-envelope pr-2"></i>
							{profile.email}</p>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 bg-white rounded-lg shadow">
						<p className="text-sm text-gray-500">Bookings Made</p>
						<p className="text-2xl font-bold">{profile._count.bookings}</p>
					</div>
					<div className="p-4 bg-white rounded-lg shadow">
						<p className="text-sm text-gray-500">Reviews Given</p>
						<p className="text-2xl font-bold">5</p>
					</div>
				</div>

				<BioWithEdit name={profile.name} initialBio={profile.bio} />

				<section>
					<h2 className="text-2xl font-semibold mb-4">My Reviews</h2>
					<div className="space-y-6">
						{reviews.map((r) => (
							<UserReviewCard key={r.id} review={r} />
						))}
					</div>
				</section>

			</div>
		</div>
	);
}
