import { useFetchVenuesByProfile } from '../../../hooks/useFetchVenuesByProfile.ts';
import VenueOverview from '../../../components/accounts/VenueOverview.tsx';
import RecentBookings from '../../../components/bookings/RecentBookings.tsx';
import LoadingSpinner from '../../../components/commons/LoadingSpinner.tsx';

export default function AdminPage() {
    const { venues, isLoading, error } = useFetchVenuesByProfile();

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-[500px] w-full">
                <LoadingSpinner size={64} colorClass="text-primary" />
            </div>
        );
    }

    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <VenueOverview venues={venues} />
            <RecentBookings venues={venues} />
        </>
    );
}
