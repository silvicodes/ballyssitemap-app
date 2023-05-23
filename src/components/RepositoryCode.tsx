import React, { useState } from 'react';
import axios from 'axios';

const RepositoryCode: React.FC = () => {
  const [repositoryName, setRepositoryName] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [repositoryCode, setRepositoryCode] = useState('');

  const handleFetchCode = async () => {
    try {
      const response = await axios.get(`https://api.github.com/repos/${repositoryName}/contents`, {
        headers: {
          Authorization: `Bearer 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`, // Replace with your GitHub personal access token
        },
      });

      if (response.status === 200) {
        const files = response.data;
        const code = files.map((file: any) => file.name).join('\n');
        setRepositoryCode(code);
        setError(null);
      } else {
        console.log('Request failed with status:', response.status);
        setError('Failed to fetch repository code');
      }
    } catch (error) {
      console.log('An error occurred:', error);
      setError('An error occurred while fetching repository code');
    }
  };

  return (
    <div>
      <input
        type="text"
        value={repositoryName}
        onChange={(event) => setRepositoryName(event.target.value)}
        placeholder="Enter repository name"
      />
      <button onClick={handleFetchCode}>Fetch Code</button>
      {error && <p>{error}</p>}
      <pre>{repositoryCode}</pre>
    </div>
  );
};

export default RepositoryCode;
