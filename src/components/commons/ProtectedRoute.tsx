import { Navigate } from 'react-router-dom';

type Props = {
	children: React.ReactNode;
	requiredRole?: 'venueManager';
};

export default function ProtectedRoute({ children, requiredRole }: Props) {
	const profileStr = localStorage.getItem('SFProfile');

	if (!profileStr) {
		return <Navigate to="/unauthorized" replace />;
	}

	try {
		const profile = JSON.parse(profileStr);

		if (requiredRole === 'venueManager' && !profile.venueManager) {
			return <Navigate to="/unauthorized" replace />;
		}

		return <>{children}</>;
	} catch (error) {
		console.error('Error parsing profile:', error);
		return <Navigate to="/unauthorized" replace />;
	}
}
