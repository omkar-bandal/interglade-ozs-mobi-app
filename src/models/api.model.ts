export interface ApiBaseState<T> {
  data: T | null;
}

export type ErrorModel = Error;
