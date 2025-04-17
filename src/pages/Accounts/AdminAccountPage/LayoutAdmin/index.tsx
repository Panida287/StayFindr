import { Outlet } from 'react-router-dom';
import ProfileHeader from '../../../../components/accounts/Profile.tsx';
import { useFetchProfile } from '../../../../hooks/useFetchProfile.ts';

export default function LayoutAdmin() {
	const { profile, isLoading, error } = useFetchProfile();

	if (isLoading) return <p>Loading profile...</p>;
	if (error) return <p>Error: {error}</p>;
	if (!profile) return <p>No profile found</p>;

	return (
		<div>
			<ProfileHeader profile={profile} />
			<section>
				<Outlet />
			</section>
		</div>
	);
}
