import { Link } from "react-router-dom";

export default function NotFoundPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
            <h1 className="text-6xl font-extrabold text-pink-600 mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">Page Not Found</h2>
            <p className="text-gray-600 mb-6">
                Sorry, the page you are looking for doesn’t exist or has been moved.
            </p>
            <Link
                to="/"
                className="inline-block bg-pink-600 text-white px-6 py-3 rounded hover:bg-pink-700 transition"
            >
                Go to Homepage
            </Link>
        </div>
    );
}
