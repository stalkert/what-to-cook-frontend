export interface SignInFormValues {
  email: string;
  password: string;
}

export interface SignInResponse {
  token: string;
}

export interface SignUpFormValues {
  username: string;
  email: string;
  password: string;
}
