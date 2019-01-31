import { Injectable} from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class HttperrorresponseService {
  constructor() { }
  public errorHandling(res: HttpErrorResponse) {
    const statusCode = res.status;
    const error = {
      statusCode: statusCode,
      message: res
    }
    return throwError(error);
  }
  public errorHandlingOfGoalInformation(res: HttpErrorResponse) {
     return throwError(res);
  }
}
