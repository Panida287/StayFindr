import { Link } from 'react-router-dom';
import { useFetchVenuesByProfile } from '../../../../hooks/useFetchVenuesByProfile.ts';
import ManageVenueCard from '../../../../components/venues/ManageVenueCard.tsx';

export default function ManageVenuePage() {
	const { venues, isLoading, error } = useFetchVenuesByProfile();
	const username = localStorage.getItem('SFUsername');

	if (isLoading) {
		return (
			<div className="flex justify-center items-center mt-8">
				{/* spinner */}
				<div className="h-12 w-12 border-4 border-t-transparent border-pink-600 rounded-full animate-spin"></div>
			</div>
		);
	}

	if (error) return <p>Error: {error}</p>;

	if (venues.length === 0) {
		return (
			<div className="mt-8 text-center bg-white p-6 rounded-xl shadow-sm">
				<h2 className="text-xl font-semibold mb-2">You don't have any venues listed.</h2>
				<p className="text-gray-500 text-sm mb-4">
					Start by creating your first venue to begin hosting!
				</p>
			</div>
		);
	}

	return (
		<div className="mt-8 max-w-4xl mx-auto">
			<div className="flex justify-between items-center mb-4">
				<h1 className="text-2xl font-bold">Manage Venues</h1>
				<Link
					to={`/admin/${username}/new-venue`}
					className="text-sm bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
				>
					Add New Venue
				</Link>
			</div>

			<div className="grid gap-4">
				{venues.map((venue) => (
					<ManageVenueCard key={venue.id} venue={venue} />
				))}
			</div>
		</div>
	);
}
