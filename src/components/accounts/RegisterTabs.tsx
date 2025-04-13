import { useState } from "react";

export default function RegisterTabs() {
	const [accountType, setAccountType] = useState("traveler");

	const tabColors = {
		traveler: {
			primary: "bg-pink-600",
			text: "text-pink-600",
		},
		manager: {
			primary: "bg-blue-600",
			text: "text-blue-600",
		},
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-0 rounded-xl shadow-lg w-full max-w-md overflow-hidden">
				<div className="flex justify-between">
					<button
						onClick={() => setAccountType("traveler")}
						className={`w-1/2 py-2 font-semibold transition-all duration-300 ${
							accountType === "traveler"
								? `${tabColors.traveler.primary} text-white`
								: "bg-gray-200 text-gray-700"
						}`}
					>
						Traveler
					</button>
					<button
						onClick={() => setAccountType("manager")}
						className={`w-1/2 py-2 font-semibold transition-all duration-300 ${
							accountType === "manager"
								? `${tabColors.manager.primary} text-white`
								: "bg-gray-200 text-gray-700"
						}`}
					>
						Host
					</button>
				</div>

				<div className="relative h-[620px] overflow-hidden">
					<div
						className="flex transition-transform duration-500 w-[200%]"
						style={{ transform: accountType === "traveler" ? "translateX(0%)" : "translateX(-50%)" }}
					>
						{(["traveler", "manager"] as const).map((type) => (
							<div key={type} className="w-full px-8 py-6">
								<h2 className={`text-2xl font-semibold mb-2 ${tabColors[type].text}`}>Welcome back!</h2>
								<p className="mb-6 text-gray-600">Please login to your {type} account.</p>

								<form className="space-y-4">
									<div>
										<label className="block mb-1 text-gray-700">Email Address</label>
										<input
											type="email"
											placeholder="Enter your email"
											className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
										/>
									</div>

									<div>
										<label className="block mb-1 text-gray-700">Password</label>
										<input
											type="password"
											placeholder="Enter your password"
											className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
										/>
									</div>

									<div className="flex justify-between items-center text-sm">
										<label className="flex items-center">
											<input type="checkbox" className="mr-2" /> Remember me
										</label>
										<a href="#" className="text-sm text-red-500 hover:underline">
											Forgot password?
										</a>
									</div>

									<button
										type="submit"
										className={`w-full py-2 px-4 rounded-md text-white font-semibold ${tabColors[type].primary}`}
									>
										Log In
									</button>
								</form>

								<div className="text-center mt-6">
									<p className="text-sm">
										Don’t have an account? <a href="#" className="text-pink-600 hover:underline">Sign up</a>
									</p>
									<div className="relative mt-4 mb-2">
										<hr className="border-gray-300" />
										<span className="absolute left-1/2 transform -translate-x-1/2 -top-2 bg-white px-2 text-sm text-gray-400">
                      Or continue with
                    </span>
									</div>
									<div className="flex justify-around mt-4">
										<button className="border px-4 py-2 rounded-md">
											<span className="text-red-500 font-bold">G</span>
										</button>
										<button className="border px-4 py-2 rounded-md">
											<span className="text-blue-500 font-bold">f</span>
										</button>
										<button className="border px-4 py-2 rounded-md">
											<span className="text-black font-bold"></span>
										</button>
									</div>
								</div>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
