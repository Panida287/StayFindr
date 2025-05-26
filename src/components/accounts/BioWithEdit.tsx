import { useState } from 'react';
import { updateBio } from '../../hooks/useUpdateBio.ts';
import { CommonButton } from '../commons/Buttons.tsx';

type Props = {
	name: string;
	initialBio?: string;
};

export default function BioWithEdit({name, initialBio = ''}: Props) {
	const [isEditing, setIsEditing] = useState(false);
	const [bioInput, setBioInput] = useState(initialBio);
	const [isSaving, setIsSaving] = useState(false);

	const handleSave = async () => {
		setIsSaving(true);
		try {
			await updateBio(name, bioInput);
			setIsEditing(false);
		} catch {
			alert('Failed to update bio.');
		} finally {
			setIsSaving(false);
		}
	};

	return (
		<section className="bg-white/60 rounded-lg p-4 shadow">
			<div className="flex justify-between items-start mb-2">
				<h2 className="text-2xl font-semibold">About Me</h2>
				{!isEditing && (
					<button
						className="text-sm text-primary hover:underline"
						onClick={() => setIsEditing(true)}
					>
						Edit
					</button>
				)}
			</div>

			{isEditing ? (
				<div className="space-y-2">
					<textarea
						value={bioInput}
						onChange={(e) => setBioInput(e.target.value)}
						className="w-full p-2 border rounded-md text-sm focus:ring focus:ring-primary/30"
						rows={4}
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
						>
							{isSaving ? 'Saving...' : 'Save'}
						</CommonButton>
					</div>

				</div>
			) : (
				<p className="text-gray-700 leading-relaxed">
					{initialBio || 'No bio provided.'}
				</p>
			)}
		</section>
	);
}
