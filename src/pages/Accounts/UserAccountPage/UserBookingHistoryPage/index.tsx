import { useState, useMemo } from 'react';
import { useFetchProfile } from '../../../../hooks/useFetchProfile.ts';
import UserHistoryBookings from '../../../../components/accounts/UserHistoryBookings.tsx';
import Pagination from '../../../../components/commons/Pagination.tsx';

export default function UserBookingHistoryPage() {
	const { profile, fetchProfile } = useFetchProfile();

	const [currentPage, setCurrentPage] = useState(1);
	const ITEMS_PER_PAGE = 3;

	const allBookings = useMemo(() => {
		if (!profile) return [];
		const now = new Date();
		return profile.bookings
			.filter(b => new Date(b.dateFrom) <= now)
			.sort(
				(a, b) =>
					new Date(b.dateFrom).getTime() - new Date(a.dateFrom).getTime()
			);
	}, [profile]);

	const pageCount = Math.ceil(allBookings.length / ITEMS_PER_PAGE);

	const paginatedBookings = useMemo(() => {
		const start = (currentPage - 1) * ITEMS_PER_PAGE;
		return allBookings.slice(start, start + ITEMS_PER_PAGE);
	}, [allBookings, currentPage]);

	if (!profile) {
		return <p className="p-8 text-center">Loading profile…</p>;
	}

	return (
		<>
			<div>
				<h2 className="text-4xl mb-4">Booking History</h2>

				<UserHistoryBookings
					bookings={paginatedBookings}
					refreshBookings={fetchProfile}
				/>

				<Pagination
					currentPage={currentPage}
					pageCount={pageCount}
					onPageChange={setCurrentPage}
				/>
			</div>
		</>
	);
}
