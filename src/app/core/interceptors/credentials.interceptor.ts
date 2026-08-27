import {
  HttpInterceptorFn
} from '@angular/common/http';

import { environment } from '../../../environments/environment';

export const credentialsInterceptor: HttpInterceptorFn =
  (req, next) => {

    const xsrfToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('XSRF-TOKEN='))
      ?.split('=')[1];

    const apiBaseUrl = environment.apiBaseUrl;

    if (!req.url.startsWith(apiBaseUrl)) {
      return next(req);
    }

    let headers = req.headers;

    if (xsrfToken) {
      headers = headers.set(
        'X-XSRF-TOKEN',
        decodeURIComponent(xsrfToken)
      );
    }

    const cloned = req.clone({
      withCredentials: true,
      headers
    });

    return next(cloned);
  };