import { Injectable } from '@angular/core';
import { SpringService } from '../share/springService/spring.service'
import 'rxjs/add/operator/map';
@Injectable({
    providedIn: 'root'
  })

  export class PlayerService {
    playerList: playerDetails[] = [];
      constructor(private springService:SpringService) {
    }

    getPlayer(position) {
       return this.springService.get('/getplayer/'+position);
    }

  }
  
  export interface playerDetails {
    playerName: any;
    id: any;
  }