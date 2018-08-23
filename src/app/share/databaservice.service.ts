import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from './user'
import { catchError, retry } from 'rxjs/operators';
import {RequestOptions, Request, Headers } from '@angular/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json',
  })
};

    @Injectable({
  providedIn: 'root'
})

export class DatabaserviceService {
  authUrl = 'fantasyhelper/genratetoken';
  headerss = new Headers({ 'Content-Type': 'application/json' });


  constructor(private http: HttpClient) { }
  
  public authenticateToken(user:User):any {
    return this.http.post(this.authUrl, user,httpOptions)
    .pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred', error.error.message);
    } else {
      console.log('Back in returned code', error.message);
    }
    return throwError('Something bad happened; please try again later.'+error.message);
  }
}

