import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { User } from '../user';

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

  isAdmin() {
    let jwt = localStorage.getItem('token');
    let jwtData = jwt.split('.')[1];
    let decodedJwtJsonData = window.atob(jwtData);
    let decodedJwtData = JSON.parse(decodedJwtJsonData)
    let isAdmin =  decodedJwtData.role;
    if (isAdmin==="ROLE_ADMIN") {
      return true;
    } else {
      return false;
    }
  }
  
}