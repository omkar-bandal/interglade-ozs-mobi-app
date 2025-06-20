import {AuthTokenResponsePassword} from '@supabase/supabase-js';
import {useMutation, UseMutationResult} from '@tanstack/react-query';

import {ErrorModel} from '@models/api.model';
import {AuthService} from '@services/auth/auth.service';

export function useLogin(): UseMutationResult<
  AuthTokenResponsePassword,
  ErrorModel,
  {email: string; password: string},
  unknown
> {
  return useMutation<
    AuthTokenResponsePassword,
    ErrorModel,
    {email: string; password: string},
    unknown
  >({
    mutationKey: ['login'],
    mutationFn: ({email, password}) => AuthService.login({email, password}),
  });
}

export function useSocialLogin(): UseMutationResult<
  any,
  ErrorModel,
  any,
  unknown
> {
  return useMutation<any, ErrorModel, any, unknown>({
    mutationKey: ['socialLogin'],
    mutationFn: variables => AuthService.socialLogin(variables),
  });
}

export function useFbLogin(): UseMutationResult<any, ErrorModel, any, unknown> {
  return useMutation<any, ErrorModel, any, unknown>({
    mutationKey: ['fbLogin'],
    mutationFn: ({token}) => AuthService.fbLogin(token),
  });
}

export function useRegister(): UseMutationResult<
  any,
  ErrorModel,
  {email: string; password: string; firstName: string; lastName: string},
  unknown
> {
  return useMutation<
    any,
    ErrorModel,
    {email: string; password: string; firstName: string; lastName: string},
    unknown
  >({
    mutationKey: ['register'],
    mutationFn: ({email, password, firstName, lastName}) =>
      AuthService.register({email, password, firstName, lastName}),
  });
}

export function useForgotPassword(): UseMutationResult<
  any,
  ErrorModel,
  {email: string},
  unknown
> {
  return useMutation<any, ErrorModel, {email: string}, unknown>({
    mutationKey: ['forgotPassword'],
    mutationFn: ({email}) => AuthService.forgotPassword(email),
  });
}

export function useSetSession(): UseMutationResult<
  any,
  ErrorModel,
  {accessToken: string; refreshToken: string},
  unknown
> {
  return useMutation<
    any,
    ErrorModel,
    {accessToken: string; refreshToken: string},
    unknown
  >({
    mutationKey: ['setSession'],
    mutationFn: ({accessToken, refreshToken}) =>
      AuthService.setSession(accessToken, refreshToken),
  });
}
