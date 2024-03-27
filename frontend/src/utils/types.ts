export interface UserType {
  _id: string;
  username: string;
  password: string;
}

export interface InputField {
  name: string;
  label: string;
  inputType: string;
  value: string;
  setValue: (value: string) => void;
}

export interface CheckboxField {
  name: string;
  label: string;
  value: boolean;
  setValue: (value: boolean) => void;
}

export interface AuthResult {
  success: boolean;
  message: string;
  user?: UserType;
  token?: string;
}

export interface UserResult {
  success: boolean;
  message: string;
}

export interface GenreType {
  id: number;
  name: string;
}

export interface StreamingInfoType {
  link: string;
  service: string;
  streamingType: string;
  videoLink: string;
}

export interface BaseResult {
  cast: string;
  genres: GenreType[];
  imdbId: string;
  overview: string;
  streamingInfo: StreamingInfoType[];
  title: string;
  tmdbId: number;
  type: string;
}

export interface MovieResult extends BaseResult {
  directors: string[];
  year: number;
}

export interface SeriesResult extends BaseResult {
  creators: string[];
  episodeCount: number;
  firstAirYear: number;
  lastAirYear: number;
  seasonCount: number;
  seasons: object[];
  status: {
    statusCode: number;
    statusText: string;
  };
}

export interface OverallResultType {
  cast: string;
  creators?: string[];
  directors?: string[];
  episodeCount?: number;
  firstAirYear?: number;
  genres: GenreType[];
  imdbId: string;
  lastAirYear?: number;
  overview: string;
  seasonCount?: number;
  seasons?: object[];
  status?: {
    statusCode: number;
    statusText: string;
  };
  streamingInfo: StreamingInfoType[];
  title: string;
  tmdbId: number;
  type: string;
  year?: number;
}

export interface AllResultsType {
  movies: OverallResultType[];
  series: OverallResultType[];
}
