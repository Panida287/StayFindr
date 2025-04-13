import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import axios, { AxiosError } from "axios";
import { ENDPOINTS } from '../../constants.ts';
import { Link, useNavigate } from 'react-router-dom';

type LoginFormValues = {
	email: string;
	password: string;
};

type LoginResponse = {
	data: {
		name: string;
		accessToken: string;
	}
};

export default function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [apiError, setApiError] = useState("");
	const navigate = useNavigate();
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>();

	const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
		setApiError("");
		try {
			const response = await axios.post<LoginResponse>(ENDPOINTS.login, data);
			console.log("Login success:", response.data);

			localStorage.setItem("SFUsername", response.data.data.name);
			localStorage.setItem("SFToken", response.data.data.accessToken);

			navigate("/");

		} catch (error) {
			const err = error as AxiosError<{ errors?: { message?: string } }>;
			console.error(err);
			const message = Array.isArray(err.response?.data?.errors)
				? err.response?.data?.errors[0]?.message
				: err.response?.data?.errors?.message;
			setApiError(message || "");
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-100">
			<div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md overflow-hidden">
				<h2 className="text-2xl font-semibold mb-2 text-pink-600">Welcome back!</h2>
				<p className="mb-6 text-gray-600">Please login to your account.</p>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
					<div>
						<label className="block mb-1 text-gray-700">Email Address</label>
						<input
							type="email"
							placeholder="example@stud.noroff.no"
							{...register("email", {
								required: "Email is required",
								pattern: {
									value: /^[^\s@]+@stud\.noroff\.no$/,
									message: "Only @stud.noroff.no emails allowed",
								},
							})}
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
						/>
						{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
					</div>

					<div>
						<label className="block mb-1 text-gray-700">Password</label>
						<div className="relative">
							<input
								type={showPassword ? "text" : "password"}
								placeholder="Enter your password"
								{...register("password", {
									required: "Password is required",
									minLength: {
										value: 8,
										message: "Password must be at least 8 characters",
									},
								})}
								className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
							>
								{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
							</button>
						</div>
						{errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
					</div>

					<div className="flex justify-between items-center text-sm">
						<label className="flex items-center">
							<input type="checkbox" className="mr-2" /> Remember me
						</label>
						<a href="#" className="text-sm text-red-500 hover:underline">
							Forgot password?
						</a>
					</div>

					{apiError && (
						<div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
							{apiError}
						</div>
					)}

					<button
						type="submit"
						className="w-full py-2 px-4 rounded-md text-white font-semibold bg-pink-600"
					>
						Sign In
					</button>
				</form>


				<div className="text-center mt-6">
					<p className="text-sm">
						Don’t have an account? <Link to="/register" className="text-pink-600 hover:underline">Sign up</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
