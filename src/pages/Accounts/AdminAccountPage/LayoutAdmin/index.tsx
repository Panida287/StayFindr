import { Outlet } from 'react-router-dom';
import ProfileHeader from '../../../../components/accounts/Profile.tsx';
import AdminTabs from '../../../../components/accounts/AdminTabs.tsx';
import AdminStats from '../../../../components/accounts/AdminStats.tsx';
import { useFetchProfile } from '../../../../hooks/useFetchProfile.ts';
import { useFetchVenuesByProfile } from '../../../../hooks/useFetchVenuesByProfile.ts';

export default function LayoutAdmin() {
	const { profile, isLoading: loadingProfile, error: errorProfile } = useFetchProfile();
	const { venues = [], isLoading: loadingVenues, error: errorVenues } = useFetchVenuesByProfile();

	if (loadingProfile || loadingVenues) {
		return <p className="p-8 text-center">Loading admin data…</p>;
	}
	if (errorProfile || errorVenues) {
		const msg = errorProfile ?? errorVenues;
		return <p className="p-8 text-center text-red-600">Error: {msg}</p>;
	}
	if (!profile) {
		return <p className="p-8 text-center">No profile found.</p>;
	}

	return (
		<div className="w-[calc(100%-2rem)] max-w-5xl mx-auto mt-24">
			<ProfileHeader profile={profile} />
			<AdminStats venues={venues} />
			<AdminTabs />
			<section>
				<Outlet />
			</section>
		</div>
	);
}
