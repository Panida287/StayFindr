import { useState } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import { VenueFormValues } from '../../../types/forms';

/**
 * A form section for inputting venue price, selecting a star rating, and toggling amenities.
 */
export function PriceRateAmenities() {
	const {
		register,
		control,
		setValue,
		watch,
		formState: { errors },
	} = useFormContext<VenueFormValues>();

	const ratedValue = watch('rating') ?? 0;
	const [hoverValue, setHoverValue] = useState(0);
	const displayValue = hoverValue || ratedValue;

	/**
	 * Returns the correct star icon based on hover and current rating.
	 */
	const starIcon = (i: number) =>
		displayValue >= i ? (
			<i className="fa-solid fa-star text-yellow-400" />
		) : displayValue >= i - 0.5 ? (
			<i className="fa-solid fa-star-half-stroke text-yellow-400" />
		) : (
			<i className="fa-regular fa-star text-gray-300" />
		);

	return (
		<section aria-labelledby="pricing-amenities" className="space-y-6">
			<h2 id="pricing-amenities" className="sr-only">
				Pricing, Rating, and Amenities
			</h2>

			{/* === Price Field === */}
			<div>
				<label htmlFor="price" className="form-label">
					*Base Price
				</label>
				<div className="flex justify-between items-end gap-2">
					<input
						id="price"
						type="number"
						placeholder="Base Price"
						aria-required="true"
						{...register('price', { required: true, valueAsNumber: true })}
						className="input mt-1 flex-1"
					/>
					<span className="text-lg font-medium">NOK</span>
				</div>
				{errors.price && (
					<p className="text-red-500 text-sm mt-1" role="alert">
						This field is required
					</p>
				)}
			</div>

			{/* === Rating Selector === */}
			<fieldset>
				<legend className="form-label">Rating</legend>
				<Controller
					control={control}
					name="rating"
					defaultValue={0}
					render={() => (
						<div className="mt-2" role="radiogroup" aria-label="Star rating">
							<div className="flex items-center space-x-1">
								{[1, 2, 3, 4, 5].map((star) => (
									<div
										key={star}
										className="relative text-2xl cursor-pointer"
										onMouseLeave={() => setHoverValue(0)}
										aria-label={`${star} star`}
									>
										{/* Left half = 0.5 */}
										<div
											className="absolute inset-y-0 left-0 w-1/2 z-10"
											onMouseEnter={() => setHoverValue(star - 0.5)}
											onClick={() =>
												setValue('rating', star - 0.5, { shouldValidate: true })
											}
											role="radio"
											aria-checked={displayValue === star - 0.5}
											aria-label={`${star - 0.5} stars`}
										/>
										{/* Right half = full */}
										<div
											className="absolute inset-y-0 left-1/2 w-1/2 z-10"
											onMouseEnter={() => setHoverValue(star)}
											onClick={() =>
												setValue('rating', star, { shouldValidate: true })
											}
											role="radio"
											aria-checked={displayValue === star}
											aria-label={`${star} stars`}
										/>
										{starIcon(star)}
									</div>
								))}
							</div>
							<p className="mt-1 text-sm text-gray-700">
								{displayValue.toFixed(1)} star{displayValue !== 1 ? 's' : ''}
							</p>
							{errors.rating && (
								<p className="text-red-500 text-sm mt-1" role="alert">
									{errors.rating.message}
								</p>
							)}
						</div>
					)}
				/>
			</fieldset>

			{/* === Amenities Section === */}
			<section aria-labelledby="amenities-heading">
				<h3 id="amenities-heading" className="font-semibold text-xl text-black">
					Amenities
				</h3>
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
			</section>
		</section>
	);
}
