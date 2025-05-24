import { format } from 'date-fns';
import { Star } from 'lucide-react';
import { useFetchProfile } from '../../../../hooks/useFetchProfile.ts';

type Review = {
	id: number;
	venueName: string;
	date: string;
	rating: number;
	text: string;
};

export default function UserProfilePage() {
	const { profile, isLoading, error } = useFetchProfile();

	// Mock reviews to fill out the page
	const reviews: Review[] = [
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

	if (isLoading) {
		return <p className="p-8 text-center">Loading profile…</p>;
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
		<div className="space-y-8">
			<div className="max-w-3xl mx-auto p-4 space-y-6">
				{/* Header */}
				<div className="flex items-center gap-4 relative">
					{/* Avatar & camera button */}
					<div className="relative">
						<img
							src={profile.avatar.url || '/assets/avatar-placeholder.png'}
							alt={profile.name}
							className="w-20 h-20 rounded-full object-cover"
						/>
						<button
							className="absolute bottom-0 right-0 text-md h-7 w-7 border border-gray-300 rounded-full flex justify-center items-center text-primary bg-gray-300/70 hover:scale-110 transition duration-200 ease-in-out"
						>
							<i className="fa-regular fa-camera"></i>
						</button>
					</div>

					{/* Name, role & email */}
					<div>
						<h1 className="text-3xl font-bold">{profile.name}</h1>
						<p className="text-gray-600">
							{profile.venueManager ? 'Venue Manager' : 'Traveler'}
						</p>
						<p className="text-sm text-gray-500">{profile.email}</p>
					</div>
				</div>

				{/* Stats */}
				<div className="grid grid-cols-2 gap-4">
					<div className="p-4 bg-white rounded-lg shadow">
						<p className="text-sm text-gray-500">Venues Listed</p>
						<p className="text-2xl font-bold">{profile._count.venues}</p>
					</div>
					<div className="p-4 bg-white rounded-lg shadow">
						<p className="text-sm text-gray-500">Bookings Made</p>
						<p className="text-2xl font-bold">{profile._count.bookings}</p>
					</div>
				</div>

				{/* About Me */}
				<section>
					<h2 className="text-2xl font-semibold mb-2">About Me</h2>
					<p className="text-gray-700 leading-relaxed">
						{profile.bio || 'No bio provided.'}
					</p>
				</section>

				{/* Mock Reviews */}
				<section>
					<h2 className="text-2xl font-semibold mb-4">My Reviews</h2>
					<div className="space-y-6">
						{reviews.map((r) => (
							<div key={r.id} className="bg-white rounded-lg p-4 shadow">
								<div className="flex justify-between items-center mb-2">
									<div>
										<h3 className="font-semibold">{r.venueName}</h3>
										<p className="text-xs text-gray-500">
											{format(new Date(r.date), 'MMM d, yyyy')}
										</p>
									</div>
									<div className="flex items-center space-x-1">
										{[1, 2, 3, 4, 5].map((i) => (
											<Star
												key={i}
												size={16}
												className={
													i <= r.rating ? 'text-yellow-500' : 'text-gray-300'
												}
											/>
										))}
									</div>
								</div>
								<p className="text-gray-700">{r.text}</p>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	);
}
