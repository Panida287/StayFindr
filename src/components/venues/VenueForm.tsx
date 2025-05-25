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

function LocationPicker({onSelect}: { onSelect: (coords: { lat: number; lng: number }) => void }) {
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

export default function VenueForm({
	                                  initialValues,
	                                  isEdit = false,
	                                  onSubmitHandler,
	                                  isLoading,
	                                  apiError,
                                  }: Props) {
	const [marker, setMarker] = useState<{ lat: number; lng: number }>(
		initialValues?.location || {lat: 0, lng: 0}
	);
	const [hoverRating, setHoverRating] = useState<number>(0);

	const {
		register,
		handleSubmit,
		control,
		setValue,
		watch,
		formState: {errors},
	} = useForm<VenueFormValues>({
		defaultValues: initialValues || {media: [{url: '', alt: ''}]},
	});

	const {fields, append, remove} = useFieldArray({control, name: 'media'});

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
		<form
			onSubmit={handleSubmit(onSubmitHandler)}
			className="space-y-8 p-4 max-w-4xl mx-auto"
		>
			<h2 className="text-3xl font-bold">
				{isEdit ? `Edit ${initialValues?.name ?? 'Property'}` : 'Add New Property'}
			</h2>

			{/* === BASIC INFORMATION === */}
			<div className="grid md:grid-cols-2 gap-6">
				<div className="space-y-4 flex flex-col rounded-xl border border-gray-300 p-4 shadow-md">
					<h3 className="font-semibold text-xl text-black">Basic Information</h3>

					<div>
						<label htmlFor="name" className="form-label">
							Property Name
						</label>
						<input
							id="name"
							{...register('name', {required: 'Name is required'})}
							placeholder="Property Name"
							className="input"
						/>
						{errors.name && (
							<p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
						)}
					</div>

					<div>
						<label htmlFor="description" className="form-label">
							Description
						</label>
						<textarea
							id="description"
							{...register('description', {required: 'Description is required'})}
							placeholder="Description"
							className="input h-40"
						/>
						{errors.description && (
							<p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
						)}
					</div>

					<div>
						<label htmlFor="maxGuests" className="form-label mr-2">
							Max Guests
						</label>
						<input
							id="maxGuests"
							type="number"
							{...register('maxGuests', {required: true, valueAsNumber: true})}
							placeholder="Max Guests"
							className="input"
						/>
						{errors.maxGuests && (
							<p className="text-red-500 text-sm mt-1">This field is required</p>
						)}
					</div>
				</div>

				{/* === PRICING, RATING and amenities === */}
				<div className="space-y-4 flex flex-col rounded-xl border border-gray-300 p-4 shadow-md h-fit">
					<h3 className="font-semibold text-xl text-black">Pricing & Rating</h3>

					<div>
						<label htmlFor="price" className="form-label">
							Base Price
						</label>
						<input
							id="price"
							type="number"
							{...register('price', {required: true, valueAsNumber: true})}
							placeholder="Base Price"
							className="input mt-1"
						/>
						{errors.price && (
							<p className="text-red-500 text-sm mt-1">This field is required</p>
						)}
					</div>

					<fieldset>
						<legend className="form-label">Rating</legend>
						<div className="flex space-x-1">
							{[1, 2, 3, 4, 5].map((value) => {
								const filled = hoverRating
									? value <= hoverRating
									: value <= ratingValue;
								return (
									<label
										key={value}
										className="cursor-pointer"
										onMouseEnter={() => setHoverRating(value)}
										onMouseLeave={() => setHoverRating(0)}
									>
										<input
											type="radio"
											value={value}
											{...register('rating', {valueAsNumber: true, max: 5})}
											className="hidden"
										/>
										<span
											className={`text-2xl ${
												filled ? 'text-yellow-400' : 'text-gray-300'
											}`}
										>
                                            ★
                                        </span>
									</label>
								);
							})}
						</div>
						{errors.rating && (
							<p className="text-red-500 text-sm mt-1">{errors.rating.message}</p>
						)}
					</fieldset>

					<h3 className="font-semibold text-xl text-black">Amenities</h3>

					<div className="flex flex-col space-y-2">
						<div className="flex items-center w-full space-x-2">
							<input
								type="checkbox"
								{...register('meta.wifi')}
								className="w-fit mr-2"
								aria-label="Wifi Available"
							/>
							<span className="w-full">Wifi Available</span>
						</div>

						<div className="flex items-center w-full space-x-2">
							<input
								type="checkbox"
								{...register('meta.parking')}
								className="w-fit mr-2"
								aria-label="Parking Available"
							/>
							<span className="w-full">Parking Available</span>
						</div>

						<div className="flex items-center w-full space-x-2">
							<input
								type="checkbox"
								{...register('meta.breakfast')}
								className="w-fit mr-2"
								aria-label="Breakfast Included"
							/>
							<span className="w-full">Breakfast Included</span>
						</div>

						<div className="flex items-center w-full space-x-2">
							<input
								type="checkbox"
								{...register('meta.pets')}
								className="w-fit mr-2"
								aria-label="Pets Allowed"
							/>
							<span className="w-full">Pets Allowed</span>
						</div>
					</div>

				</div>
			</div>


			{/* === LOCATION === */}
			<div className="grid space-y-4 rounded-xl border border-gray-300 p-4 shadow-md">
				<div className="space-y-4">
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
						<div>
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

						<div>
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
						<div>
							<label htmlFor="country" className="block text-sm font-medium text-gray-700">
								Country
							</label>
							<input
								id="country"
								{...register('location.country')}
								placeholder="Country"
								className="input mt-1"
							/>
						</div>

						<div>
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

					<div className="h-64 rounded-md overflow-hidden">
						<MapContainer center={[marker.lat, marker.lng]} zoom={2} className="h-full w-full">
							<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
							<LocationPicker onSelect={handleMapClick} />
							<Marker position={marker} icon={markerIcon} />
						</MapContainer>
					</div>
				</div>
			</div>

			{/* === PHOTOS === */}
			<div className="space-y-4 flex flex-col rounded-xl border border-gray-300 p-4 shadow-md">
				<h3 className="font-semibold text-xl text-black">Add Images</h3>

				{fields.map((field, index) => (
					<div key={field.id} className="flex items-center gap-2 mt-2">
						<input
							{...register(`media.${index}.url` as const)}
							defaultValue={field.url}
							placeholder="Image URL"
							className="w-full border p-2 rounded-md"
						/>
						<input
							{...register(`media.${index}.alt` as const)}
							defaultValue={field.alt}
							placeholder="Image Alt Text"
							className="w-full border p-2 rounded-md"
						/>
						<button
							type="button"
							onClick={() => remove(index)}
							className="text-red-500"
						>
							✕
						</button>
					</div>
				))}

				<button
					type="button"
					onClick={() => append({url: '', alt: ''})}
					className="mt-2 text-blue-500"
				>
					+ Add More Images
				</button>

				{/* previews with close overlay */}
					<div className="flex flex-wrap gap-4 justify-center sm:justify-start">
						{mediaWatch.map((m, i) =>
							m.url ? (
								<div key={i} className="relative">
									<MediaPreview url={m.url} width="w-52" height="h-52" />
									<button
										type="button"
										onClick={() => remove(i)}
										className="absolute flex justify-center items-center h-6 w-6 text-md font-thin bg-gray-100/80 top-2 right-2 border rounded-full text-red-500 hover:bg-gray-100"
									>
										✕
									</button>
								</div>
							) : null
						)}
					</div>
			</div>


			{/* hidden coords */}
			<input type="hidden" {...register('location.lat', {valueAsNumber: true})} />
			<input type="hidden" {...register('location.lng', {valueAsNumber: true})} />

			{apiError && (
				<div className="bg-red-100 text-red-600 p-3 rounded-md text-sm mt-4">
					{apiError}
				</div>
			)}

			<div className="flex justify-end gap-4 mt-4">
				<Link to={`/admin/${user}/manage-venues`} className="btn-base bg-gray-500 text-white">
					Cancel
				</Link>
				<button type="submit" className="btn-base bg-pink-600 text-white" disabled={isLoading}>
					{isLoading
						? isEdit
							? 'Updating...'
							: 'Creating...'
						: isEdit
							? 'Update Venue'
							: 'Create Venue'}
				</button>
			</div>
		</form>
	);
}
