import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_KEY;

export const searchForTitle = async (query: string) => {
  const URL = `https://api.themoviedb.org/3/search/multi?query=${query}&api_key=${API_KEY}&sort_by=popularity&order=asc`;
  const { data } = await axios.get(URL);
  console.log('data:', data);
  return data.results;
};
