import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpParams, HttpRequest } from '@angular/common/http'; 
import { Clubs } from '../clubname';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Token '+localStorage.getItem('token')
  })
};

const headers = new HttpHeaders().set('Authorization','Token '+localStorage.getItem('token'));

@Injectable({
  providedIn: 'root'
})

export class SpringService {
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
  public getAllClubs(): any {
    return this.http.get(this.baseUrl+"/currentseason/get/clubs",httpOptions);
  }

    public getImage(downloadImageLink: string): any {
      return this.http.get(downloadImageLink,{headers, responseType: 'blob'});
    }  
}

