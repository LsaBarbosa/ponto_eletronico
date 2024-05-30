import {ApplicationConfig} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';
import {provideToastr} from "ngx-toastr";
import {provideAnimations} from '@angular/platform-browser/animations';
import {provideHttpClient, withInterceptors} from '@angular/common/http';
import {TokenInterceptor} from "./service/auth-interceptor.service";


export const appConfig: ApplicationConfig = {

  providers:  [
    provideRouter(routes),
    provideHttpClient(withInterceptors([TokenInterceptor])),
    provideToastr(),
    provideAnimations(),
    // {
    //   provide: HTTP_INTERCEPTORS,
    //   useClass: AuthInterceptorService,
    //   multi: true
    // }
  ]
};



