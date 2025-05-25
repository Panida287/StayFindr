import { UseFormRegister } from 'react-hook-form';
import { MediaPreview } from '../../commons/MediaPreview.tsx';
import { VenueFormValues } from '../../../types/forms.ts';

type ImageField = { id: string; url: string; alt: string };
type Props = {
	fields: ImageField[];
	mediaWatch: { url: string; alt: string }[];
	register: UseFormRegister<VenueFormValues>;
	append: () => void;
	remove: (index: number) => void;
};

export function AddImages({fields, mediaWatch, register, append, remove}: Props) {
	return (
		<>
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
				onClick={append}
				className="mt-2 text-blue-500"
			>
				+ Add More Images
			</button>

			<div className="flex flex-wrap gap-4 justify-center sm:justify-start mt-4">
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
		</>
	);
}
