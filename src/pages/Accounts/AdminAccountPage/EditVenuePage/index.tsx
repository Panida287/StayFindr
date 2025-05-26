import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import VenueForm from '../../../../components/venues/AddVenueForm/VenueForm.tsx';
import { useFetchSingleVenue } from '../../../../hooks/useFetchSingleVenue.ts';
import { useUpdateVenue } from '../../../../hooks/useUpdateVenue.ts';
import { VenueFormValues } from '../../../../types/forms.ts';
import LoadingSpinner from '../../../../components/commons/LoadingSpinner.tsx';

export default function EditVenuePage() {
	const { venueId: id } = useParams();
	const navigate = useNavigate();
	const [apiError, setApiError] = useState('');
	const { updateVenue, isUpdating } = useUpdateVenue({
		onError: (message) => setApiError(message),
	});
	const { venue, isLoading, error } = useFetchSingleVenue(id!);

	if (isLoading) {
		return (
			<div className="flex justify-center items-center h-[500px] w-full">
				<LoadingSpinner size={64} colorClass="text-primary" />
			</div>
		);
	}

	if (error) return <p>Error loading venue</p>;
	if (!venue) return <p>Venue not found</p>;

	const initialValues: VenueFormValues = {
		name: venue.name,
		description: venue.description,
		price: venue.price,
		maxGuests: venue.maxGuests,
		rating: venue.rating,
		media: venue.media,
		meta: venue.meta,
		location: venue.location,
	};

	const handleEditSubmit = async (formData: VenueFormValues) => {
		if (formData.rating !== undefined) {
			formData.rating = Number(formData.rating);
		}
		const success = await updateVenue(id!, formData);
		if (success) {
			const username = localStorage.getItem('SFUsername');
			navigate(`/admin/${username}/manage-venues`);
		}
	};

	return (
		<VenueForm
			initialValues={initialValues}
			isEdit
			onSubmitHandler={handleEditSubmit}
			isLoading={isUpdating}
			apiError={apiError}
		/>
	);
}
