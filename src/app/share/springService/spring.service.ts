import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http'; 
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type':'application/json',
    'Authorization': 'Token '+localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
export class SpringService {
  constructor(private http: HttpClient) { }
      
}

