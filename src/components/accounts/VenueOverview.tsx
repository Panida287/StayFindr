import { Link } from "react-router-dom";
import { Venue } from "../../types/venues";
import { FALLBACK } from '../../constants.ts';

type Props = {
	venues: Venue[];
};

export default function VenueOverview({ venues }: Props) {
	const previewVenues = venues.slice(0, 2);
	const username = localStorage.getItem("SFUsername");

	if (venues.length === 0) {
		return (
			<div className="mt-8 text-center bg-white p-6 rounded-xl shadow-sm">
				<h2 className="text-xl font-semibold mb-2">You don't have any venues listed.</h2>
				<Link
					to="/admin/new-venue"
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
					to={`/admin/${username}/manage-venues`}
					className="text-sm text-primary font-medium hover:underline"
				>
					View All
				</Link>
			</div>

			<div className="grid gap-4">
				{previewVenues.map((venue) => (
					<div
						key={venue.id}
						className="bg-white rounded-xl shadow-sm p-4 flex items-start gap-4"
					>
						<img
							src={venue.media[0]?.url || FALLBACK.venue}
							alt={venue.media[0]?.alt || "Venue image"}
							className="w-24 h-24 object-cover rounded-md"
						/>

						<div className="flex-1">
							<div className="flex justify-between items-start">
								<div>
									<h3 className="text-lg font-semibold">{venue.name}</h3>
									<p className="text-gray-500 text-sm mb-2">
										{venue.location.city}, {venue.location.country}
									</p>
									<p className="text-sm text-gray-600">
										Bookings:{" "}
										<span className="font-medium">
											{venue.bookings?.length || 0}
										</span>
									</p>
								</div>

								<div className="flex gap-2">
									<button className="text-sm px-2 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
										Edit
									</button>
									<button className="text-sm px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600">
										Delete
									</button>
								</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
