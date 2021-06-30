import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from '../services';

@Injectable({
  providedIn: 'root',
})
export class HttpInterceptor implements HttpInterceptor {
  constructor(private router: Router, private authService: AuthService) {}

  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url === '/api/bank/list' || req.url === '/api/auth/login/user') {
      return next.handle(req);
    }

    const cloneReq = req.clone({
      setHeaders: {
        authorization: `Bearer ${this.authService.getTokenFromLocalStorage()}`,
      },
    });

    return next.handle(cloneReq).pipe(
      catchError((error) => {
        return throwError(error);
      })
    );
  }
}
