import { useFetchVenuesByProfile } from '../../../../hooks/useFetchVenuesByProfile.ts';
import ManageVenueCard from '../../../../components/venues/ManageVenueCard.tsx';
import { SplitButton } from '../../../../components/commons/Buttons.tsx';

export default function ManageVenuePage() {
	const {venues, isLoading, error} = useFetchVenuesByProfile();
	const username = localStorage.getItem('SFUsername');

	if (isLoading) {
		return (
			<div className="flex justify-center items-center mt-8">
				{/* spinner */}
				<div
					className="h-12 w-12 border-4 border-t-transparent border-primary rounded-full animate-spin"></div>
			</div>
		);
	}

	if (error) return <p>Error: {error}</p>;

	if (venues.length === 0) {
		return (
			<div className="mt-8 text-center bg-white p-6 rounded-xl shadow-sm">
				<h2 className="text-xl font-semibold mb-2">You don't have any venues listed.</h2>
				<p className="text-gray-500 text-sm mb-4">
					Start by creating your first venue to begin hosting!
				</p>
			</div>
		);
	}

	return (
		<div className="max-w-4xl mt-12 mx-auto">
			<div className="flex flex-col justify-between items-center mb-4 sm:flex-row">
				<h1 className="text-3xl text-start w-full">Manage Venues</h1>
				<div className="w-full flex justify-end">
				<SplitButton
					to={`/admin/${username}/new-venue`}
					text="+ Add New"
					textColor="text-yellow-600"
					hoverTextColor="group-hover:text-yellow-600"
					arrowColor="text-white"
					arrowHoverColor="group-hover:text-yellow-600"
					bgColor="bg-yellow-600"
					borderColor="border-yellow-600"
					className="font-medium"
				/>
				</div>

			</div>

			<div className="grid gap-4">
				{venues.map((venue) => (
					<ManageVenueCard key={venue.id} venue={venue} />
				))}
			</div>
		</div>
	);
}
