import AmenityIcon from './AmenityIcon';
import { Wifi, Car, Coffee, PawPrint } from 'lucide-react';

export interface AmenitiesIconsProps {
	/** Pass in the `venue.meta` object directly */
	meta: {
		wifi: boolean;
		parking: boolean;
		breakfast: boolean;
		pets: boolean;
	};
	/** pixel size for each icon */
	size?: number;
}

export default function AmenitiesIcons({
	                                       meta,
	                                       size = 20,
                                       }: AmenitiesIconsProps) {
	return (
		<div className="flex items-center gap-4">
			<AmenityIcon Icon={Wifi} available={meta.wifi} title="Wi-Fi" size={size} />
			<AmenityIcon Icon={Car} available={meta.parking} title="Parking" size={size} />
			<AmenityIcon Icon={Coffee} available={meta.breakfast} title="Breakfast" size={size} />
			<AmenityIcon Icon={PawPrint} available={meta.pets} title="Pets Allowed" size={size} />
		</div>
	);
}
