import { SyntheticEvent, useEffect, useState } from 'react';

import { AllResultsType, UserType } from '../utils/types';
import { useNavigate } from 'react-router-dom';
import { searchForTitle } from '../services/apiService';
import ResultsDisplay from '../components/ResultsDisplay';
import SearchForm from '../components/SearchForm';
import { thereAreResults } from '../utils/helpers';

interface HomePageProps {
  loggedInUser: UserType | null;
}

const HomePage = ({ loggedInUser }: HomePageProps) => {
  const [searchType, setSearchType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<AllResultsType>({
    movies: [],
    series: [],
  });

  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedInUser) {
      console.log('HomePage navigate to login');
      navigate('/login');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loggedInUser]);

  const handleSearch = async (e: SyntheticEvent) => {
    console.log('e:', e);
    e.preventDefault();

    const results = await searchForTitle(searchTerm, searchType);
    if (!results) return;
    console.log('handleSearch results:', results);
    setSearchResults(results);
  };

  return (
    <div className="page home-page">
      <SearchForm
        handleSearch={handleSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        setSearchType={setSearchType}
      />

      {searchResults && thereAreResults(searchResults) && (
        <>
          <ResultsDisplay label="Movies" results={searchResults.movies} />
          <ResultsDisplay label="TV Series" results={searchResults.series} />
        </>
      )}

      {searchResults && !thereAreResults(searchResults) && (
        <h4>No Results. Try a different search!</h4>
      )}
    </div>
  );
};

export default HomePage;
