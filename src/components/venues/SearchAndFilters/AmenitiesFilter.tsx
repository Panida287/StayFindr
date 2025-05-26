export interface Amenities {
	wifi: boolean;
	parking: boolean;
	breakfast: boolean;
	pets: boolean;
}

export type AmenitiesKey = keyof Amenities;

export interface AmenitiesFilterProps {
	amenities: Amenities;
	onChange: (updated: Amenities) => void;
	onApply: () => void;
}

const AMENITIES: Array<{ key: AmenitiesKey; label: string }> = [
	{ key: 'wifi',           label: 'Has Wifi' },
	{ key: 'parking',        label: 'Has Parking' },
	{ key: 'breakfast', label: 'Includes Breakfast' },
	{ key: 'pets',       label: 'Pets Allowed' },
];

export default function AmenitiesFilter({
	                                        amenities,
	                                        onChange,
	                                        onApply,
                                        }: AmenitiesFilterProps) {
	const handleToggle = (key: AmenitiesKey) => {
		onChange({ ...amenities, [key]: !amenities[key] });
	};

	return (
		<div className="sticky top-20 bg-white p-6 rounded-lg shadow-lg w-full mx-auto">
			<h2 className="text-xl font-medium mb-4 text-center md:text-left">
				Filter by Amenities
			</h2>

			<div className="flex flex-col space-y-3 text-sm">
				{AMENITIES.map(({ key, label }) => (
					<label key={key} className="flex items-center cursor-pointer">
						<input
							type="checkbox"
							checked={amenities[key]}
							onChange={() => handleToggle(key)}
							className="accent-primary h-4 w-4"
						/>
						<span className="ml-2 text-gray-700">{label}</span>
					</label>
				))}
			</div>

			<div className="mt-6 text-center">
				<button
					onClick={onApply}
					className="px-6 py-2 bg-primary text-white rounded-full text-sm shadow hover:bg-primary-dark transition"
				>
					Apply Filter
				</button>
			</div>
		</div>
	);
}
