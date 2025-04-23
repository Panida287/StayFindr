import { useFetchVenuesByProfile } from '../../../../hooks/useFetchVenuesByProfile.ts';
import ManageVenueCard from '../../../../components/venues/ManageVenueCard.tsx';
import { Link, useParams } from 'react-router-dom';

export default function ManageVenuePage() {
	const { venues, isLoading, error } = useFetchVenuesByProfile();
	const { adminId } = useParams();

	if (isLoading) return <p>Loading venues...</p>;
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
					to={`/admin/${adminId}/new-venue`}
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
