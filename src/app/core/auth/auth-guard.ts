import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { map, catchError, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.user()) {
    return true;
  }

  return auth.me().pipe(
    map(user => {
      auth.setUser(user);
      return true;
    }),
    catchError(() => {
      auth.clearUser();
      return of(router.createUrlTree(['/login']));
    })
  );
};