import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams } from '@angular/common/http'; 
import { Clubs } from '../clubname';

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
  baseUrl:string = 'fantasyhelper/api';
  constructor(private http: HttpClient) { 
  }

  public insertClubName(club:Clubs):any {
    
    return this.http.post(this.baseUrl+'/insert/clubs', club ,httpOptions); 
  }
}

