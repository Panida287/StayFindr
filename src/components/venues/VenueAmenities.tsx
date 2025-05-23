import { Car, Coffee, PawPrint, Wifi } from 'lucide-react';

type VenueMeta = {
	wifi?: boolean;
	parking?: boolean;
	breakfast?: boolean;
	pets?: boolean;
};

type Props = {
	meta: VenueMeta;
};

export default function VenueAmenities({ meta }: Props) {
	return (
		<>
			<div className="mt-4 flex flex-col gap-4 text-sm text-gray-700 md:flex-row md:justify-evenly">
				{meta?.wifi && (
					<div className="flex items-center gap-2">
						<Wifi className="w-4 h-4" /> WiFi
					</div>
				)}
				{meta?.parking && (
					<div className="flex items-center gap-2">
						<Car className="w-4 h-4" /> Parking
					</div>
				)}
				{meta?.breakfast && (
					<div className="flex items-center gap-2">
						<Coffee className="w-4 h-4" /> Breakfast included
					</div>
				)}
				{meta?.pets && (
					<div className="flex items-center gap-2">
						<PawPrint className="w-4 h-4" /> Pets Allowed
					</div>
				)}
			</div>
		</>
	)
}