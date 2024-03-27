import axios from 'axios';
import { OverallResultType } from '../utils/types';
import { isMovie, isSeries } from '../utils/helpers';

const API_KEY = import.meta.env.VITE_API_KEY;

const sortResults = (data: OverallResultType[]) => {
  const movies = [];
  const series = [];

  for (const result of data) {
    if (isMovie(result)) {
      movies.push(result);
    } else if (isSeries(result)) {
      series.push(result);
    }
  }

  return { movies, series };
};

export const searchForTitle = async (query: string) => {
  console.log('query:', query);
  const options = {
    method: 'GET',
    url: `https://streaming-availability.p.rapidapi.com/search/title`,
    params: {
      title: query,
      country: 'us',
      show_type: 'all',
      output_language: 'en',
    },
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
    },
  };

  try {
    const { data } = await axios.request(options);
    return sortResults(data.result);
  } catch (error) {
    console.error(error);
  }
};
