import { useFetchVenuesByProfile } from '../../../hooks/useFetchVenuesByProfile.ts';
import AdminStats from '../../../components/accounts/AdminStats.tsx';
import VenueOverview from '../../../components/accounts/VenueOverview.tsx';

export default function AdminPage() {
    const { venues, isLoading, error } = useFetchVenuesByProfile();

    if (isLoading) return <p>Loading profile...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <>
            <h1 className="justify-self-center text-3xl font-bold mb-4">Admin Dashboard</h1>
            <AdminStats venues={venues} />
            <VenueOverview venues={venues} />
        </>
    );
}
