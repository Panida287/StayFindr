import { FC } from 'react';
import { Link } from 'react-router-dom';
import { Venue } from '../../types/venues';
import VenueCard from './VenueCard';
import { SearchParams } from '../../App';
import LoadingSpinner from '../commons/LoadingSpinner.tsx';

interface VenueListProps {
  venues: Venue[];
  isLoading: boolean;
  error: string | null;
  filters?: SearchParams;    // ← receive them
}

const VenueList: FC<VenueListProps> = ({ venues, isLoading, error, filters }) => {
  if (isLoading) {
    return (
        <div className="flex justify-center items-center h-[500px] w-full">
          <LoadingSpinner size={64} colorClass="text-primary" />
        </div>
    );
  }

  if (error)     return <p className="text-red-600">{error}</p>;

  return (
    <div className="grid gap-6">
      {venues.map(v => (
        <Link
          key={v.id}
          to={`/venue/${v.id}`}
          state={{ params: filters }}   // ← forward them
        >
          <VenueCard venue={v} />
        </Link>
      ))}
    </div>
  );
};

export default VenueList;
