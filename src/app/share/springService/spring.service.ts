import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Token '+localStorage.getItem('token')
  })
};

@Injectable({
  providedIn: 'root'
})
  
export class SpringService {
  baseUrl: string = 'fantasyhelper/api';
  constructor(private http: HttpClient) { 
  }

  public post(db:string,data:any,opts?:any) : Observable<any> {
     opts != null ? (opts = opts) : (opts = httpOptions)
     return this.http.post(this.baseUrl+db,data,httpOptions);
  }

  public get(db:string, opts?: any): Observable<any> {
    opts != null ? (opts = opts) : (opts = httpOptions);
    return this.http.get(this.baseUrl+db,opts);
  }

  public put(db:string, data: any, opts?: any): Observable<any> {
    opts != null ? (opts = opts) : (opts = httpOptions);
    return this.http.put(this.baseUrl+db,data, opts );
  }
  
  public delete(db:string,opts?: any): Observable<any> {
    opts != null ? (opts = opts) : (opts = httpOptions);
    return this.http.delete(this.baseUrl+db,opts);
  }
 
}

