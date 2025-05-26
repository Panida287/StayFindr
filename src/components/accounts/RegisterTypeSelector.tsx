const travelerImg = '/assets/images/ads-images/traveler.jpg';
const hostImg = '/assets/images/ads-images/host.jpg';

/**
 * A UI selector to choose between Traveler and Venue Manager account types.
 * Highlights the selected card with border and background, supports click & keyboard.
 */
export default function RegisterTypeSelector({
	                                             accountType,
	                                             setAccountType,
                                             }: {
	accountType: 'traveler' | 'manager' | null;
	setAccountType: (value: 'traveler' | 'manager') => void;
}) {
	return (
		<div className="relative flex w-full max-w-5xl bg-white rounded-3xl shadow-xl overflow-hidden mx-auto my-16">
			{/* Sliding highlight border */}
			<div
				className={`absolute top-0 left-0 w-1/2 h-full border border-primary rounded-3xl z-0 transition-transform duration-300 ease-in-out ${
					accountType === 'traveler' ? 'translate-x-0' : 'translate-x-full'
				}`}
				style={{ pointerEvents: 'none' }}
			/>

			{/* Traveler Card */}
			<div
				onClick={() => setAccountType('traveler')}
				className={`relative z-10 flex-1 p-10 rounded-3xl text-center cursor-pointer transition-colors ${
					accountType === 'traveler' ? 'bg-primary/5' : ''
				}`}
			>
				<img src={travelerImg} alt="Traveler" className="w-full h-60 object-cover rounded-lg mb-4 shadow-sm" />
				<h2 className="text-2xl font-semibold text-primary mb-2">Traveler Account</h2>
				<p className="text-gray-600 text-sm mb-3">For those looking to book memorable stays.</p>
				<ul className="text-sm text-gray-700 text-left mx-auto max-w-xs space-y-1">
					<li>• Browse & book venues</li>
					<li>• Save favorites</li>
					<li>• Leave reviews</li>
				</ul>
				<button
					className={`mt-4 py-2 px-6 rounded-full font-medium transition ${
						accountType === 'traveler'
							? 'bg-primary text-white'
							: 'border border-primary text-primary hover:bg-primary/10'
					}`}
				>
					Register as Traveler
				</button>
			</div>


			{/* Venue Manager Card */}
			<div
				onClick={() => setAccountType('manager')}
				className={`relative z-10 flex-1 p-10 text-center rounded-3xl cursor-pointer transition-colors ${
					accountType === 'manager' ? 'bg-primary/5' : 'bg-white'
				}`}
			>
				<img src={hostImg} alt="Host" className="w-full h-60 object-cover rounded-lg mb-4 shadow-sm" />
				<h2 className="text-2xl font-semibold text-primary mb-2">Venue Manager Account</h2>
				<p className="text-gray-600 mb-5 text-sm">
					Ideal for property owners looking to host guests and earn income.
				</p>
				<ul className="text-sm text-left mx-auto max-w-xs space-y-1 text-gray-700">
					<li>• List your properties</li>
					<li>• Manage bookings</li>
					<li>• Earn from your space</li>
				</ul>
				<button
					className={`mt-6 py-2 px-6 rounded-full font-medium transition ${
						accountType === 'manager'
							? 'bg-primary text-white'
							: 'border border-primary text-primary hover:bg-primary/10'
					}`}
				>
					Register as Host
				</button>
			</div>
		</div>
	);
}
