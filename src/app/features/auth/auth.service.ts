import { Injectable } from '@angular/core';
import { ApiResponse, ApiResult } from 'src/app/core/constants/api.response';
import { API_URL } from 'src/app/core/constants/apiurls';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private api: ApiService) {}

  public getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  public setAuthToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  public logout(): void {
    localStorage.removeItem('authToken');
  }

  public signin(data: any): ApiResult {
    return this.api.post<ApiResponse<any>>(API_URL.AUTH.VALIDATE_EMAIL, data);
  }
}
