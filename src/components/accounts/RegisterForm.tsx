import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Eye, EyeOff } from 'lucide-react';
import axios, { AxiosError } from 'axios';
import { ENDPOINTS } from '../../constants.ts';
import { useNavigate } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';

type RegisterFormValues = {
	name: string;
	email: string;
	password: string;
	repeatPassword: string;
};

type Props = {
	/** Account type determines if user registers as venue manager */
	accountType: 'traveler' | 'manager';
};

/**
 * A registration form for new users with validation and Noroff email restriction.
 * Displays a confirmation modal and toast on success.
 */
export default function RegisterForm({ accountType }: Props) {
	const [showPassword, setShowPassword] = useState(false);
	const [apiError, setApiError] = useState('');
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
		getValues,
		reset,
	} = useForm<RegisterFormValues>();

	const onSubmit: SubmitHandler<RegisterFormValues> = async (formData) => {
		setApiError('');
		const payload = {
			name: formData.name,
			email: formData.email,
			password: formData.password,
			venueManager: accountType === 'manager',
		};

		try {
			await axios.post(ENDPOINTS.register, payload);
			reset();
			toast.success('Registration successful!', {
				duration: 6000,
				position: 'top-center',
				style: { marginTop: '64px' },
			});
			setTimeout(() => setShowModal(true), 500);
		} catch (error) {
			const err = error as AxiosError<{ errors?: { message?: string }[] | { message?: string } }>;
			const message = Array.isArray(err.response?.data?.errors)
				? err.response?.data.errors[0]?.message
				: err.response?.data?.errors?.message;
			setApiError(message || 'Something went wrong.');
		}
	};

	return (
		<div className="flex items-center justify-center bg-gradient-to-br from-green-700-100 via-white to-green-50 py-10 px-4">
			<Toaster />

			<div className="bg-white px-10 py-12 rounded-3xl shadow-2xl w-full max-w-md border border-primary/50">
				<h1 className="text-3xl font-bold text-primary mb-2">Create your account</h1>
				<p className="text-gray-600 mb-6">
					Register as {accountType === 'traveler' ? 'Traveler' : 'Host'}
				</p>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-5" aria-label="Register form">
					{/* Username */}
					<div>
						<label htmlFor="username" className="block mb-1 text-sm text-gray-700 font-medium">
							Username
						</label>
						<input
							id="username"
							type="text"
							placeholder="Choose a username"
							{...register('name', {
								required: 'Username is required',
								minLength: { value: 3, message: 'At least 3 characters' },
							})}
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
							aria-invalid={!!errors.name}
						/>
						{errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
					</div>

					{/* Email */}
					<div>
						<label htmlFor="email" className="block mb-1 text-sm text-gray-700 font-medium">
							Email Address
						</label>
						<input
							id="email"
							type="email"
							placeholder="example@stud.noroff.no"
							{...register('email', {
								required: 'Email is required',
								pattern: {
									value: /^[^\s@]+@stud\.noroff\.no$/,
									message: 'Only @stud.noroff.no emails allowed',
								},
							})}
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
							aria-invalid={!!errors.email}
						/>
						{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
					</div>

					{/* Password */}
					<div>
						<label htmlFor="password" className="block mb-1 text-sm text-gray-700 font-medium">
							Password
						</label>
						<div className="relative">
							<input
								id="password"
								type={showPassword ? 'text' : 'password'}
								placeholder="Create a password"
								{...register('password', {
									required: 'Password is required',
									minLength: { value: 8, message: 'Minimum 8 characters' },
								})}
								className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
								aria-invalid={!!errors.password}
							/>
							<button
								type="button"
								onClick={() => setShowPassword(!showPassword)}
								aria-label="Toggle password visibility"
								className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
							>
								{showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
							</button>
						</div>
						{errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
					</div>

					{/* Repeat Password */}
					<div>
						<label htmlFor="repeatPassword" className="block mb-1 text-sm text-gray-700 font-medium">
							Repeat Password
						</label>
						<input
							id="repeatPassword"
							type={showPassword ? 'text' : 'password'}
							placeholder="Repeat your password"
							{...register('repeatPassword', {
								required: 'Please repeat your password',
								validate: (value) =>
									value === getValues('password') || 'Passwords do not match',
							})}
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
							aria-invalid={!!errors.repeatPassword}
						/>
						{errors.repeatPassword && (
							<p className="text-red-500 text-sm mt-1">{errors.repeatPassword.message}</p>
						)}
					</div>

					{/* API Error */}
					{apiError && (
						<div className="p-3 bg-red-100 text-red-700 rounded-md text-sm">{apiError}</div>
					)}

					{/* Submit Button */}
					<button
						type="submit"
						className="w-full py-2 px-4 rounded-xl bg-primary text-white font-semibold hover:bg-background transition"
					>
						Register as {accountType === 'traveler' ? 'Traveler' : 'Host'}
					</button>
				</form>
			</div>

			{/* Success Modal */}
			{showModal && (
				<div
					className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
					role="dialog"
					aria-modal="true"
					aria-label="Registration success"
				>
					<div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
						<h2 className="text-xl font-semibold text-primary mb-4">
							Registration Successful
						</h2>
						<p className="text-gray-600 mb-6">You can now log in to your account.</p>
						<button
							onClick={() => navigate('/login')}
							className="bg-primary text-white px-4 py-2 rounded-md font-semibold hover:bg-background transition"
						>
							Go to Login
						</button>
					</div>
				</div>
			)}
		</div>
	);
}
