import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const titles: Record<string, string> = {
	'/': 'Home | StayFindr',
	'/about': 'About | StayFindr',
	'/contact': 'Contact | StayFindr',
	'/login': 'Login | StayFindr',
	'/register': 'Register | StayFindr',
	'/browse': 'Browse | StayFindr',
	'/booking-success': 'Booking Confirmed | StayFindr',
	'/unauthorized': 'Access Denied | StayFindr',
};
export default function TitleSetter() {
	const location = useLocation();

	useEffect(() => {
		document.title = titles[location.pathname] || 'StayFindr';
	}, [location.pathname]);

	return null;
}
