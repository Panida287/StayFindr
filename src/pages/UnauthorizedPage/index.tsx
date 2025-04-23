import { useNavigate } from 'react-router-dom';

export default function UnauthorizedPage() {
	const navigate = useNavigate();

	return (
		<div className="text-center mt-16">
			<h1 className="text-3xl font-bold text-red-600">Access Denied</h1>
			<p className="text-gray-600 mt-2 mb-6">
				You do not have permission to view this page.
			</p>
			<button
				onClick={() => navigate('/')}
				className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700"
			>
				Go to Homepage
			</button>
		</div>
	);
}
