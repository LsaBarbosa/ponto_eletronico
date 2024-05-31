import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideToastr } from "ngx-toastr";
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AuthInterceptorService } from "./service/auth-interceptor.service";

export const appConfig: ApplicationConfig = {

  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideToastr(),
    provideAnimations(),
    NgxPaginationModule,
    provideAnimationsAsync(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ]
};
