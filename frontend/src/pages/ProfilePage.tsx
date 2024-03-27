import { MovieResult, SeriesResult, UserType } from '../utils/types';

interface ProfilePageProps {
  loggedInUser: UserType | null;
  savedMovies: MovieResult[];
  savedSeries: SeriesResult[];
}

const ProfilePage = ({
  loggedInUser,
  savedMovies,
  savedSeries,
}: ProfilePageProps) => {
  return <div className="page profile-page"></div>;
};

export default ProfilePage;
