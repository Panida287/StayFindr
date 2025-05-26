import { Car, Coffee, PawPrint, Wifi } from 'lucide-react';

type VenueMeta = {
	wifi?: boolean;
	parking?: boolean;
	breakfast?: boolean;
	pets?: boolean;
};

type Props = {
	/** Metadata indicating available amenities */
	meta: VenueMeta;
};

/**
 * Displays a list of amenities available at a venue.
 * If none are available, shows a fallback message.
 */
export default function VenueAmenities({ meta }: Props) {
	const hasAny = meta?.wifi || meta?.parking || meta?.breakfast || meta?.pets;

	return (
		<div
			className="mt-4 flex flex-col gap-4 text-sm text-gray-700 md:flex-row md:justify-evenly"
			aria-label="Venue amenities"
		>
			{hasAny ? (
				<>
					{meta?.wifi && (
						<div className="flex items-center gap-2">
							<Wifi className="w-4 h-4" aria-hidden="true" />
							<span>WiFi</span>
						</div>
					)}
					{meta?.parking && (
						<div className="flex items-center gap-2">
							<Car className="w-4 h-4" aria-hidden="true" />
							<span>Parking</span>
						</div>
					)}
					{meta?.breakfast && (
						<div className="flex items-center gap-2">
							<Coffee className="w-4 h-4" aria-hidden="true" />
							<span>Breakfast included</span>
						</div>
					)}
					{meta?.pets && (
						<div className="flex items-center gap-2">
							<PawPrint className="w-4 h-4" aria-hidden="true" />
							<span>Pets Allowed</span>
						</div>
					)}
				</>
			) : (
				<p className="italic text-gray-500">No amenities provided</p>
			)}
		</div>
	);
}
