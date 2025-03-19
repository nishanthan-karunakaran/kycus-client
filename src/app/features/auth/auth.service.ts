import { Injectable } from '@angular/core';
import { ApiResponse, ApiResult } from 'src/app/core/constants/api.response';
import { API_URL } from 'src/app/core/constants/apiurls';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private api: ApiService) {}

  getAuthToken(): string | null {
    return localStorage.getItem('authToken');
  }

  setAuthToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }

  sendEmailOTP(data: { email: string }): ApiResult {
    return this.api.post<ApiResponse<any>>(API_URL.AUTH.SEND_EMAIL_OTP, {
      data,
    });
  }

  signin(data: any): ApiResult {
    return this.api.post<ApiResponse<any>>(API_URL.AUTH.SEND_EMAIL_OTP, data);
  }
}
