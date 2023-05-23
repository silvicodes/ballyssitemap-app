import axios from 'axios';

const BASE_URL = 'https://api.github.com';

export async function searchRepositories(query: string) {
  try {
    const response = await axios.get(`${BASE_URL}/search/repositories`, {
      params: {
        q: query,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error searching repositories:', error);
    throw error;
  }
}

export async function getRepositoryDetails(owner: string, repo: string) {
  try {
    const response = await axios.get(`${BASE_URL}/repos/${owner}/${repo}`);
    return response.data;
  } catch (error) {
    console.error('Error getting repository details:', error);
    throw error;
  }
}
