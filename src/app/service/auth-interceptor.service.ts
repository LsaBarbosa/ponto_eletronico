import {HttpInterceptorFn} from "@angular/common/http";

// @Injectable({
//   providedIn: 'root'
// })
// export class AuthInterceptorService  implements HttpInterceptorFn {

  export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
console.log('passei')
    if (req.headers.get('No-Auth') == 'True') {
      return next(req);
    }

    if (typeof window !== 'undefined') {

      const authToken = sessionStorage.getItem('token');

      if (!authToken) {
        //TODO redirection vers la page d'authentification
      }

      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`,
        },
      });

      return next(authReq);
    }
    return next(req);


  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const token = sessionStorage.getItem('token');
  //   console.log("token texto" + token)
  //   if (token) {
  //     const cloned = req.clone({
  //       headers: req.headers.set('Authorization', `Bearer ${token}`)
  //     });
  //     return next.handle(cloned);
  //   } else {
  //     return next.handle(req);
  //   }
  // }
}
