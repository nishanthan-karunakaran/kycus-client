import { Observable } from 'rxjs';

export enum ApiStatus {
  SUCCESS = 'success',
  FAIL = 'fail',
  ERROR = 'error',
}

export interface FieldError {
  field: string;
  message: string;
}

export interface ApiResponse<T = any> {
  status: ApiStatus;
  message?: string;
  data?: T | T[] | Record<string, T>;
  errors?: any;
}

export type ApiResult<T = any> = Observable<{
  loading: boolean;
  response: ApiResponse<T> | null;
}>;
