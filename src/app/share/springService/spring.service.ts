import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Clubs } from '../clubname';
import { Subject, Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Token '+localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})

export class SpringService {
  public clubListStateChange = new Subject<void>()
  public playerListStateChange = new Subject<void>()
  clublistStateChange$ = this.clubListStateChange.asObservable();
  playerListStateChange$ = this.playerListStateChange.asObservable();
  baseUrl:string = 'fantasyhelper/api';
  constructor(private http: HttpClient) { 
  }

  
  public post(db:string,data:any,opts?:any) : Observable<any> {
     return this.http.post(this.baseUrl+db,data,httpOptions)
  }

  public get(db:string, opts?: any): Observable<any> {
    opts != null ? (opts = opts) : (opts = httpOptions);
    return this.http.get(this.baseUrl+db,opts);
  }
 

}

