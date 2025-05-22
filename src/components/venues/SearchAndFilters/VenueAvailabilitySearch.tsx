import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import {CommonButton} from '../../commons/Buttons.tsx';

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
		<div className="relative z-50 w-full px-4">
			<div className="bg-white rounded-lg shadow-md w-full max-w-4xl mx-auto flex flex-col items-start gap-4 px-4 py-3 md:flex-row md:flex-wrap">

				{/* City */}
				<input
					type="text"
					placeholder="Destination or property "
					value={city}
					onChange={(e) => setCity(e.target.value)}
					className="px-4 w-full flex flex-1 py-2 rounded-full bg-gray-50 border border-gray-200 text-sm md:w-40"
				/>

				<span className="hidden h-10 w-[1px] bg-secondary md:block" />

				{/* Check-in / out */}
				<DatePicker
					selectsRange
					startDate={startDate}
					endDate={endDate}
					onChange={(dates) => setDateRange(dates)}
					placeholderText="Check-in → Check-out"
					minDate={new Date()}
					className="w-full px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-sm"
					wrapperClassName="w-full flex-2 flex md:w-48"
				/>

				<span className="hidden h-10 w-[1px] bg-secondary md:block" />

				{/* Guests */}
				<div
					className="flex w-full items-center justify-between bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm md:max-w-40">
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
				<CommonButton
					onClick={handleSearch}
					className="bg-primary flex-1 text-white hover:bg-background hover:text-primary w-full md:w-fit"
				>
					Search
				</CommonButton>
			</div>
		</div>
	);
}
