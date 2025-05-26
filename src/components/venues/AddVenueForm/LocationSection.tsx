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
	register: UseFormRegister<VenueFormValues>;
	marker: { lat: number; lng: number };
	handleMapClick: (coords: { lat: number; lng: number }) => void;
};

export function LocationSection({
	                                register,
	                                marker,
	                                handleMapClick,
                                }: Props) {
	return (
		<>
			<h3 className="font-semibold text-xl text-black">Location</h3>

			<div>
				<label htmlFor="address" className="block text-sm font-medium text-gray-700">
					Street Address
				</label>
				<input
					id="address"
					{...register('location.address')}
					placeholder="Street Address"
					className="input mt-1"
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
						placeholder="City"
						className="input mt-1"
					/>
				</div>
				<div className="flex-1">
					<label htmlFor="zip" className="block text-sm font-medium text-gray-700">
						ZIP
					</label>
					<input
						id="zip"
						{...register('location.zip')}
						placeholder="ZIP"
						className="input mt-1"
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
						placeholder="country"
						className="input mt-1"
					/>
				</div>
				<div className="flex-1">
					<label htmlFor="continent" className="block text-sm font-medium text-gray-700">
						Continent
					</label>
					<input
						id="continent"
						{...register('location.continent')}
						placeholder="Continent"
						className="input mt-1"
					/>
				</div>
			</div>

			<div className="h-64 rounded-md overflow-hidden mt-4">
				<MapContainer
					center={[marker.lat, marker.lng]}
					zoom={2}
					className="h-full w-full"
				>
					{/* this will invalidateSize() on mount */}
					<ResizeMapOnLoad />
					<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
					<LocationPicker onSelect={handleMapClick} />
					<Marker position={marker} icon={markerIcon} />
				</MapContainer>
			</div>
		</>
	);
}

// helper to invalidateSize after the map first renders
function ResizeMapOnLoad() {
	const map = useMap();
	useEffect(() => {
		map.invalidateSize();
	}, [map]);
	return null;
}

// helper to let the user click the map to set coords
function LocationPicker({ onSelect }: { onSelect: (coords: { lat: number; lng: number }) => void }) {
	useMapEvents({
		click(e: LeafletMouseEvent) {
			onSelect(e.latlng);
		},
	});
	return null;
}
