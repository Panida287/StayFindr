import { CommonButton } from '../../commons/Buttons.tsx';

type Amenities = {
	wifi: boolean;
	parking: boolean;
	breakfast: boolean;
	pets: boolean;
};

type Props = {
	amenities: Amenities;
	onChange: (updated: Amenities) => void;
	onApply: () => void;
};

export default function AmenitiesFilter({ amenities, onChange, onApply }: Props) {
	const handleToggle = (key: keyof Amenities) =>
		onChange({ ...amenities, [key]: !amenities[key] });

	return (
		<div className="sticky top-20 bg-white p-6 rounded-lg shadow-lg w-1/2 mx-auto md:w-full">
			<h2 className="text-xl font-medium mb-4 text-center md:text-left">
				Filter by Amenities
			</h2>

			<div className="flex space-y-3 sm:flex-col">
				{(['wifi', 'parking', 'breakfast', 'pets'] as (keyof Amenities)[]).map((key) => (
					<label key={key} className="flex items-center space-x-2">
						<input
							type="checkbox"
							checked={amenities[key]}
							onChange={() => handleToggle(key)}
							className="accent-primary h-4 w-4"
						/>
						<span className="capitalize">{key}</span>
					</label>
				))}
			</div>

			<div className="mt-6 flex justify-center">
				<CommonButton
					onClick={onApply}
					bgColor="bg-primary"
					hoverColor="hover:bg-background"
					textColor="text-white"
				>
					Apply Filter
				</CommonButton>
			</div>
		</div>
	);
}
