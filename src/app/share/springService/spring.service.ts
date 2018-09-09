import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http'; 
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

  public insertClubName(club:Clubs, file: any):any {
    const formData: FormData = new FormData();
    formData.append('file', file);
    formData.append('clubName', club.clubName);
    formData.append('isPlaying', club.isPlaying);
    return this.http.post(this.baseUrl+'/insert/clubs', formData ,httpOptions); 
  }
  
  public post(db:string,data:any) : Observable<any> {
     return this.http.post(this.baseUrl+db,data,httpOptions)
  }

  public get(db:string): Observable<any> {
    return this.http.get(this.baseUrl+db,httpOptions);
  }
 
  public getAllClubs(): any {
    return this.http.get(this.baseUrl+"/currentseason/get/clubs",httpOptions);
  }

  public getFileName(club_id: any) {
   return this.http.get(this.baseUrl+"/fileName/"+club_id,httpOptions);
  }

  public downloadFile(fileName: string) {
    return this.http.get(this.baseUrl+"/downloadFile/"+fileName,{
      headers: new HttpHeaders().set('Authorization','Token '+localStorage.getItem('token')),
      responseType: 'blob'
    })
  }

}

