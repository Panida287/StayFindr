import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import './css/style.css';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'leaflet/dist/leaflet.css';
import App from './App.tsx';
import AdminPage from './pages/Admin';
import AddNewVenuePage from './pages/Admin/AddNewVenuePage';
import EditVenuePage from './pages/Admin/EditVenuePage';
import UserPage from './pages/UserPage';
import MyBookingPage from './pages/UserPage/MyBookingsPage';
import LoginPage from './pages/Auth/LoginPage';
import RegisterPage from './pages/Auth/RegisterPage';
import BookingSuccessPage from './pages/BookingSuccessPage';
import VenueDetailPage from './pages/VenueDetailPage';
import NotFoundPage from './pages/NotFoundPage';
import Layout from './Layout';
import { Toaster } from 'react-hot-toast';
import ManageVenuePage from './pages/Admin/ManageVenuePage';
import ManageBookingsPage from './pages/Admin/ManageBookingsPage';

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
				element: <UserPage />,
				children: [
					{
						path: 'bookings',
						element: <MyBookingPage />,
					}
				]
			},
			{
				path: 'admin/:adminId',
				element: <AdminPage />,
				children: [
					{
						path: 'manage-venue',
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