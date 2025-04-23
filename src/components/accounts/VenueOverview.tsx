import { Link, useParams } from 'react-router-dom';
import { Venue } from "../../types/venues";
import ManageVenueCard from "../venues/ManageVenueCard.tsx";

type Props = {
	venues: Venue[];
};

export default function VenueOverview({ venues }: Props) {
	const previewVenues = venues.slice(0, 2);
	const { adminId } = useParams();

	if (venues.length === 0) {
		return (
			<div className="mt-8 text-center bg-white p-6 rounded-xl shadow-sm">
				<h2 className="text-xl font-semibold mb-2">You don't have any venues listed.</h2>
				<Link
					to={`/admin/${adminId}/new-venue`}
					className="inline-block mt-4 px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
				>
					Add your first venue
				</Link>
			</div>
		);
	}

	return (
		<div className="mt-8">
			<div className="flex justify-between items-center mb-4">
				<h2 className="text-xl font-semibold">Your Venues</h2>
				<Link
					to={`/admin/${adminId}/manage-venues`}
					className="text-sm text-primary font-medium hover:underline"
				>
					View All
				</Link>
			</div>

			<div className="grid gap-4">
				{previewVenues.map((venue) => (
					<ManageVenueCard key={venue.id} venue={venue} />
				))}
			</div>
		</div>
	);
}
