import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LatLngExpression, Icon } from 'leaflet';

/**
 * Props for the VenueMap component.
 */
type VenueMapProps = {
	/** Latitude of the venue */
	lat: number;

	/** Longitude of the venue */
	lng: number;

	/** Venue name to display in the map popup */
	name: string;
};

/**
 * A Leaflet map component centered on the venue's location with a marker.
 *
 * @param lat - Latitude coordinate of the venue.
 * @param lng - Longitude coordinate of the venue.
 * @param name - Name to display in the marker popup.
 */
export default function VenueMap({ lat, lng, name }: VenueMapProps) {
	const position: LatLngExpression = [lat, lng];

	// Custom Leaflet marker icon
	const customIcon: Icon = new L.Icon({
		iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
		iconSize: [25, 41],
		iconAnchor: [12, 41],
		popupAnchor: [1, -34],
		shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
		shadowSize: [41, 41],
	});

	return (
		<MapContainer
			center={position}
			zoom={13}
			scrollWheelZoom={false}
			className="h-64 rounded-lg z-10"
		>
			<TileLayer
				attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
			/>
			<Marker position={position} icon={customIcon}>
				<Popup>{name}</Popup>
			</Marker>
		</MapContainer>
	);
}
