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
		<div className="relative z-10 max-w-6xl mx-auto px-4">
			<div className="bg-white rounded-lg shadow-md flex flex-wrap items-center gap-2 md:gap-4 px-4 py-3">

				{/* City */}
				<input
					type="text"
					placeholder="Room / City"
					value={city}
					onChange={(e) => setCity(e.target.value)}
					className="flex-1 px-4 w-30 py-2 w-24 rounded-full bg-gray-50 border border-gray-200 text-sm"
				/>

				<span className="h-10 w-[1px] bg-secondary"/>

				{/* Check-in / out */}
				<DatePicker
					selectsRange
					startDate={startDate}
					endDate={endDate}
					onChange={(dates) => setDateRange(dates)}
					placeholderText="Check-in → Check-out"
					minDate={new Date()}
					className="flex-1 px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-sm"
				/>

				{/* Guests */}
				<div className="flex-1 min-w-[120px] flex items-center justify-between bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm">
					<span>Guests</span>
					<div className="flex items-center gap-2">
						<button
							onClick={() => setGuests((g) => Math.max(1, g - 1))}
							className="px-2 bg-gray-100 rounded-full"
						>
							–
						</button>
						<span>{guests}</span>
						<button
							onClick={() => setGuests((g) => g + 1)}
							className="px-2 bg-gray-100 rounded-full"
						>
							+
						</button>
					</div>
				</div>

				{/* Search Button */}
				<button
					onClick={handleSearch}
					className="px-6 py-2 bg-black text-white text-sm rounded-full hover:bg-gray-900 transition"
				>
					Check Availability
				</button>
			</div>
		</div>
	);
}
