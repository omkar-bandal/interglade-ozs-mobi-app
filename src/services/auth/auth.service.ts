import {supabase} from '@lib/supabase/supabase';
import {
  AuthError,
  AuthResponse,
  AuthTokenResponsePassword,
} from '@supabase/supabase-js';
import {LoginRequestParams, RegisterRequestParams} from './auth.model';

export class AuthService {
  static login({
    email,
    password,
  }: LoginRequestParams): Promise<AuthTokenResponsePassword> {
    return supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
  }

  static register({
    email,
    password,
    firstName,
    lastName,
  }: RegisterRequestParams): Promise<AuthResponse> {
    return supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });
  }

  static socialLogin(variables: any) {
    return supabase.auth.signInWithIdToken(variables);
  }

  static fbLogin(token: string) {
    return supabase.auth.signInWithOAuth({
      provider: 'facebook',
      options: {
        redirectTo: 'ozoservir://auth-callback',
        skipBrowserRedirect: false,
        queryParams: {
          access_token: token,
        },
      },
    });
  }

  static setSession(acccessToken: string, refreshToken: string): any {
    return supabase.auth.setSession({
      access_token: acccessToken,
      refresh_token: refreshToken,
    });
  }

  static forgotPassword(email: string) {
    return supabase.auth.resetPasswordForEmail(email);
  }

  static logout(): Promise<{error: AuthError | null}> {
    return supabase.auth.signOut();
  }
}
