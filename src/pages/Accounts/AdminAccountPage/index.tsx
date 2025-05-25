import { useFetchVenuesByProfile } from '../../../hooks/useFetchVenuesByProfile.ts';
import VenueOverview from '../../../components/accounts/VenueOverview.tsx';
import RecentBookings from '../../../components/bookings/RecentBookings.tsx';

export default function AdminPage() {
    const { venues, isLoading, error } = useFetchVenuesByProfile();

    if (isLoading) return <p>Loading profile...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <VenueOverview venues={venues} />
            <RecentBookings venues={venues} />
        </>
    );
}
