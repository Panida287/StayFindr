// src/components/venues/AddVenueForm/VenueForm.tsx
import { useEffect, useState } from 'react';
import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
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
	const {
		initialValues,
		isEdit = false,
		onSubmitHandler,
		isLoading,
		apiError,
	} = props;

	// 1) create your RHF methods once
	const methods = useForm<VenueFormValues>({
		defaultValues: initialValues || { media: [{ url: '', alt: '' }] },
	});
	const {
		register,
		handleSubmit,
		control,
		setValue,
		watch,
		formState: { errors },
	} = methods;

	// 2) field‐array + map click logic stays the same…
	const [marker, setMarker] = useState(
		initialValues?.location || { lat: 0, lng: 0 }
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

	const { fields, append, remove } = useFieldArray({
		control,
		name: 'media',
	});
	const mediaWatch = watch('media');
	const user = localStorage.getItem('SFUsername');

	return (
		// 3) wrap your entire form in FormProvider
		<FormProvider {...methods}>
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
					<div className="space-y-4 w-full rounded-xl border p-4 shadow-md">
						<BasicInfo register={register} errors={errors} />
					</div>

					{/* PRICE / RATING / AMENITIES */}
					<div className="space-y-4 w-full rounded-xl border p-4 shadow-md">
						{/* no more props here! */}
						<PriceRateAmenities />
					</div>
				</div>

				{/* LOCATION */}
				<div className="space-y-4 rounded-xl border p-4 shadow-md">
					<LocationSection
						register={register}
						marker={marker}
						handleMapClick={handleMapClick}
					/>
				</div>

				{/* IMAGES */}
				<div className="space-y-4 rounded-xl border p-4 shadow-md">
					<AddImages
						fields={fields as any[]}
						mediaWatch={mediaWatch as any[]}
						register={register}
						append={() => append({ url: '', alt: '' })}
						remove={remove}
					/>
				</div>

				<input type="hidden" {...register('location.lat')} />
				<input type="hidden" {...register('location.lng')} />

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
							? isEdit
								? 'Updating...'
								: 'Creating...'
							: isEdit
								? 'Update Venue'
								: 'Create Venue'}
					</CommonButton>
				</div>
			</form>
		</FormProvider>
	);
}
