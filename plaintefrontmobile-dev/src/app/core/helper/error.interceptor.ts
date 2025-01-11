import { Injectable } from '@angular/core'
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http'
import { Observable, throwError } from 'rxjs'
import { catchError } from 'rxjs/operators'
import { Router } from '@angular/router'
import { AlertService } from 'src/app/shared/alert/alert.service'

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  error: any
  constructor(private router: Router, private alert: AlertService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        console.error(err);
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          // this.authenticationService.logout();
          //  location.reload(true);
          this.error = err.error.message || err.statusText
          this.alert.error(err.error.message)
          this.router.navigate(['/plaintes'], { queryParams: {} })
        }
        if (err.status === 500) {
          this.error = err.error.message || err.statusText
          this.alert.error(err.error.message)
        }
        if (err.error) {
          this.error = err.error.message || err.statusText
        }

        return throwError(this.error)
      })
    )
  }
}
