import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import axios, { AxiosError } from 'axios';
import { ENDPOINTS } from '../../constants';
import { Link, useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

type LoginFormValues = {
	email: string;
	password: string;
};

type LoginResponse = {
	data: {
		name: string;
		accessToken: string;
		venueManager: boolean;
	};
};

export default function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [apiError, setApiError] = useState('');
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: {errors},
	} = useForm<LoginFormValues>();

	const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
		setApiError('');

		try {
			const response = await axios.post<LoginResponse>(ENDPOINTS.login, data);
			const {name, accessToken, venueManager} = response.data.data;

			localStorage.setItem('SFUsername', name);
			localStorage.setItem('SFToken', accessToken);
			localStorage.setItem('SFRole', venueManager ? 'true' : 'false');

			// ✅ Show success toast
			toast.success('Login successful!', {
				duration: 6000,
				position: 'top-center',
				style: {
					marginTop: '64px',
				},
			});

			// Redirect after a short delay to let the toast show
			setTimeout(() => {
				navigate(venueManager ? `/admin/${name}` : '/');
			}, 1000);
		} catch (error) {
			const err = error as AxiosError<{ errors?: { message?: string } }>;
			const message = Array.isArray(err.response?.data?.errors)
				? err.response?.data?.errors[0]?.message
				: err.response?.data?.errors?.message;

			setApiError(message || 'Login failed');
		}
	};

	return (
		<div
			className="flex my-10 items-center justify-center bg-gradient-to-br from-green-700-100 via-white to-green-50">
			<Toaster /> {/* 🔥 Toast container */}

			<div
				className="bg-white px-10 py-12 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-primary/50">
				<h2 className="text-3xl font-bold text-primary mb-2">Welcome back!</h2>
				<p className="text-gray-600 mb-6">Please login to your account.</p>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
					<div className="text-left">
						<label className="block mb-1 text-sm text-gray-700 font-medium">Email Address</label>
						<input
							type="email"
							placeholder="example@stud.noroff.no"
							{...register('email', {
								required: 'Email is required',
								pattern: {
									value: /^[^\s@]+@stud\.noroff\.no$/,
									message: 'Only @stud.noroff.no emails allowed',
								},
							})}
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-primary"
						/>
						{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
					</div>

					<div className="text-left">
						<label className="block mb-1 text-sm text-gray-700 font-medium">Password</label>
						<div className="relative">
							<input
								type={showPassword ? 'text' : 'password'}
								placeholder="Enter your password"
								{...register('password', {
									required: 'Password is required',
									minLength: {
										value: 8,
										message: 'Password must be at least 8 characters',
									},
								})}
								className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
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

					<div className="flex justify-between w-full items-center text-sm text-gray-600">
						<div className="flex items-center w-full">
							<input type="checkbox" className="h-3 w-[20%]" />
							<label className="flex items-center w-full">
								Remember me
							</label>

						</div>
						<a href="#" className="text-red-500 w-full text-end hover:underline">Forgot password?</a>
					</div>

					{apiError && (
						<div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">
							{apiError}
						</div>
					)}

					<button
						type="submit"
						className="w-full py-2 px-4 rounded-xl bg-primary text-white font-semibold hover:bg-background transition"
					>
						Sign In
					</button>
				</form>

				<div className="text-center mt-6">
					<p className="text-sm text-gray-600 font-thin">
						Don’t have an account?{' '}
						<Link to="/register" className="text-primary font-medium hover:underline">
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
