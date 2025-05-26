import { useState } from 'react';
import { updateBio } from '../../hooks/useUpdateBio.ts';
import { CommonButton } from '../commons/Buttons.tsx';

type Props = {
	/** The profile's username */
	name: string;
	/** Initial bio text to populate the textarea */
	initialBio?: string;
};

/**
 * A component for displaying and editing a user bio.
 * Renders a textarea with Save and Cancel buttons when in editing mode.
 */
export default function BioWithEdit({ name, initialBio = '' }: Props) {
	const [isEditing, setIsEditing] = useState(false);
	const [bioInput, setBioInput] = useState(initialBio);
	const [isSaving, setIsSaving] = useState(false);

	const handleSave = async () => {
		setIsSaving(true);
		try {
			await updateBio(name, bioInput);
			setIsEditing(false);
		} catch {
			// You may replace this with a toast or inline error message
			console.error('Failed to update bio.');
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<section
			className="bg-white/60 rounded-lg p-4 shadow transition-all"
			aria-labelledby="about-me-heading"
		>
			<div className="flex justify-between items-start mb-2">
				<h2 id="about-me-heading" className="text-2xl font-semibold">
					About Me
				</h2>
				{!isEditing && (
					<button
						className="text-sm text-primary hover:underline"
						onClick={() => setIsEditing(true)}
						aria-label="Edit Bio"
					>
						Edit
					</button>
				)}
			</div>

			{isEditing ? (
				<div className="space-y-2">
					<label htmlFor="bio-input" className="sr-only">
						Edit your bio
					</label>
					<textarea
						id="bio-input"
						value={bioInput}
						onChange={(e) => setBioInput(e.target.value)}
						className="w-full p-2 border rounded-md text-sm focus:ring focus:ring-primary/30"
						rows={4}
						aria-label="Bio text area"
					/>
					<div className="flex justify-between gap-2">
						<CommonButton
							onClick={() => {
								setBioInput(initialBio);
								setIsEditing(false);
							}}
							className="text-sm"
							textColor="text-primary"
							bgColor="none"
							borderClass="border border-primary"
							hoverColor="hover:bg-background"
							aria-label="Cancel editing"
						>
							Cancel
						</CommonButton>

						<CommonButton
							onClick={handleSave}
							className="text-sm px-4 py-1"
							bgColor="bg-primary"
							textColor="text-white"
							hoverColor="hover:bg-background"
							borderClass="rounded-full"
							disabled={isSaving}
							aria-label="Save bio"
						>
							{isSaving ? 'Saving...' : 'Save'}
						</CommonButton>
					</div>
				</div>
			) : (
				<p className="text-gray-700 leading-relaxed" aria-live="polite">
					{initialBio || <em className="text-gray-400">No bio provided.</em>}
				</p>
			)}
		</section>
	);
}
