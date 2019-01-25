import {Component, OnInit} from '@angular/core';
import {SpringService} from '../../share/springService/spring.service';
import {clubDetails, Position} from '../insert-player/insert-player.component';
import {PlayerService} from '../../share/player.service';
import {playerDetails} from '../season/season.component';
import {pipe} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-goal-update',
  templateUrl: './goal-update.component.html',
  styleUrls: ['./goal-update.component.css']
})
export class GoalUpdateComponent  implements OnInit {
  clubid: string;
  playerPostion: string;
  clublist: clubDetails[] = [];
  playerDetails: playerDetails[] = [];
  seasonDetails: Season[] = [];

  constructor(private springService: SpringService, private playerService: PlayerService) {}
  playerPositions: Position[] = [
    {value: 'Forward', viewValue: 'Forward'},
    {value: 'Midfielder', viewValue: 'Midfielder'},
    {value: 'Defender', viewValue: 'Defender'},
    {value: 'GoalKeeper', viewValue: 'GoalKeeper'}
  ];
  ngOnInit(): void {
     this.getCurrrentSeasionClubName();
     this.getSeasonInformation();
  }

  private getCurrrentSeasionClubName() {
    this.springService.get('/currentseason/get/clubs').subscribe(( data: any ) => {
       data.forEach(element => {
         this.clublist.push(Object.assign({clubName: element.clubName, id: element.id}));
       });
    });
  }

  private clubNameChanged(event) {
    this.clubid = event;
    this.getplayerList(this.clubid, this.playerPostion);
  }

  private playerPostionChanged(event) {
    this.playerPostion = event;
    this.getplayerList(this.clubid, event);
  }

  private getplayerList(clubId: string, playerPostion: string) {
    this.playerDetails.splice(0, this.playerDetails.length);
    this.playerService.getPlayerFromClubAndPosition(playerPostion, clubId).subscribe(res => {
     this.updateList(res);
    });
  }

  private updateList(res: any) {
    this.playerDetails.push(Object.assign({playerName: res['playerName'], id: res['id']}));
  }

  private getSeasonInformation() {
    this.springService.get('/season/getAll').pipe(map(res => {
      return res.forEach(data => {
        this.seasonDetails.push(Object.assign({id: data.id, seasonName: data.seasonName}));
      });
  })).subscribe();
  }
}

export interface Season {
  id: any;
  seasonName: any;
}

