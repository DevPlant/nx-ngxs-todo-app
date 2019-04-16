import {HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {Store} from '@ngxs/store';
import {Logout} from './auth.actions';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(public authService: AuthService, private store: Store) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`
      }
    });
    return next.handle(request).pipe(catchError((error) => {
      if (error instanceof HttpErrorResponse) {
        if (error.status === 401) {
          console.log('unauthorized ...');
          this.store.dispatch(new Logout());
          // redirect to the login route
          // or show a modal
        }
      }
      throw error;
    }));
  }

}
