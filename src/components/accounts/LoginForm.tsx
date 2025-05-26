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

/**
 * Renders the login form with validation, password toggle, and toast feedback.
 */
export default function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);
	const [apiError, setApiError] = useState('');
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormValues>();

	const onSubmit: SubmitHandler<LoginFormValues> = async (data) => {
		setApiError('');

		try {
			const response = await axios.post<LoginResponse>(ENDPOINTS.login, data);
			const { name, accessToken, venueManager } = response.data.data;

			localStorage.setItem('SFUsername', name);
			localStorage.setItem('SFToken', accessToken);
			localStorage.setItem('SFRole', venueManager ? 'true' : 'false');

			toast.success('Login successful!', {
				duration: 6000,
				position: 'top-center',
				style: { marginTop: '64px' },
			});

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
			className="flex my-10 items-center mx-auto w-[calc(100%-2rem)] max-w-4xl justify-center bg-gradient-to-br from-green-700-100 via-white to-green-50"
			aria-labelledby="login-title"
		>
			<Toaster />
			<div className="bg-white px-10 py-12 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-primary/50">
				<h1 id="login-title" className="text-3xl font-bold text-primary mb-2">
					Welcome back!
				</h1>
				<p className="text-gray-600 mb-6">Please login to your account.</p>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-5" aria-label="Login form">
					{/* Email Field */}
					<div className="text-left">
						<label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
							Email Address
						</label>
						<input
							id="email"
							type="email"
							placeholder="example@stud.noroff.no"
							aria-required="true"
							{...register('email', {
								required: 'Email is required',
								pattern: {
									value: /^[^\s@]+@stud\.noroff\.no$/,
									message: 'Only @stud.noroff.no emails allowed',
								},
							})}
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-primary"
						/>
						{errors.email && (
							<p className="text-red-500 text-sm mt-1" role="alert">
								{errors.email.message}
							</p>
						)}
					</div>

					<div className="text-left">
						<label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
							Password
						</label>
						<div className="relative">
							<input
								id="password"
								type={showPassword ? 'text' : 'password'}
								placeholder="Enter your password"
								aria-required="true"
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
								aria-label={showPassword ? 'Hide password' : 'Show password'}
							>
								{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
							</button>
						</div>
						{errors.password && (
							<p className="text-red-500 text-sm mt-1" role="alert">
								{errors.password.message}
							</p>
						)}
					</div>

					<div className="flex justify-between w-full items-center text-sm text-gray-600">
						<div className="flex items-center w-full">
							<input id="remember" type="checkbox" className="h-4 w-4 mr-2" />
							<label htmlFor="remember" className="text-sm">
								Remember me
							</label>
						</div>
						<a href="#" className="text-red-500 hover:underline w-full text-end">
							Forgot password?
						</a>
					</div>

					{apiError && (
						<div
							className="p-3 bg-red-100 text-red-700 rounded-md text-sm"
							role="alert"
							aria-live="polite"
						>
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
					<p className="text-sm text-gray-600">
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
