import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import VenueForm from '../../../../components/venues/AddVenueForm/VenueForm.tsx';
import { useCreateVenue } from '../../../../hooks/useCreateVenue.ts';
import { VenueFormValues } from '../../../../types/forms.ts';
import toast from 'react-hot-toast';

export default function AddNewVenuePage() {
	const navigate = useNavigate();
	const [apiError, setApiError] = useState('');
	const { createVenue, isLoading } = useCreateVenue({
		onError: (msg) => setApiError(msg),
	});

	const handleCreateSubmit = async (formData: VenueFormValues) => {
		if (formData.rating !== undefined) formData.rating = Number(formData.rating);
		const success = await createVenue(formData);
		if (success) {
			const username = localStorage.getItem('SFUsername');
			toast.success('Property created successfully!', {
				duration: 6000,
				style: {
					marginTop: '64px',
				},
			} );
			navigate(`/admin/${username}/manage-venues`);
		}
	};

	return (
		<div className="mx-auto mt-12">

			<div className="bg-white/80 border border-gray-300 rounded-2xl shadow-lg p-4">
				{apiError && (
					<div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md">
						{apiError}
					</div>
				)}

				<VenueForm
					onSubmitHandler={handleCreateSubmit}
					isLoading={isLoading}
					apiError={apiError}
				/>

			</div>
		</div>
	);
}