import { Injectable } from '@angular/core';
import { SpringService } from '../share/springService/spring.service'
import 'rxjs/add/operator/map';
import { catchError, switchMap } from 'rxjs/operators';
import { HttperrorresponseService } from '../share/httpErrorHandlingService/httperrorresponse.service';
import { Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
  
  export class PlayerService {
    public playerListStateChange = new Subject<void>()
    playerListStateChange$ = this.playerListStateChange.asObservable();
  
      constructor(
        private springService:SpringService,
        private handleError:HttperrorresponseService
        ) {
    }

    getPlayer(position: any) {
       return this.springService.get('/getplayer/'+position).pipe(
          catchError(this.handleError.errorHandling),
          switchMap((res:any)=>{
            return res;
          })
       );
    }  
  }
  