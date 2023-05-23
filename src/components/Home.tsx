import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { searchRepositories } from './api';
import logo from './logo.png';

const Home: React.FC = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    navigate(`/search?q=${query}`);
  };

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <img src={logo} alt="Logo" style={{ height: '40px', marginRight: '10px' }} />
      <h1>GitHub Repository Search</h1>
      </div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter repository name"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
};

export default Home;
