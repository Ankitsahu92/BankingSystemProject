import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { SpinnerService, EmitEvent, Events } from '../service/spinner.service';

@Injectable()
export class SpinnerRequestResponseInterceptor implements HttpInterceptor {

  constructor(private service: SpinnerService) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const randomTime = this.getRandomIntInclusive(0, 1500);
    const started = Date.now();
    this.service.emit(new EmitEvent(Events.httpRequest));
    return next
      .handle(req)
      .pipe(
        tap(event => {
          if (event instanceof HttpResponse) {
            const elapsed = Date.now() - started;
            this.service.emit(new EmitEvent(Events.httpResponse));
          }
        }), catchError((error) => {
          console.log('error in intercept')
          this.service.emit(new EmitEvent(Events.httpResponse));
          return throwError(error.message);
        })
      );
  }

  getRandomIntInclusive(min: number, max: number) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; // The maximum is inclusive and the minimum is inclusive
  }
}
