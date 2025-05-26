import { UseFormRegister } from 'react-hook-form';
import { MediaPreview } from '../../commons/MediaPreview';
import { VenueFormValues } from '../../../types/forms';

type ImageField = {
	id: string;
	url: string;
	alt: string;
};

type Props = {
	/** Current media field values registered with useFieldArray */
	fields: ImageField[];
	/** Watched values from react-hook-form's watch for preview */
	mediaWatch: { url: string; alt: string }[];
	/** react-hook-form register function */
	register: UseFormRegister<VenueFormValues>;
	/** Function to add a new media input */
	append: () => void;
	/** Function to remove a specific media input */
	remove: (index: number) => void;
};

/**
 * Image upload section for the Venue form.
 * Allows users to input image URLs, alt text, and preview them.
 */
export function AddImages({ fields, mediaWatch, register, append, remove }: Props) {
	return (
		<section aria-labelledby="add-images-heading">
			<h3 id="add-images-heading" className="font-semibold text-xl text-black mb-2">
				Add Images
			</h3>

			{/* Input fields for image URL and alt text */}
			{fields.map((field, index) => (
				<div key={field.id} className="flex items-center gap-2 mt-2">
					<input
						{...register(`media.${index}.url` as const)}
						defaultValue={field.url}
						placeholder="Image URL"
						className="w-full border p-2 rounded-md"
						aria-label={`Image URL ${index + 1}`}
					/>
					<input
						{...register(`media.${index}.alt` as const)}
						defaultValue={field.alt}
						placeholder="Image Alt Text"
						className="w-full border p-2 rounded-md"
						aria-label={`Alt text for image ${index + 1}`}
					/>
					<button
						type="button"
						onClick={() => remove(index)}
						aria-label={`Remove image ${index + 1}`}
						className="text-red-500 text-xl leading-none hover:text-red-600 focus:outline-none"
					>
						✕
					</button>
				</div>
			))}

			{/* Add more images */}
			<button
				type="button"
				onClick={append}
				className="mt-3 text-blue-500 hover:underline focus:outline-none"
				aria-label="Add another image field"
			>
				+ Add More Images
			</button>

			{/* Preview uploaded images */}
			<div className="flex flex-wrap gap-4 justify-center sm:justify-start mt-4">
				{mediaWatch.map((m, i) =>
					m.url ? (
						<div key={i} className="relative" aria-label={`Image preview ${i + 1}`}>
							<MediaPreview url={m.url} width="w-52" height="h-52" />
							<button
								type="button"
								onClick={() => remove(i)}
								aria-label={`Remove image preview ${i + 1}`}
								className="absolute flex justify-center items-center h-6 w-6 text-md font-thin bg-gray-100/80 top-2 right-2 border rounded-full text-red-500 hover:bg-gray-100"
							>
								✕
							</button>
						</div>
					) : null
				)}
			</div>
		</section>
	);
}
