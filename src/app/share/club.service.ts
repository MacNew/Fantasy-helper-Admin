import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class ClubService {
    public clubListStateChange = new Subject<void>();
    clublistStateChange$ = this.clubListStateChange.asObservable();
  }
