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
		<div>
			<h2 className="text-4xl mb-4">About Me</h2>
			<div className="max-w-3xl mx-auto space-y-4">
				<div className="flex items-center gap-4 relative bg-white/60 rounded-lg p-4 shadow">
					{/* Name, role & email */}
					<div>
						<p className="font-bold ">
							<i className="fa-solid fa-circle-user pr-2"></i>
							{profile.name}</p>
						<p className="text-gray-600">
							<i className="fa-solid fa-briefcase pr-2 "></i>{profile.venueManager ? 'Venue Manager' : 'Traveler'}
						</p>
						<p className="text-sm text-gray-500">
							<i className="fa-solid fa-envelope pr-2"></i>
							{profile.email}</p>
					</div>
				</div>

				{/* Stats */}
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

				{/* About Me */}
				<section className="bg-white/60 rounded-lg p-4 shadow">
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
										<h6 className="font-semibold">{r.venueName}</h6>
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
								<p className="text-gray-700 text-xs">{r.text}</p>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	);
}
