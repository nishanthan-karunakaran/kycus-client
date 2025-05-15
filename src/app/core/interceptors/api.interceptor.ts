import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/features/auth/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept<T>(req: HttpRequest<T>, next: HttpHandler): Observable<HttpEvent<T>> {
    // const token = this.authService.getAuthToken();
    const access_token = localStorage.getItem('access_token');
    const apiBaseUrl = environment.apiBaseUrl;
    const fullUrl = apiBaseUrl + req.url;

    // Clone the request and attach headers
    const clonedRequest = req.clone({
      url: fullUrl,
      setHeaders: {
        Authorization: access_token ? `Bearer ${access_token}` : '',
      },
    });

    return next.handle(clonedRequest);
  }
}
