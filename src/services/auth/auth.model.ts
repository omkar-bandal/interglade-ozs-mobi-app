export interface LoginRequestParams {
  email: string;
  password: string;
}

export interface RegisterRequestParams {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface EmailRequestParams {
  email: string;
}

interface UserMetaData {
  email: string;
  email_verified: boolean;
  first_name: string;
  last_name: string;

  phone_verified: boolean;
}
export interface User {
  id: string;
  email: string;
  phone: string;
  role: string;
  last_sign_in_at: string;
  user_metadata: UserMetaData;
}

export interface Session {
  access_token: string;
  expires_in: number;
  expires_at: number;
  refresh_token: string;
  token_type: string;
  user: User;
}
