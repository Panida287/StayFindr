import { Navigate } from 'react-router-dom';
import React from 'react';

type Props = {
	/** The child components to render if access is granted */
	children: React.ReactNode;
	/** Optional role required to access this route */
	requiredRole?: 'venueManager';
};

/**
 * Route guard that redirects users who lack the required role.
 * If `requiredRole` is `"venueManager"` and the user is not a manager,
 * they are redirected to `/unauthorized`.
 */
export default function ProtectedRoute({ children, requiredRole }: Props) {
	const role = localStorage.getItem('SFRole'); // 'true' if venue manager

	const isAuthorized =
		!requiredRole || (requiredRole === 'venueManager' && role === 'true');

	if (!isAuthorized) {
		return <Navigate to="/unauthorized" replace />;
	}

	return <>{children}</>;
}
