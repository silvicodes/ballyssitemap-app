import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './components/Home';
import SearchResults from './components/SearchResults';
import RepoDetail from './components/RepoDetail';
import RepositoryCode from './components/RepositoryCode';
import axios, { AxiosResponse } from 'axios';

interface Repository {
  name: string;
  description: string;
  // Add other properties as needed
}

interface User {
  name: string;
  bio: string;
  // Add other properties as needed
}

const App: React.FC = () => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [user, setUser] = useState<User>({ name: 'Silvia Garcia', bio: 'This is a small coding test from Ballys' });

  const fetchRepositories = async (searchQuery: string = ''): Promise<void> => {
    try {
      const response: AxiosResponse<any> = await axios.get('https://api.github.com/search/repositories', {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
        params: {
          q: searchQuery,
        },
      });

      if (response.status === 200) {
        const repositoriesData: Repository[] = response.data.items;
        setRepositories(repositoriesData);
      } else {
        console.log('Request failed with status:', response.status);
        // Handle error state
      }
    } catch (error) {
      console.log('An error occurred:', error);
      // Handle error state
    }
  };

  const fetchUserDetails = async (): Promise<void> => {
    try {
      const response: AxiosResponse<any> = await axios.get('https://api.github.com/users/silvicodes', {
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_GITHUB_TOKEN}`,
        },
      });

      if (response.status === 200) {
        const userData: User = response.data;
        setUser(userData);
      } else {
        console.log('Request failed with status:', response.status);
        // Handle error state
      }
    } catch (error) {
      console.log('An error occurred:', error);
      // Handle error state
    }
  };

  useEffect(() => {
    fetchRepositories(); // Fetch all repositories by default
    fetchUserDetails(); // Fetch user details
  }, []);

  const onSearch = (searchQuery: string): void => {
    fetchRepositories(searchQuery);
  };

  return (
    <Router>
      <div className="container mt-4">
        <header className="text-center">
          <h1 className="title">Ballys Sitemap App</h1>
        </header>
        <nav>
          <Link to="/" className="go-back-button">
            Go Back
          </Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/search"
            element={<SearchResults setRepositories={setRepositories} onSearch={onSearch} />}
          />
          <Route path="/repo/:repoName" element={<RepoDetail setRepositories={setRepositories} />} />
          <Route path="/repository-code" element={<RepositoryCode />} />
        </Routes>
        {user && (
          <footer className="footer">
            <p>Created by Silvia Garcia</p>
          </footer>
        )}
      </div>
    </Router>
  );
};

export default App;
