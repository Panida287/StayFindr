import { UseFormRegister, FieldErrors } from 'react-hook-form';
import {VenueFormValues} from '../../../types/forms.ts';

type Props = {
	register: UseFormRegister<VenueFormValues>;
	errors: FieldErrors<VenueFormValues>;
};

export function BasicInfo({ register, errors }: Props) {
	return (
		<>
			<h3 className="font-semibold text-xl text-black">Basic Information</h3>

			<div>
				<label htmlFor="name" className="form-label">
					*Property Name
				</label>
				<input
					id="name"
					{...register('name', { required: 'Name is required' })}
					placeholder="Property Name"
					className="input"
				/>
				{errors.name && (
					<p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
				)}
			</div>

			<div>
				<label htmlFor="description" className="form-label">
					*Description
				</label>
				<textarea
					id="description"
					{...register('description', { required: 'Description is required' })}
					placeholder="Description"
					className="input h-40"
				/>
				{errors.description && (
					<p className="text-red-500 text-sm mt-1">
						{errors.description.message}
					</p>
				)}
			</div>

			<div>
				<label htmlFor="maxGuests" className="form-label">
					*Max Guests
				</label>
				<input
					id="maxGuests"
					type="number"
					{...register('maxGuests', { required: true, valueAsNumber: true })}
					placeholder="Max Guests"
					className="input"
				/>
				{errors.maxGuests && (
					<p className="text-red-500 text-sm mt-1">This field is required</p>
				)}
			</div>
		</>
	);
}
