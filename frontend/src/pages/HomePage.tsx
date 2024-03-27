import { SyntheticEvent, useEffect, useState } from 'react';

import { AllResultsType, UserType } from '../utils/types';
import { useNavigate } from 'react-router-dom';
import { searchForTitle } from '../services/apiService';

interface HomePageProps {
  loggedInUser: UserType | null;
}

const HomePage = ({ loggedInUser }: HomePageProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<AllResultsType>();

  const navigate = useNavigate();

  useEffect(() => {
    console.log('useEffect loggedInUser:', loggedInUser);

    if (!loggedInUser) {
      navigate('/login');
    }
  }, [loggedInUser, navigate]);

  const handleSearch = async (e: SyntheticEvent) => {
    console.log('e:', e);
    e.preventDefault();

    const results = await searchForTitle(searchTerm);
    if (!results) return;

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

      <div className="results-display">
        <h3>Movies</h3>
        {searchResults &&
          searchResults.movies.map((result, index) => (
            <div key={index}>
              <p>Result: {result.title}</p>
            </div>
          ))}
      </div>

      <div className="results-display">
        <h3>Series</h3>
        {searchResults &&
          searchResults.series.map((result, index) => (
            <div key={index}>
              <p>Result: {result.title}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomePage;
