type Amenities = {
	wifi: boolean;
	parking: boolean;
	breakfast: boolean;
	pets: boolean;
};

type Props = {
	amenities: Amenities;
	onChange: (updated: Amenities) => void;
};

const AmenitiesFilter = ({ amenities, onChange }: Props) => {
	const handleChange = (key: keyof Amenities) => {
		onChange({ ...amenities, [key]: !amenities[key] });
	};

	return (
		<div className="grid grid-cols-2 gap-4">
			{(Object.keys(amenities) as (keyof Amenities)[]).map((key) => (
				<label key={key} className="flex items-center space-x-2">
					<input
						type="checkbox"
						checked={amenities[key]}
						onChange={() => handleChange(key)}
						className="accent-yellow-500"
					/>
					<span className="capitalize">{key}</span>
				</label>
			))}
		</div>
	);
};

export default AmenitiesFilter;
