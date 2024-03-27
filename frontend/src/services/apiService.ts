import axios from 'axios';
import { MovieResult, OverallResultType, SeriesResult } from '../utils/types';
import { isMovie, isSeries, moviesAreValidated } from '../utils/helpers';

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

  if (moviesAreValidated(movies)) {
    const validatedMovies: MovieResult[] = movies;
    const validatedSeries: SeriesResult[] = series;

    return { movies: validatedMovies, series: validatedSeries };
  }
};

export const searchForTitle = async (query: string, searchType: string) => {
  console.log('query:', query);
  const options = {
    method: 'GET',
    url: `https://streaming-availability.p.rapidapi.com/search/title`,
    params: {
      title: query,
      country: 'us',
      show_type: searchType,
      output_language: 'en',
    },
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'streaming-availability.p.rapidapi.com',
    },
  };

  try {
    const response = await axios.request(options);
    console.log('response:', response);
    const { data } = response;
    console.log('data:', data);
    return sortResults(data.result);
  } catch (error) {
    console.error(error);
  }
};

export const getDetails = async (imdbId: string) => {
  const options = {
    method: 'GET',
    url: `https://api.themoviedb.org/3/find/${imdbId}?external_source=imdb_id`,
    headers: {
      accept: 'application/json',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiMGNiNmJkOTlhM2I3NmQzMjZlY2MyYmQwZTM1NzIyNyIsInN1YiI6IjY2MDI0OWUxYjg0Y2RkMDE3ZGY2ZjYzZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NabNU4YQXEdJs1FbaipbpY5MDORPUk7lvYUZcm78A-4',
    },
  };

  try {
    const { data } = await axios.request(options);
    console.log('data:', data);
    return data;
  } catch (error) {
    console.error(error);
  }
};
