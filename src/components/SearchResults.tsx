import React, { useState } from 'react';
import { Dispatch, SetStateAction } from 'react';

interface Repository {
  name: string;
  description: string;
  // Add other properties as needed
}

export interface SearchResultsProps {
  onSearch: (results: any) => void;
  setRepositories: (repositories: any[]) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ onSearch, setRepositories }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    onSearch(searchQuery);

    // Simulate API response by setting a mock repository
    const mockRepository: Repository = {
      name: 'ballyssitemap-app',
      description: 'A sample repository',
      // Add other properties as needed
    };

    setRepositories([mockRepository]);
    setError(null);
  };

  return (
    <div>
      <form className="search-form" onSubmit={handleSearch}>
        <input
          type="text"
          value={searchQuery}
          onChange={(event) => setSearchQuery(event.target.value)}
          placeholder="Enter repository name"
        />
        <button type="submit">Search</button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default SearchResults;
