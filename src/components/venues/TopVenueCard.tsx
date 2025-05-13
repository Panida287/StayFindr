import { Link } from 'react-router-dom';
import { Venue } from '../../types/venues.ts';

type Props = {
	venue: Venue;
};

export default function TopVenueCard({ venue }: Props) {
	const image = venue.media?.[0]?.url || '/placeholder.jpg';

	return (
		<div
			className="relative h-full w-full rounded-2xl overflow-hidden shadow-lg"
			style={{
				backgroundImage: `url(${image})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}
		>
			<div className="absolute inset-0 bg-black/40" />
			<div className="absolute bottom-0 p-6 text-white z-10">
				<h3 className="text-2xl font-bold">{venue.name}</h3>
				<p className="text-sm mb-3">
					{venue.location?.city}, {venue.location?.country}
				</p>
				<Link to={`/venue/${venue.id}`}>
					<button className="bg-yellow-500 hover:bg-yellow-600 transition px-4 py-2 rounded-full font-semibold text-sm">
						Book now
					</button>
				</Link>
			</div>
		</div>
	);
}
