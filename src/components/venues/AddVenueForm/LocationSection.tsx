import { useEffect } from 'react';
import { UseFormRegister } from 'react-hook-form';
import {
	MapContainer,
	TileLayer,
	Marker,
	useMap,
	useMapEvents,
} from 'react-leaflet';
import { VenueFormValues } from '../../../types/forms';
import L, { LeafletMouseEvent } from 'leaflet';
import 'leaflet/dist/leaflet.css';

const markerIcon = new L.Icon({
	iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});

type Props = {
	/** react-hook-form register function */
	register: UseFormRegister<VenueFormValues>;
	/** Current marker coordinates */
	marker: { lat: number; lng: number };
	/** Callback triggered on map click to update coordinates */
	handleMapClick: (coords: { lat: number; lng: number }) => void;
};

/**
 * Location section of the venue form. Includes address inputs and interactive map.
 */
export function LocationSection({ register, marker, handleMapClick }: Props) {
	return (
		<section aria-labelledby="location-heading" className="space-y-4">
			<h3 id="location-heading" className="font-semibold text-xl text-black">
				Location
			</h3>

			<div>
				<label htmlFor="address" className="block text-sm font-medium text-gray-700">
					Street Address
				</label>
				<input
					id="address"
					{...register('location.address')}
					placeholder="e.g. 123 Main St"
					className="input mt-1"
					autoComplete="street-address"
				/>
			</div>

			<div className="flex gap-4">
				<div className="flex-1">
					<label htmlFor="city" className="block text-sm font-medium text-gray-700">
						City
					</label>
					<input
						id="city"
						{...register('location.city')}
						placeholder="e.g. Oslo"
						className="input mt-1"
						autoComplete="address-level2"
					/>
				</div>
				<div className="flex-1">
					<label htmlFor="zip" className="block text-sm font-medium text-gray-700">
						ZIP
					</label>
					<input
						id="zip"
						{...register('location.zip')}
						placeholder="e.g. 0577"
						className="input mt-1"
						autoComplete="postal-code"
					/>
				</div>
			</div>

			<div className="flex flex-col sm:flex-row sm:gap-4">
				<div className="flex-1">
					<label htmlFor="country" className="block text-sm font-medium text-gray-700">
						Country
					</label>
					<input
						id="country"
						{...register('location.country')}
						placeholder="e.g. Norway"
						className="input mt-1"
						autoComplete="country"
					/>
				</div>
				<div className="flex-1">
					<label htmlFor="continent" className="block text-sm font-medium text-gray-700">
						Continent
					</label>
					<input
						id="continent"
						{...register('location.continent')}
						placeholder="e.g. Europe"
						className="input mt-1"
					/>
				</div>
			</div>

			{/* Map Picker */}
			<div className="h-64 rounded-md overflow-hidden mt-4" aria-label="Venue location map">
				<MapContainer
					center={[marker.lat, marker.lng]}
					zoom={2}
					className="h-full w-full"
				>
					<ResizeMapOnLoad />
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					<LocationPicker onSelect={handleMapClick} />
					<Marker position={marker} icon={markerIcon} />
				</MapContainer>
			</div>
		</section>
	);
}

/**
 * Ensures Leaflet properly sizes map container after mounting.
 */
function ResizeMapOnLoad() {
	const map = useMap();
	useEffect(() => {
		map.invalidateSize();
	}, [map]);
	return null;
}

/**
 * Registers map click handler to update marker position.
 */
function LocationPicker({
	                        onSelect,
                        }: {
	onSelect: (coords: { lat: number; lng: number }) => void;
}) {
	useMapEvents({
		click(e: LeafletMouseEvent) {
			onSelect(e.latlng);
		},
	});
	return null;
}
