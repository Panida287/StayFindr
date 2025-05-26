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

export default function RegisterForm({ accountType }: { accountType: 'traveler' | 'manager' }) {
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
				style: {
					marginTop: '64px',
				},
			});
			setTimeout(() => {
				setShowModal(true);
			}, 500);
		} catch (error) {
			const err = error as AxiosError<{ errors?: { message?: string }[] | { message?: string } }>;
			const message = Array.isArray(err.response?.data?.errors)
				? err.response?.data.errors[0]?.message
				: err.response?.data?.errors?.message;
			setApiError(message || 'Something went wrong.');
		}
	};

	return (
		<div className="flex items-center justify-center bg-gradient-to-br from-green-700-100 via-white to-green-50">
			<Toaster />
			<div className="bg-white px-10 py-12 rounded-3xl shadow-2xl w-full max-w-md overflow-hidden border border-primary/50">
				<h2 className="text-3xl font-bold text-primary mb-2">Create your account</h2>
				<p className="text-gray-600 mb-6">
					Register as {accountType === 'traveler' ? 'Traveler' : 'Host'}
				</p>

				<form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
					<div>
						<label className="block mb-1 text-sm text-gray-700 font-medium">Username</label>
						<input
							type="text"
							placeholder="Choose a username"
							{...register('name', {
								required: 'Username is required',
								minLength: { value: 3, message: 'At least 3 characters' },
							})}
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
						/>
						{errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
					</div>

					<div>
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
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
						/>
						{errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
					</div>

					<div>
						<label className="block mb-1 text-sm text-gray-700 font-medium">Password</label>
						<div className="relative">
							<input
								type={showPassword ? 'text' : 'password'}
								placeholder="Create a password"
								{...register('password', {
									required: 'Password is required',
									minLength: { value: 8, message: 'Minimum 8 characters' },
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

					<div>
						<label className="block mb-1 text-sm text-gray-700 font-medium">Repeat Password</label>
						<input
							type={showPassword ? 'text' : 'password'}
							placeholder="Repeat your password"
							{...register('repeatPassword', {
								required: 'Please repeat your password',
								validate: (value) =>
									value === getValues('password') || 'Passwords do not match',
							})}
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
						/>
						{errors.repeatPassword && (
							<p className="text-red-500 text-sm mt-1">{errors.repeatPassword.message}</p>
						)}
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
						Register as {accountType === 'traveler' ? 'Traveler' : 'Host'}
					</button>
				</form>
			</div>

			{showModal && (
				<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
					<div className="bg-white p-6 rounded-lg shadow-lg max-w-sm text-center">
						<h3 className="text-xl font-semibold text-primary mb-4">Registration Successful</h3>
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
