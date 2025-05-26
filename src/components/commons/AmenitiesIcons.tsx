import AmenityIcon from './AmenityIcon';
import { Wifi, Car, Coffee, PawPrint } from 'lucide-react';

/**
 * Props for AmenitiesIcons component.
 */
export interface AmenitiesIconsProps {
	/** Meta object from venue indicating which amenities are available */
	meta: {
		wifi: boolean;
		parking: boolean;
		breakfast: boolean;
		pets: boolean;
	};
	/** Optional icon size in pixels (default: 20) */
	size?: number;
}

/**
 * Displays a row of amenity icons with availability status.
 * Commonly used in cards and detail pages to visually indicate included features.
 */
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
