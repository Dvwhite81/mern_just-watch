import { OverallResultType } from './types';

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
  if (
    result &&
    isEither(result) &&
    result.type === 'movie' &&
    result.directors &&
    Array.isArray(result.directors) &&
    result.directors.every((director) => typeof director === 'string') &&
    result.year
  ) {
    return true;
  }

  return false;
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
