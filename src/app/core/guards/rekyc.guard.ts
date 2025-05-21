import { Injectable } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRouteSnapshot, CanActivate, Router } from '@angular/router';
import { selectIsAuthenticated } from '@features/forms/rekyc-form/components/rekyc-personal-details/store/personal-details.selectors';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class RekycGuard implements CanActivate {
  constructor(
    private router: Router,
    private store: Store,
  ) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    // const accessToken = localStorage.getItem('access_token');
    const accessToken = toSignal(this.store.select(selectIsAuthenticated));

    if (accessToken()) {
      return true;
    } else {
      const currentParams = route.queryParams;
      const fullPath = '/application/rekyc/login';

      this.router.navigate([fullPath], {
        queryParams: currentParams, // carry forward ?token=...
      });

      return false;
    }
  }
}
