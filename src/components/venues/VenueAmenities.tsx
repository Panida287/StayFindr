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
			<div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3 text-sm text-gray-700">
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
						<Coffee className="w-4 h-4" /> Breakfast
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