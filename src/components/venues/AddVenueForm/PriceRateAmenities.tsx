import { useState } from 'react';
import { UseFormRegister, UseFormWatch, FieldErrors } from 'react-hook-form';
import {VenueFormValues} from '../../../types/forms.ts';

type Props = {
	register: UseFormRegister<VenueFormValues>;
	watch: UseFormWatch<VenueFormValues>;
	errors: FieldErrors<VenueFormValues>;
};

export function PriceRateAmenities({ register, watch, errors }: Props) {
	const [hoverRating, setHoverRating] = useState(0);
	const ratingValue = watch('rating') || 0;

	return (
		<>
			<h3 className="font-semibold text-xl text-black">Pricing & Rating</h3>

			<div>
				<label htmlFor="price" className="form-label">
					*Base Price
				</label>
				<div className="flex justify-between items-end gap-2">
					<input
						id="price"
						type="number"
						{...register('price', {required: true, valueAsNumber: true})}
						placeholder="Base Price"
						className="input mt-1"
					/>
					<p>NOK</p>
				</div>
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
		</>
	);
}
