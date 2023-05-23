import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export interface RepoDetailProps {
  setRepositories: (repositories: any[]) => void;
}

const RepoDetail: React.FC<RepoDetailProps> = ({ setRepositories }) => {
  const { repoName } = useParams<{ repoName: string }>();
  const [repoData, setRepoData] = useState<any>(null);

  useEffect(() => {
    const fetchRepoDetails = async () => {
      try {
        const response = await axios.get(`https://api.github.com/repos/${repoName}`, {
          headers: {
            Authorization: `Bearer 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`, // Replace with your GitHub personal access token
          },
        });

        if (response.status === 200) {
          const repository = response.data;
          setRepoData(repository);
        } else {
          console.log('Request failed with status:', response.status);
          // Handle error state
        }
      } catch (error) {
        console.log('An error occurred:', error);
        // Handle error state
      }
    };

    fetchRepoDetails();
  }, [repoName]);

  return (
    <div>
      {repoData ? (
        <div>
          <h2>{repoData.name}</h2>
          <p>{repoData.description}</p>
          {/* Additional repository details */}
        </div>
      ) : (
        <p>Loading repository details...</p>
      )}
    </div>
  );
};

export default RepoDetail;
