import { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { VenueFormValues } from '../../../types/forms';
import { BasicInfo } from './BasicInfo';
import { PriceRateAmenities } from './PriceRateAmenities';
import { LocationSection } from './LocationSection';
import { AddImages } from './AddImages';
import { CommonButton } from '../../commons/Buttons';

export default function VenueForm(props: {
	initialValues?: VenueFormValues;
	isEdit?: boolean;
	onSubmitHandler: (data: VenueFormValues) => void;
	isLoading?: boolean;
	apiError?: string;
}) {
	const {initialValues, isEdit = false, onSubmitHandler, isLoading, apiError} = props;

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

	// Marker + map
	const [marker, setMarker] = useState(
		initialValues?.location || {lat: 0, lng: 0}
	);
	const handleMapClick = (coords: { lat: number; lng: number }) => {
		setMarker(coords);
		setValue('location.lat', coords.lat);
		setValue('location.lng', coords.lng);
	};

	useEffect(() => {
		if (initialValues?.location) {
			setValue('location.lat', initialValues.location.lat);
			setValue('location.lng', initialValues.location.lng);
		}
	}, [initialValues, setValue]);

	// Media
	const {fields, append, remove} = useFieldArray({control, name: 'media'});
	const mediaWatch = watch('media');

	const user = localStorage.getItem('SFUsername');

	return (
		<form
			onSubmit={handleSubmit(onSubmitHandler)}
			className="space-y-8 p-4 max-w-4xl mx-auto"
		>
			<h2 className="text-3xl font-bold">
				{isEdit
					? `Edit ${initialValues?.name ?? 'Property'}`
					: 'Add New Property'}
			</h2>

			{/* BASIC INFO */}
			<div className="flex flex-col w-full gap-6 md:flex-row md:justify-between">
				<div className="space-y-4 w-full flex flex-col rounded-xl border border-gray-300 p-4 shadow-md">
					<BasicInfo register={register} errors={errors} />
				</div>

				{/* PRICE / RATING / AMENITIES */}
				<div className="space-y-4 w-full h-fit flex flex-col rounded-xl border border-gray-300 p-4 shadow-md">
					<PriceRateAmenities register={register} watch={watch} errors={errors} />
				</div>

			</div>

			{/* LOCATION */}
			<div className="space-y-4 rounded-xl border border-gray-300 p-4 shadow-md">
				{/* Only pass the props LocationSection needs */}
				<LocationSection
					register={register}
					marker={marker}
					handleMapClick={handleMapClick}
				/>
			</div>

			{/* IMAGES */}
			<div className="space-y-4 flex flex-col rounded-xl border border-gray-300 p-4 shadow-md">
				{/* AddImages takes fields, mediaWatch, register, append, remove */}
				<AddImages
					fields={fields as { id: string; url: string; alt: string }[]}
					mediaWatch={mediaWatch as { url: string; alt: string }[]}
					register={register}
					append={() => append({url: '', alt: ''})}
					remove={remove}
				/>
			</div>

			{/* hidden coords */}
			<input type="hidden" {...register('location.lat')} />
			<input type="hidden" {...register('location.lng')} />

			{/* API error */}
			{apiError && (
				<div className="bg-red-100 text-red-600 p-3 rounded-md text-sm mt-4">
					{apiError}
				</div>
			)}

			{/* ACTIONS */}
			<div className="flex justify-between items-center mt-4">
				<CommonButton
					to={`/admin/${user}/manage-venues`}
					bgColor="bg-none"
					textColor="text-primary"
					borderClass="border border-primary"
					hoverColor="hover:bg-background"
				>
					Cancel
				</CommonButton>

				<CommonButton
					type="submit"
					disabled={isLoading}
					bgColor="bg-primary"
					textColor="text-white"
					hoverColor="hover:bg-background"
				>
					{isLoading
						? (isEdit ? 'Updating...' : 'Creating...')
						: (isEdit ? 'Update Venue' : 'Create Venue')}
				</CommonButton>
			</div>
		</form>
	);
}
