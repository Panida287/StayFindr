// src/components/venues/YourFormSections/PriceRateAmenities.tsx

import { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { VenueFormValues } from '../../../types/forms';

export function PriceRateAmenities() {
	const {
		register,
		control,
		setValue,
		watch,
		formState: { errors },
	} = useFormContext<VenueFormValues>();

	// current stored rating and hover state
	const ratedValue = watch('rating') ?? 0;
	const [hoverValue, setHoverValue] = useState(0);
	const displayValue = hoverValue || ratedValue;

	// choose the right Font-Awesome star icon
	const starIcon = (i: number) =>
		displayValue >= i ? (
			<i className="fa-solid fa-star text-yellow-400" />
		) : displayValue >= i - 0.5 ? (
			<i className="fa-solid fa-star-half-stroke text-yellow-400" />
		) : (
			<i className="fa-regular fa-star text-gray-300" />
		);

	return (
		<div className="space-y-6">
			{/* === Price === */}
			<div>
				<label htmlFor="price" className="form-label">
					*Base Price
				</label>
				<div className="flex justify-between items-end gap-2">
					<input
						id="price"
						type="number"
						{...register('price', { required: true, valueAsNumber: true })}
						placeholder="Base Price"
						className="input mt-1 flex-1"
					/>
					<span className="text-lg font-medium">NOK</span>
				</div>
				{errors.price && (
					<p className="text-red-500 text-sm mt-1">This field is required</p>
				)}
			</div>

			{/* === Rating === */}
			<fieldset>
				<legend className="form-label">Rating</legend>
				<Controller
					control={control}
					name="rating"
					defaultValue={0}
					render={() => (
						<div className="mt-2">
							<div className="flex items-center space-x-1">
								{[1, 2, 3, 4, 5].map((star) => (
									<div
										key={star}
										className="relative text-2xl cursor-pointer"
										onMouseLeave={() => setHoverValue(0)}
									>
										{/* left half = .5 */}
										<div
											className="absolute inset-y-0 left-0 w-1/2 z-10"
											onMouseEnter={() => setHoverValue(star - 0.5)}
											onClick={() =>
												setValue('rating', star - 0.5, { shouldValidate: true })
											}
										/>
										{/* right half = full */}
										<div
											className="absolute inset-y-0 left-1/2 w-1/2 z-10"
											onMouseEnter={() => setHoverValue(star)}
											onClick={() =>
												setValue('rating', star, { shouldValidate: true })
											}
										/>
										{starIcon(star)}
									</div>
								))}
							</div>
							<p className="mt-1 text-sm text-gray-700">
								{displayValue.toFixed(1)} star{displayValue !== 1 ? 's' : ''}
							</p>
							{errors.rating && (
								<p className="text-red-500 text-sm mt-1">
									{errors.rating.message}
								</p>
							)}
						</div>
					)}
				/>
			</fieldset>

			{/* === Amenities === */}
			<div>
				<h3 className="font-semibold text-xl text-black">Amenities</h3>
				<div className="mt-2 flex flex-col space-y-2">
					{(['wifi', 'parking', 'breakfast', 'pets'] as const).map((amenity) => (
						<label key={amenity} className="flex items-center space-x-2">
							<input
								type="checkbox"
								{...register(`meta.${amenity}`)}
								className="w-4 h-4 text-primary"
							/>
							<span className="capitalize">{amenity}</span>
						</label>
					))}
				</div>
			</div>
		</div>
	);
}
