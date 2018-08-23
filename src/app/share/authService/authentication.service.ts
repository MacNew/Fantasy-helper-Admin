import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../user';
import {RequestOptions, Request, Headers } from '@angular/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json' 
  }) 
};
  @Injectable({
  providedIn: 'root'
})

export class AuthService {
  authUrl = 'fantasyhelper/genratetoken';
  apiUrl = 'fantasyhelper/api';
  constructor(private http: HttpClient) { }
  
  public getToken(user:User):any {
    return this.http.post(this.authUrl, user,httpOptions); 
  }

 
}