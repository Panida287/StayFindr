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
			},
			{
				path: 'admin/:adminId',
				element: <LayoutAdmin />,
				children: [
					{
						path: '',
						element: <AdminPage />
					},
					{
						path: 'manage-venues',
						element: <ManageVenuePage />
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