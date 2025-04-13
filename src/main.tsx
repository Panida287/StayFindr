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
import AdminAccountPage from './pages/Accounts/AdminAccountPage';
import AddNewVenuePage from './pages/Accounts/AdminAccountPage/AddNewVenuePage';
import EditVenuePage from './pages/Accounts/AdminAccountPage/EditVenuePage';
import MyBookingsPage from './pages/Accounts/UserAccountPage/MyBookingsPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import BookingSuccessPage from './pages/BookingSuccessPage';
import VenueDetailPage from './pages/VenueDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import UserAccountPage from './pages/Accounts/UserAccountPage';
import Layout from './Layout';
import EditProfilePage from './pages/Accounts/UserAccountPage/EditProfilePage';
import { Toaster } from 'react-hot-toast';
import ManageVenuePage from './pages/Accounts/AdminAccountPage/ManageVenuePage';
import ManageBookingsPage from './pages/Accounts/AdminAccountPage/ManageBookingsPage';

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
				path: 'venue/:venueId',
				element: <VenueDetailPage />
			},
			{
				path: 'booking-success',
				element: <BookingSuccessPage />
			},
			{
				path: 'user/:userId',
				element: <UserAccountPage />,
				children: [
					{
						path: 'my-bookings',
						element: <MyBookingsPage />,
					},
				]
			},
			{
				path: 'edit-profile',
				element: <EditProfilePage />,
			},
			{
				path: 'admin/:adminId',
				element: <AdminAccountPage />,
				children: [
					{
						path: 'manage-venues',
						element: <ManageVenuePage />
					},
					{
						path: 'my-bookings',
						element: <MyBookingsPage />
					},
					{
						path: 'manage-bookings',
						element: <ManageBookingsPage />
					},
					{
						path: 'new-venue',
						element: <AddNewVenuePage />
					},
					{
						path: 'edit-venue',
						element: <EditVenuePage />
					}
				]
			},
			{
				path: 'login',
				element: <LoginPage />
			},
			{
				path: 'register',
				element: <RegisterPage />
			}
		]
	},
	{
		path: '*',
		element: <NotFoundPage />,
	}
]);

createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<RouterProvider router={router} />
		<Toaster position="top-center" reverseOrder={false} />
	</StrictMode>
);