import { AllResultsType, OverallResultType } from './types';

const isEither = (result: OverallResultType) => {
  if (
    result &&
    result.cast &&
    result.genres &&
    result.imdbId &&
    result.overview &&
    result.streamingInfo &&
    result.title &&
    result.tmdbId &&
    result.type
  ) {
    return true;
  }

  return false;
};

export const isMovie = (result: OverallResultType) => {
  if (!result || result.type !== 'movie' || !result.directors || !result.year) {
    return false;
  }

  const { directors, year } = result;

  if (
    !Array.isArray(directors) ||
    directors.some((director) => typeof director !== 'string') ||
    typeof year !== 'number'
  ) {
    return false;
  }

  return true;
};

export const isSeries = (result: OverallResultType) => {
  if (
    result &&
    isEither(result) &&
    result.type === 'series' &&
    result.creators &&
    Array.isArray(result.creators) &&
    result.creators.every((creator) => typeof creator === 'string') &&
    result.episodeCount &&
    result.firstAirYear &&
    result.lastAirYear &&
    result.seasonCount &&
    result.seasons &&
    result.status
  ) {
    return true;
  }

  return false;
};

export const moviesAreValidated = (results: OverallResultType[]) => {
  for (const result of results) {
    if (!isMovie(result)) {
      return false;
    }
  }

  return true;
};

export const thereAreResults = (results: AllResultsType) => {
  return results && (results.movies.length > 0 || results.series.length > 0);
};
