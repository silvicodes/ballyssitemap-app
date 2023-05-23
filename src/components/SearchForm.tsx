import React, { useState } from 'react';
import axios, { AxiosError } from 'axios';

const SearchForm: React.FC<{ setRepositories: React.Dispatch<React.SetStateAction<any[]>> }> = ({ setRepositories }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.get(`https://api.github.com/search/repositories?q=${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      });

      const repositories = response.data.items;
      setRepositories(repositories);
      setError(null);
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          console.log('Response data:', error.response.data);
          console.log('Response status:', error.response.status);
          console.log('Response headers:', error.response.headers);
          setError('API Error: ' + error.response.data.message);
        } else if (error.request) {
          console.log('No response received:', error.request);
          setError('An error occurred: No response received');
        } else {
          console.log('Error:', error.message);
          setError('An error occurred: ' + error.message);
        }
      } else {
        console.log('An error occurred:', error);
        setError('An error occurred: ' + error.toString());
      }
    }
  };

  return (
    <form className="search-form" onSubmit={handleSearch}>
      <input
        type="text"
        value={searchQuery}
        onChange={(event) => setSearchQuery(event.target.value)}
        placeholder="Enter repository name"
      />
      <button type="submit">Search</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default SearchForm;
