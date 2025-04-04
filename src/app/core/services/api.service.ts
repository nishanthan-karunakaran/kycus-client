import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { catchError, finalize, map, startWith } from 'rxjs/operators';
import { ApiResponse, ApiResult } from 'src/app/core/constants/api.response';

type BodyType = object | FormData;

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private globalLoadingSubject = new BehaviorSubject<boolean>(false);
  globalLoading$ = this.globalLoadingSubject.asObservable();

  constructor(private http: HttpClient) {}

  request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    url: string,
    body?: BodyType,
    params?: HttpParams,
    headers?: HttpHeaders,
  ): ApiResult<T> {
    return this.http.request<ApiResponse<T>>(method, url, { body, params, headers }).pipe(
      map((response: ApiResponse<T>) => ({
        loading: false,
        response, // Pass the actual API response
      })),
      startWith({ loading: true, response: null }),
      catchError((error) =>
        of({
          loading: false,
          response: error?.error ?? {
            status: 'error',
            message: error.message || 'An unexpected error occurred',
            data: null,
            errors: null,
          },
        }),
      ),
      finalize(() => this.globalLoadingSubject.next(false)),
    );
  }

  // Shorthand methods
  get<T>(url: string, params?: HttpParams, headers?: HttpHeaders) {
    return this.request<T>('GET', url, undefined, params, headers);
  }

  post<T>(url: string, body: BodyType, headers?: HttpHeaders) {
    return this.request<T>('POST', url, body, undefined, headers);
  }

  put<T>(url: string, body: BodyType, headers?: HttpHeaders) {
    return this.request<T>('PUT', url, body, undefined, headers);
  }

  delete<T>(url: string, headers?: HttpHeaders) {
    return this.request<T>('DELETE', url, undefined, undefined, headers);
  }
}
