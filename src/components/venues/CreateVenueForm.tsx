import { useForm, SubmitHandler, useFieldArray } from 'react-hook-form';
import { useState } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useCreateVenue } from '../../hooks/useCreateVenue';
import { VenueFormValues } from '../../types/forms.ts';
import { MediaPreview } from '../commons/MediaPreview.tsx';
import { Link, useNavigate } from 'react-router-dom';

const markerIcon = new L.Icon({
	iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
	iconSize: [25, 41],
	iconAnchor: [12, 41],
});

function LocationPicker({onSelect}: { onSelect: (coords: { lat: number; lng: number }) => void }) {
	useMapEvents({
		click(e) {
			onSelect(e.latlng);
		},
	});
	return null;
}

export default function CreateVenueForm() {
	const [marker, setMarker] = useState<{ lat: number; lng: number }>({lat: 0, lng: 0});
	const [apiError, setApiError] = useState<string>('');
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		control,
		setValue,
		watch,
		reset,
		formState: {errors},
	} = useForm<VenueFormValues>({
		defaultValues: {
			media: [{url: '', alt: ''}],
		},
	});

	const {fields, append, remove} = useFieldArray({control, name: 'media'});
	const {createVenue, isLoading} = useCreateVenue({
		onError: (errorMessage: string) => {
			if (errorMessage.includes('Image is not accessible')) {
				setApiError('Image is not accessible. Please double check URL.');
			} else {
				setApiError(errorMessage);
			}
		},
	});

	const onSubmit: SubmitHandler<VenueFormValues> = async (data) => {
		setApiError('');
		const success = await createVenue(data);
		if (success) {
			reset();
			const username = localStorage.getItem('SFUsername');
			navigate(`/admin/${username}/manage-venues`);
		}
	};

	const handleMapClick = (coords: { lat: number; lng: number }) => {
		setMarker(coords);
		setValue('location.lat', coords.lat);
		setValue('location.lng', coords.lng);
	};

	const mediaWatch = watch('media');

	const ratingValue = watch('rating') || 0;

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-8 p-4 max-w-4xl mx-auto">
			<h2 className="text-2xl font-bold">Add New Venue</h2>

			<div className="grid md:grid-cols-2 gap-6">
				<div className="space-y-4">
					<h3 className="font-semibold text-lg">Basic Information</h3>
					<input placeholder="Venue Name" {...register('name', {required: 'Name is required'})}
					       className="input" />
					{errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

					<textarea
						placeholder="Description" {...register('description', {required: 'Description is required'})}
						className="input" />
					{errors.description && <p className="text-red-500 text-sm">{errors.description.message}</p>}

					<input type="number" placeholder="Max Guests" {...register('maxGuests', {
						required: true,
						valueAsNumber: true
					})} className="input" />
				</div>

				<div className="space-y-4">
					<h3 className="font-semibold text-lg">Pricing</h3>
					<input type="number" placeholder="Base Price" {...register('price', {
						required: true,
						valueAsNumber: true
					})} className="input" />
					<div>
						<h4 className="font-medium mb-1">Rating</h4>
						<div className="flex space-x-1">
							{[1, 2, 3, 4, 5].map((value) => (
								<label key={value} className="cursor-pointer">
									<input
										type="radio"
										value={value}
										{...register('rating', {valueAsNumber: true, max: 5})}
										className="hidden"
									/>
									<span
										className={`text-2xl transition-transform hover:scale-110 ${value <= ratingValue ? 'text-yellow-400' : 'text-gray-300'}`}>
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
					<input placeholder="Street Address" {...register('location.address')} className="input" />
					<input placeholder="City" {...register('location.city')} className="input" />
					<input placeholder="ZIP" {...register('location.zip')} className="input" />
					<input placeholder="Country" {...register('location.country')} className="input" />
					<input placeholder="Continent" {...register('location.continent')} className="input" />

					<div className="h-64">
						<MapContainer center={[0, 0]} zoom={2} className="h-full w-full rounded-md">
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
						<button type="button" onClick={() => remove(index)} className="text-red-500 text-sm">Remove
						</button>
					</div>
				))}
				<button type="button" onClick={() => append({url: '', alt: ''})}
				        className="text-sm text-pink-600 hover:underline">
					+ Add Photo
				</button>
			</div>

			<input type="hidden" {...register('location.lat', {valueAsNumber: true})} />
			<input type="hidden" {...register('location.lng', {valueAsNumber: true})} />

			{apiError && (
				<div className="bg-red-100 text-red-600 p-3 rounded-md text-sm mt-4">
					{apiError}
				</div>
			)}

			<Link to="/admin/${user}/manage-venues" className="btn-base bg-gray-500 text-white mt-4">
				Cancel
			</Link>

			<button type="submit" className="btn-base bg-pink-600 text-white mt-4" disabled={isLoading}>
				{isLoading ? 'Creating...' : 'Create Venue'}
			</button>
		</form>
	);
}
