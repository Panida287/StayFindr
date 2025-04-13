export default function RegisterTypeSelector({
	                                             accountType,
	                                             setAccountType,
                                             }: {
	accountType: "traveler" | "manager" | null;
	setAccountType: (value: "traveler" | "manager") => void;
}) {

	return (
		<div className="relative flex w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden mx-auto mt-10">
			<div
				className={`absolute top-0 left-0 w-1/2 h-full border-2 border-pink-600 rounded-xl z-0 transition-transform duration-300 ease-in-out ${
					accountType === "traveler" ? "translate-x-0" : "translate-x-full"
				}`}
				style={{ pointerEvents: "none" }}
			/>

			{/* Traveler Card */}
			<div
				onClick={() => setAccountType("traveler")}
				className={`relative z-10 flex-1 p-8 text-center cursor-pointer transition-colors ${
					accountType === "traveler" ? "bg-pink-50" : "bg-white"
				}`}
			>
				<div className="text-pink-600 text-4xl mb-4">🧳</div>
				<h2 className="text-xl font-semibold mb-2">Traveler Account</h2>
				<p className="text-gray-500 mb-4">
					Perfect for those looking to book and experience amazing stays
				</p>
				<ul className="text-sm text-left mx-auto max-w-xs space-y-1 text-gray-700">
					<li>✔ Book unique accommodations</li>
					<li>✔ Save favorite properties</li>
					<li>✔ Review your stays</li>
				</ul>
				<button
					className={`mt-6 py-2 px-6 rounded-md font-semibold ${
						accountType === "traveler"
							? "bg-pink-600 text-white"
							: "border border-pink-600 text-pink-600"
					}`}
				>
					Register as Traveler
				</button>
			</div>

			{/* Host Card */}
			<div
				onClick={() => setAccountType("manager")}
				className={`relative z-10 flex-1 p-8 text-center cursor-pointer transition-colors ${
					accountType === "manager" ? "bg-pink-50" : "bg-white"
				}`}
			>
				<div className="text-pink-600 text-4xl mb-4">🏨</div>
				<h2 className="text-xl font-semibold mb-2">Venue Manager Account</h2>
				<p className="text-gray-500 mb-4">
					Ideal for property owners looking to host guests
				</p>
				<ul className="text-sm text-left mx-auto max-w-xs space-y-1 text-gray-700">
					<li>✔ List your properties</li>
					<li>✔ Manage bookings</li>
					<li>✔ Earn from your space</li>
				</ul>
				<button
					className={`mt-6 py-2 px-6 rounded-md font-semibold ${
						accountType === "manager"
							? "bg-pink-600 text-white"
							: "border border-pink-600 text-pink-600"
					}`}
				>
					Register as Host
				</button>
			</div>
		</div>
	);
}
