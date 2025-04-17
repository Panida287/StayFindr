import { Outlet } from "react-router-dom";
import ProfileHeader from '../../../components/accounts/Profile';
import { useFetchProfile } from '../../../hooks/useFetchProfile';


export default function AdminAccountPage() {
    const { profile } = useFetchProfile();

    if (!profile) return <p>Loading profile...</p>;

    return (
        <div>
            <h1 className="text-3xl font-bold mb-4">Admin Dashboard</h1>
            <ProfileHeader profile={profile} />
            <Outlet />
        </div>
    );
}


