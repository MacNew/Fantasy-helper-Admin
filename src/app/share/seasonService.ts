import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  export class SeasonService {
    public seasonStateChange = new Subject<void>();
    seasonStateChange$ = this.seasonStateChange.asObservable();
  }