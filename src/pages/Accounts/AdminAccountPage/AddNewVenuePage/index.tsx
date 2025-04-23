import VenueForm from '../../../../components/venues/VenueForm.tsx';
import { useNavigate } from 'react-router-dom';
import { useCreateVenue } from '../../../../hooks/useCreateVenue.ts';
import { VenueFormValues } from '../../../../types/forms.ts';
import { useState } from 'react';

export default function AddNewVenuePage() {
	const navigate = useNavigate();
	const [apiError, setApiError] = useState('');
	const { createVenue, isLoading } = useCreateVenue({
		onError: (msg) => setApiError(msg),
	});

	const handleCreateSubmit = async (formData: VenueFormValues) => {
		if (formData.rating !== undefined) {
			formData.rating = Number(formData.rating);
		}
		const success = await createVenue(formData);
		if (success) {
			const username = localStorage.getItem('SFUsername');
			navigate(`/admin/${username}/manage-venues`);
		}
	};

	return (
		<div className="max-w-2xl mx-auto mt-8 px-4">
			<VenueForm
				onSubmitHandler={handleCreateSubmit}
				isLoading={isLoading}
				apiError={apiError}
			/>
		</div>
	);
}
