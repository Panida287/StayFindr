import { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CommonButton } from '../../commons/Buttons.tsx';

type Amenities = {
	wifi: boolean;
	parking: boolean;
	breakfast: boolean;
	pets: boolean;
};

type Props = {
	onInputChange: (params: {
		city: string;
		guests: number;
		dateFrom: string;
		dateTo: string;
		amenities: Amenities;
	}) => void;
	onSearchClick: () => void;
	initialCity?: string;
	initialGuests?: number;
	initialDateFrom?: string;
	initialDateTo?: string;
	initialAmenities?: Amenities;
};

export type VenueAvailabilitySearchRef = {
	clearForm: () => void;
};

const VenueAvailabilitySearch = forwardRef<VenueAvailabilitySearchRef, Props>(
	(
		{
			onInputChange,
			onSearchClick,
			initialCity = '',
			initialGuests = 2,
			initialDateFrom = '',
			initialDateTo = '',
			initialAmenities = {
				wifi: false,
				parking: false,
				breakfast: false,
				pets: false,
			},
		},
		ref
	) => {
		const [city, setCity] = useState(initialCity);
		const [guests, setGuests] = useState(initialGuests);
		const [dateRange, setDateRange] = useState<[Date | null, Date | null]>(() => {
			const start = initialDateFrom ? new Date(initialDateFrom) : null;
			const end = initialDateTo ? new Date(initialDateTo) : null;
			return [start, end];
		});

		// Reset local state whenever parent props change
		useEffect(() => {
			setCity(initialCity);
			setGuests(initialGuests);
			setDateRange([
				initialDateFrom ? new Date(initialDateFrom) : null,
				initialDateTo   ? new Date(initialDateTo)   : null,
			]);
		}, [initialCity, initialGuests, initialDateFrom, initialDateTo]);

		const [amenities] = useState(initialAmenities);
		const [startDate, endDate] = dateRange;

		useEffect(() => {
			onInputChange({
				city: city.trim(),
				guests,
				dateFrom: startDate ? startDate.toISOString() : '',
				dateTo:   endDate   ? endDate.toISOString()   : '',
				amenities,
			});
		}, [city, guests, startDate, endDate]);

		useImperativeHandle(ref, () => ({
			clearForm: () => {
				setCity('');
				setGuests(2);
				setDateRange([null, null]);
			},
		}));

		return (
			<div className="relative z-50 w-full md:mx-auto">
				<div className="bg-white shadow-md mx-auto flex flex-col items-start gap-4 px-4 py-3 rounded-t-3xl w-full sm:mx-auto sm:w-[calc(100%-2rem)] md:rounded-lg md:max-w-5xl md:flex-row md:flex-wrap">
					{/* Destination */}
					<h1 className="flex text-primary my-4 font-bold flex-wrap w-2/3 md:hidden">
						Find Your Perfect Stay
					</h1>

					<input
						type="text"
						placeholder="Destination / property"
						value={city}
						onChange={(e) => setCity(e.target.value)}
						className="px-4 w-full flex flex-1 py-2 rounded-full bg-gray-50 border border-gray-200 text-sm md:w-56"
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
						className="w-full px-4 py-2 rounded-full bg-gray-50 border border-gray-200 text-sm text-primary"
						wrapperClassName="w-full flex-2 flex md:w-[215px] border-xl"
					/>

					<span className="hidden h-10 w-[1px] bg-secondary md:block" />

					{/* Guests */}
					<div className="flex w-full items-center justify-between bg-gray-50 border border-gray-200 rounded-full px-4 py-2 text-sm md:max-w-40">
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
						onClick={onSearchClick}
						className="bg-primary h-full flex-1 text-white hover:bg-background hover:text-primary w-full md:w-fit"
					>
						Search
					</CommonButton>
				</div>
			</div>
		);
	}
);

export default VenueAvailabilitySearch;
