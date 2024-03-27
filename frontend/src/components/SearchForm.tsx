import { SyntheticEvent } from 'react';

interface SearchFormProps {
  handleSearch: (e: SyntheticEvent) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  setSearchType: (value: string) => void;
}

const SearchForm = ({
  handleSearch,
  searchTerm,
  setSearchTerm,
  setSearchType,
}: SearchFormProps) => {
  return (
    <form className="form search-form" onSubmit={handleSearch}>
      <label className="form-label" htmlFor="type-select">
        Search For:{' '}
        <select
          id="type-select"
          name="type-select"
          onChange={({ target }) => setSearchType(target.value)}
        >
          <option value="all">All</option>
          <option value="movie">Movies</option>
          <option value="series">TV Series</option>
        </select>
      </label>

      <input
        className="form-text-input"
        type="text"
        value={searchTerm}
        onChange={({ target }) => setSearchTerm(target.value)}
        placeholder="Enter a movie or show"
      />
      <button type="submit" className="btn btn-submit">
        Search
      </button>
    </form>
  );
};

export default SearchForm;
