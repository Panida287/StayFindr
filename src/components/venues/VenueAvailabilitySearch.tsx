import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type Amenities = {
	wifi: boolean;
	parking: boolean;
	breakfast: boolean;
	pets: boolean;
};

type Props = {
	onSearch: (params: {
		city: string;
		guests: number;
		dateFrom: string;
		dateTo: string;
		amenities: Amenities;
	}) => void;
	initialCity?: string;
	initialGuests?: number;
	initialDateFrom?: string;
	initialDateTo?: string;
	initialAmenities?: Amenities;
};

export default function VenueAvailabilitySearch({
	                                                onSearch,
	                                                initialCity = '',
	                                                initialGuests = 1,
	                                                initialDateFrom = '',
	                                                initialDateTo = '',
	                                                initialAmenities = {
		                                                wifi: false,
		                                                parking: false,
		                                                breakfast: false,
		                                                pets: false,
	                                                },
                                                }: Props) {
	const [city, setCity] = useState(initialCity);
	const [guests, setGuests] = useState(initialGuests);
	const [dateRange, setDateRange] = useState<[Date | null, Date | null]>(() => {
		const start = initialDateFrom ? new Date(initialDateFrom) : null;
		const end = initialDateTo ? new Date(initialDateTo) : null;
		return [start, end];
	});
	const [amenities, setAmenities] = useState<Amenities>(initialAmenities);

	useEffect(() => {
		setCity(initialCity);
		setGuests(initialGuests);
		setDateRange([
			initialDateFrom ? new Date(initialDateFrom) : null,
			initialDateTo ? new Date(initialDateTo) : null,
		]);
		setAmenities(initialAmenities);
	}, [initialCity, initialGuests, initialDateFrom, initialDateTo, initialAmenities]);

	const [startDate, endDate] = dateRange;

	const handleSearch = () => {
		onSearch({
			city: city.trim(),
			guests,
			dateFrom: startDate ? startDate.toISOString() : '',
			dateTo: endDate ? endDate.toISOString() : '',
			amenities,
		});
	};

	return (
		<div className="bg-cream p-6 rounded-xl max-w-md w-full mx-auto space-y-4">
			<h2 className="text-2xl font-bold text-olive">Find your next stay</h2>
			<p className="text-gray-600">Curated stays, effortless booking, and cozy getaways await.</p>

			{/* City / Search input */}
			<input
				type="text"
				placeholder="Search by city, country, or venue name"
				value={city}
				onChange={(e) => setCity(e.target.value)}
				className="w-full px-4 py-2 border rounded"
			/>

			{/* Date picker */}
			<DatePicker
				selectsRange
				startDate={startDate}
				endDate={endDate}
				onChange={(dates) => setDateRange(dates)}
				placeholderText="Check-in > Check-out"
				minDate={new Date()}
				className="w-full px-4 py-2 border rounded"
			/>

			{/* Guests counter */}
			<div className="flex items-center justify-between border px-4 py-2 rounded">
				<span>Guests</span>
				<div className="flex items-center gap-3">
					<button
						onClick={() => setGuests((g) => Math.max(1, g - 1))}
						className="px-2 py-1 bg-gray-100 rounded"
					>
						-
					</button>
					<span>{guests}</span>
					<button
						onClick={() => setGuests((g) => g + 1)}
						className="px-2 py-1 bg-gray-100 rounded"
					>
						+
					</button>
				</div>
			</div>

			{/* Amenity checkboxes */}
			<div className="grid grid-cols-2 gap-2 text-sm">
				{(['wifi', 'parking', 'breakfast', 'pets'] as const).map((key) => (
					<label key={key} className="flex items-center gap-2">
						<input
							type="checkbox"
							checked={amenities[key]}
							onChange={() =>
								setAmenities((prev) => ({ ...prev, [key]: !prev[key] }))
							}
						/>
						<span className="capitalize">{key}</span>
					</label>
				))}
			</div>

			{/* Search button */}
			<button
				onClick={handleSearch}
				className="w-full bg-olive text-white py-2 rounded hover:bg-olive-dark"
			>
				Search
			</button>
		</div>
	);
}
