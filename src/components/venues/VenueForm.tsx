import { useForm, useFieldArray } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { VenueFormValues } from '../../types/forms.ts';
import { MediaPreview } from '../commons/MediaPreview.tsx';
import { Link } from 'react-router-dom';

const markerIcon = new L.Icon({
	iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});

function LocationPicker({ onSelect }: { onSelect: (coords: { lat: number; lng: number }) => void }) {
	useMapEvents({
		click(e) {
			onSelect(e.latlng);
		},
	});
	return null;
}

type Props = {
	initialValues?: VenueFormValues;
	isEdit?: boolean;
	onSubmitHandler: (data: VenueFormValues) => void;
	isLoading?: boolean;
	apiError?: string;
};

export default function VenueForm({ initialValues, isEdit = false, onSubmitHandler, isLoading, apiError }: Props) {
	const [marker, setMarker] = useState<{ lat: number; lng: number }>(
		initialValues?.location || { lat: 0, lng: 0 }
	);

	const {
		register,
		handleSubmit,
		control,
		setValue,
		watch,
		formState: { errors },
	} = useForm<VenueFormValues>({
		defaultValues: initialValues || {
			media: [{ url: '', alt: '' }],
		},
	});

	const { fields, append, remove } = useFieldArray({ control, name: 'media' });

	useEffect(() => {
		if (initialValues?.location) {
			setValue('location.lat', initialValues.location.lat);
			setValue('location.lng', initialValues.location.lng);
		}
	}, [initialValues, setValue]);

	const handleMapClick = (coords: { lat: number; lng: number }) => {
		setMarker(coords);
		setValue('location.lat', coords.lat);
		setValue('location.lng', coords.lng);
	};

	const ratingValue = watch('rating') || 0;
	const mediaWatch = watch('media');
	const user = localStorage.getItem('SFUsername');

	return (
		<form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-8 p-4 max-w-4xl mx-auto">
			<h2 className="text-2xl font-bold">
				{isEdit ? `Edit ${initialValues?.name ?? 'Venue'}` : 'Add New Venue'}
			</h2>

			<div className="grid md:grid-cols-2 gap-6">
				<div className="space-y-4">
					<h3 className="font-semibold text-lg">Basic Information</h3>
					<input {...register('name', { required: 'Name is required' })} placeholder="Venue Name" className="input" />
					{errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

					<textarea {...register('description', { required: 'Description is required' })} placeholder="Description" className="input" />
					{errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

					<input type="number" {...register('maxGuests', { required: true, valueAsNumber: true })} placeholder="Max Guests" className="input" />
				</div>

				<div className="space-y-4">
					<h3 className="font-semibold text-lg">Pricing</h3>
					<input type="number" {...register('price', { required: true, valueAsNumber: true })} placeholder="Base Price" className="input" />
					<div>
						<h4 className="font-medium mb-1">Rating</h4>
						<div className="flex space-x-1">
							{[1, 2, 3, 4, 5].map((value) => (
								<label key={value} className="cursor-pointer">
									<input
										type="radio"
										value={value}
										{...register('rating', { valueAsNumber: true, max: 5 })}
										className="hidden"
									/>
									<span className={`text-2xl ${value <= ratingValue ? 'text-yellow-400' : 'text-gray-300'}`}>
										★
									</span>
								</label>
							))}
						</div>
					</div>
				</div>
			</div>

			<div className="grid md:grid-cols-2 gap-6">
				<div className="space-y-4">
					<h3 className="font-semibold text-lg">Location</h3>
					<input {...register('location.address')} placeholder="Street Address" className="input" />
					<input {...register('location.city')} placeholder="City" className="input" />
					<input {...register('location.zip')} placeholder="ZIP" className="input" />
					<input {...register('location.country')} placeholder="Country" className="input" />
					<input {...register('location.continent')} placeholder="Continent" className="input" />

					<div className="h-64">
						<MapContainer center={[marker.lat, marker.lng]} zoom={2} className="h-full w-full rounded-md">
							<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
							<LocationPicker onSelect={handleMapClick} />
							<Marker position={marker} icon={markerIcon} />
						</MapContainer>
					</div>
				</div>

				<div className="space-y-4">
					<h3 className="font-semibold text-lg">Amenities</h3>
					<label><input type="checkbox" {...register('meta.wifi')} /> Wifi</label><br />
					<label><input type="checkbox" {...register('meta.parking')} /> Parking</label><br />
					<label><input type="checkbox" {...register('meta.breakfast')} /> Breakfast</label><br />
					<label><input type="checkbox" {...register('meta.pets')} /> Pets</label>
				</div>
			</div>

			<div>
				<h3 className="font-semibold text-lg mb-2">Photos</h3>
				{fields.map((field, index) => (
					<div key={field.id} className="flex gap-2 items-center mb-2">
						<div className="w-24 h-24">
							<MediaPreview url={mediaWatch?.[index]?.url} />
						</div>
						<input placeholder="Image URL" {...register(`media.${index}.url`)} className="input flex-1" />
						<input placeholder="Alt text" {...register(`media.${index}.alt`)} className="input flex-1" />
						<button type="button" onClick={() => remove(index)} className="text-red-500 text-sm">Remove</button>
					</div>
				))}
				<button type="button" onClick={() => append({ url: '', alt: '' })} className="text-sm text-pink-600 hover:underline">
					+ Add Photo
				</button>
			</div>

			<input type="hidden" {...register('location.lat', { valueAsNumber: true })} />
			<input type="hidden" {...register('location.lng', { valueAsNumber: true })} />

			{apiError && (
				<div className="bg-red-100 text-red-600 p-3 rounded-md text-sm mt-4">{apiError}</div>
			)}

			<Link to={`/admin/${user}/manage-venues`} className="btn-base bg-gray-500 text-white mt-4">
				Cancel
			</Link>

			<button type="submit" className="btn-base bg-pink-600 text-white mt-4" disabled={isLoading}>
				{isLoading ? (isEdit ? 'Updating...' : 'Creating...') : isEdit ? 'Update Venue' : 'Create Venue'}
			</button>
		</form>
	);
}
