import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { addheaderInterceptor } from './addheader.interceptor';
import {provideNativeDateAdapter} from '@angular/material/core';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),provideAnimationsAsync(), provideRouter(routes), provideClientHydration(),provideHttpClient(withInterceptors([addheaderInterceptor])),provideNativeDateAdapter()]
};
