import { ApplicationConfig, provideZonelessChangeDetection } from "@angular/core";
import { provideRouter, withComponentInputBinding } from "@angular/router";
import { provideHttpClient, withInterceptors } from "@angular/common/http";

import { routes } from "./app.routes";
import { credentialsInterceptor } from './core/interceptors/credentials.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [

    provideHttpClient(
      withInterceptors([
        credentialsInterceptor
      ])
    ),

    provideZonelessChangeDetection(),

    provideRouter(
      routes,
      withComponentInputBinding()
    ),

  ],
};