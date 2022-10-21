import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';

import { catchError, Observable, of } from 'rxjs';
import { Router } from "@angular/router";
import { AppConstants } from '../constant/constant';
import { environment } from 'src/environments/environment';
import { ToastService } from '../services/toast.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private router: Router,
    private toastService: ToastService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (localStorage.getItem(AppConstants.Token) && request.url.includes(environment.url)) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + localStorage.getItem(AppConstants.Token)
        }
      });
    }

    /**
     * continues request execution
     */
    return next.handle(request).pipe(catchError((error, caught) => {
      //intercept the respons error and displace it to the console
      console.log(error);
      this.handleAuthError(error);
      return of(error);
    }) as any);
  }

  /**
 * manage errors
 * @param err
 * @returns {any}
 */
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    if (String(err).includes("401")) {
      this.toastService.Error("User Unauthorized!!!")
      this.router.navigate([`/login`]);
      return of(err.message);
    } else {
      this.toastService.Error("Something went wrong. Please try again later!!!")
    }
    throw err;
  }
}
