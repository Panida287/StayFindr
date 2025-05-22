import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L, { LatLngExpression, Icon } from 'leaflet';

type VenueMapProps = {
	lat: number;
	lng: number;
	name: string;
};

const VenueMap = ({ lat, lng, name }: VenueMapProps) => {
	const position: LatLngExpression = [lat, lng];

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
			className='h-64 w-full rounded-lg'
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
};

export default VenueMap;
