import { Component, OnInit } from '@angular/core';
import { SpringService } from '../../share/springService/spring.service'


@Component({
  selector: 'app-season-first',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css']
})
export class Season implements OnInit {
  clublist: clubDetails[] = [];
  forwardPlayerlist: playerDetails[] = [];
  midfilderPlayerlist: playerDetails[] = []; 
  constructor(private springService: SpringService) { 
  }

  ngOnInit() {
    this.assignedClubName();
    this.getPlayerlist('Forward').subscribe((data: any)=>{
      data.forEach(element => {
        this.forwardPlayerlist.push(Object.assign({playerName: element.playerName, id:element.id}));
      });
    });
  }

  assignedClubName() {
    this.springService.get('/currentseason/get/clubs')
    .subscribe((data:any)=>{
     data.forEach(element => {
       this.clublist.push(Object.assign({clubName: element.clubName,id:element.id}));
     });
    });
 }

 getPlayerlist(position) {
  return this.springService.get('/getplayer/'+position);
 }

}

export interface clubDetails {
  clubName: any;
  id: any;
}

export interface playerDetails {
  playerName: any;
  id: any;
}