import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './css/style.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'leaflet/dist/leaflet.css';
import 'react-datepicker/dist/react-datepicker.css';
import App from './App.tsx';
import AddNewVenuePage from './pages/Accounts/AdminAccountPage/AddNewVenuePage';
import EditVenuePage from './pages/Accounts/AdminAccountPage/EditVenuePage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import BookingSuccessPage from './pages/BookingSuccessPage';
import VenueDetailPage from './pages/VenueDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import UserAccountPage from './pages/Accounts/UserAccountPage';
import AdminPage from './pages/Accounts/AdminAccountPage';
import Layout from './Layout';
import LayoutAdmin from './pages/Accounts/AdminAccountPage/LayoutAdmin';
import { Toaster } from 'react-hot-toast';
import ManageVenuePage from './pages/Accounts/AdminAccountPage/ManageVenuePage';
import ManageBookingsPage from './pages/Accounts/AdminAccountPage/ManageBookingsPage';
import ProtectedRoute from './components/commons/ProtectedRoute.tsx';
import UnauthorizedPage from './pages/UnauthorizedPage';
import BrowsePage from './pages/BrowsePage';
import LayoutUser from './pages/Accounts/UserAccountPage/LayoutUser';
import UserProfilePage from './pages/Accounts/UserAccountPage/UserProfilePage';
import UserBookingHistoryPage from './pages/Accounts/UserAccountPage/UserBookingHistoryPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Layout />,
		children: [
			{
				path: '',
				element: <App />,
			},
			{
				path: 'browse',
				element: <BrowsePage />,
			},
			{
				path: 'venue/:venueId',
				element: <VenueDetailPage />,
			},
			{
				path: 'booking-success',
				element: <BookingSuccessPage />,
			},
			{
				path: 'user/:userId',
				element: <LayoutUser />,
				children: [
					{
						path: '',
						element: <UserAccountPage />,
					},
					{
						path: 'user-profile',
						element: <UserProfilePage />
					},
					{
						path: 'user-booking-history',
						element: <UserBookingHistoryPage />
					}
				]
			},
			{
				path: 'admin/:adminId',
				element: <LayoutAdmin />,
				children: [
					{
						path: '',
						element: (
							<ProtectedRoute requiredRole="venueManager">
								<AdminPage />
							</ProtectedRoute>
						),
					},
					{
						path: 'manage-venues',
						element: (
							<ProtectedRoute requiredRole="venueManager">
								<ManageVenuePage />
							</ProtectedRoute>
						),
					},
					{
						path: 'manage-bookings',
						element: (
							<ProtectedRoute requiredRole="venueManager">
								<ManageBookingsPage />
							</ProtectedRoute>
						),
					},
					{
						path: 'new-venue',
						element: (
							<ProtectedRoute requiredRole="venueManager">
								<AddNewVenuePage />
							</ProtectedRoute>
						),
					},
					{
						path: 'edit-venue/:venueId',
						element: (
							<ProtectedRoute requiredRole="venueManager">
								<EditVenuePage />
							</ProtectedRoute>
						),
					},
				],
			},
			{
				path: 'login',
				element: <LoginPage />,
			},
			{
				path: 'register',
				element: <RegisterPage />,
			},
			{
				path: 'unauthorized',
				element: <UnauthorizedPage />,
			},
			{
				path: 'about',
				element: <AboutPage />,
			},
			{
				path: 'contact',
				element: <ContactPage />,
			},
		],
	},
	{
		path: '*',
		element: <NotFoundPage />,
	},
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
		<Toaster position="top-center" reverseOrder={false} />
	</StrictMode>
);