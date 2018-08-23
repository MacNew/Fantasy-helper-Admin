import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class HttperrorresponseService {

  constructor() { }

  public handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred', error.error.message);
    } else {
      console.log('Back in returned code', error.status);
    }
    return throwError('Something bad happened; please try again later.'+error.message);
  }
  
}
