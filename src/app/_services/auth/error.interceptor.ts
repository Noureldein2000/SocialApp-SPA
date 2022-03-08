import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpErrorResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        catchError((error: HttpErrorResponse) => {
        
          if (error instanceof HttpErrorResponse) {
            if (error.status === 401) { return throwError(' Unauthorize'); }
            const applicationError = error.headers.get('Application-Error');
            if (applicationError) {
              console.log(applicationError);
              return throwError(applicationError);
            }
            const serverError = error.error;
            let modelStateErrors = '';
            if (serverError && typeof serverError === 'object') {
              for (const key in serverError) {
                if (serverError[key]) {
                  modelStateErrors += serverError[key] + '\n';
                }
              }
            }
            return throwError(modelStateErrors || serverError || 'Server Error');
          }

          //-------------------------------------------------------------------------------//

          // let errorMsg = '';
          // if (error.error instanceof ErrorEvent) {
          //   console.log('this is client side error');
          //   errorMsg = `Error: ${error.error.message}`;
          // }
          // else {
          //   console.log('this is server side error');
          //   errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
          // }
          // console.log(errorMsg);
          // return throwError(errorMsg);
          return throwError(error);
        })
      )
  }
}

export const ErrorInterceptorProdvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: HttpErrorInterceptor,
  multi: true
}
