import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable()
export class AuthInterceptorService  implements HttpInterceptor  {

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken = sessionStorage.getItem('token');

    if (authToken) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
      return next.handle(authReq);
    } else {
      // Trate o caso em que não há token disponível, por exemplo, redirecionando para a página de login
      // Ou, simplesmente, deixe a requisição seguir sem o token de autorização
      return next.handle(req);
    }
  }
}
