import { SyntheticEvent, useEffect, useState } from 'react';

import { ApiResultType, UserType } from '../utils/types';
import { useNavigate } from 'react-router-dom';
import { searchForTitle } from '../services/apiService';

interface HomePageProps {
  loggedInUser: UserType | null;
}

const HomePage = ({ loggedInUser }: HomePageProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<ApiResultType[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    console.log('useEffect loggedInUser:', loggedInUser);

    if (!loggedInUser) {
      navigate('/login');
    }
  });

  const handleSearch = async (e: SyntheticEvent) => {
    e.preventDefault();

    const results = await searchForTitle(searchTerm);
    console.log('results:', results);
    setSearchResults(results);
  };

  return (
    <div className="page home-page">
      <h2>Logged In User: {loggedInUser?.username}</h2>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={searchTerm}
          onChange={({ target }) => setSearchTerm(target.value)}
          placeholder="Search for a movie or show"
        />
        <button type="submit" className="btn btn-submit">
          Search
        </button>
      </form>

      <div className="results-container">
        {searchResults.map((result, index) => (
          <div key={index}>
            <p>Result: {result.title || result.name}</p>
            <img
              style={{ height: 100, width: 100 }}
              src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
              alt="poster"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
