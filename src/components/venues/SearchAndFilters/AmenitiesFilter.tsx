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

const AmenitiesFilter = ({ amenities, onChange, onApply }: Props) => {
	const handleChange = (key: keyof Amenities) => {
		onChange({ ...amenities, [key]: !amenities[key] });
	};

	return (
		<div className="bg-white p-6 rounded-lg shadow-lg w-[calc(100%-2rem)] max-w-xl mx-auto">
			<h2 className="text-xl w-full text-center">Filter by Amenities</h2>
			<div className="flex flex-col pt-4 text-sm sm:flex-row sm:justify-around">
				{(Object.keys(amenities) as (keyof Amenities)[]).map((key) => (
					<label key={key} className="flex items-center space-x-2">
						<input
							type="checkbox"
							checked={amenities[key]}
							onChange={() => handleChange(key)}
							className="accent-primary"
						/>
						<span className="capitalize">{key}</span>
					</label>
				))}
			</div>

			<div className="mt-4 flex justify-center">
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
};

export default AmenitiesFilter;
