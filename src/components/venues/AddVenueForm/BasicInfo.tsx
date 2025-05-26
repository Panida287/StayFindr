import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { VenueFormValues } from '../../../types/forms';

type Props = {
	/** react-hook-form register function for form inputs */
	register: UseFormRegister<VenueFormValues>;
	/** Form validation errors from react-hook-form */
	errors: FieldErrors<VenueFormValues>;
};

/**
 * Basic venue information input section.
 * Collects name, description, and max guest capacity.
 */
export function BasicInfo({ register, errors }: Props) {
	return (
		<section aria-labelledby="basic-info-heading" className="space-y-4">
			<h3 id="basic-info-heading" className="font-semibold text-xl text-black">
				Basic Information
			</h3>

			{/* Property Name */}
			<div>
				<label htmlFor="name" className="form-label">
					*Property Name
				</label>
				<input
					id="name"
					aria-invalid={!!errors.name}
					aria-describedby={errors.name ? 'name-error' : undefined}
					{...register('name', { required: 'Name is required' })}
					placeholder="Property Name"
					className="input"
				/>
				{errors.name && (
					<p
						id="name-error"
						role="alert"
						className="text-red-500 text-sm mt-1"
					>
						{errors.name.message}
					</p>
				)}
			</div>

			{/* Description */}
			<div>
				<label htmlFor="description" className="form-label">
					*Description
				</label>
				<textarea
					id="description"
					aria-invalid={!!errors.description}
					aria-describedby={errors.description ? 'desc-error' : undefined}
					{...register('description', { required: 'Description is required' })}
					placeholder="Write a short description..."
					className="input h-40"
				/>
				{errors.description && (
					<p
						id="desc-error"
						role="alert"
						className="text-red-500 text-sm mt-1"
					>
						{errors.description.message}
					</p>
				)}
			</div>

			{/* Max Guests */}
			<div>
				<label htmlFor="maxGuests" className="form-label">
					*Max Guests
				</label>
				<input
					id="maxGuests"
					type="number"
					min={1}
					aria-invalid={!!errors.maxGuests}
					aria-describedby={errors.maxGuests ? 'guests-error' : undefined}
					{...register('maxGuests', {
						required: true,
						valueAsNumber: true,
					})}
					placeholder="e.g. 4"
					className="input"
				/>
				{errors.maxGuests && (
					<p
						id="guests-error"
						role="alert"
						className="text-red-500 text-sm mt-1"
					>
						This field is required
					</p>
				)}
			</div>
		</section>
	);
}
