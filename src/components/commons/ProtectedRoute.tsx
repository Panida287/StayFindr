import { Navigate } from 'react-router-dom';

type Props = {
	children: React.ReactNode;
	requiredRole?: 'venueManager';
};

export default function ProtectedRoute({ children, requiredRole }: Props) {
	const role = localStorage.getItem('SFRole');

	if (requiredRole === 'venueManager' && role !== 'true') {
		return <Navigate to="/unauthorized" replace />;
	}

	return <>{children}</>;
}

