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

export interface ApiResultType {
  name?: string;
  overview: string;
  poster_path: string;
  title?: string;
}

export interface ShowResult extends ApiResultType {
  name: string;
}

export interface MovieResult extends ApiResultType {
  title: string;
}
