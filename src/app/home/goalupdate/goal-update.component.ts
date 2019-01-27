import {Component, OnInit} from '@angular/core';
import {SpringService} from '../../share/springService/spring.service';
import {clubDetails, Position} from '../insert-player/insert-player.component';
import {PlayerService} from '../../share/player.service';
import {playerDetails} from '../season/season.component';
import {map} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

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
  goalScore: Goal[] = [];
  playerImage: any;
  clubImage: any;
  private goalForm: FormGroup;
  public hiddenPlayerInformation = false;
  constructor(private springService: SpringService,
              private playerService: PlayerService,
              private sanitizer: DomSanitizer,
              private formBuilder: FormBuilder

  ) {
    this.goalForm = this.formBuilder.group({
      clubName: ['', Validators.required],
      playerPostion: ['', Validators.required],
      playerName: ['', Validators.required],
      seasonName: ['', Validators.required],
      clubNameplayerPlayed: ['', Validators.required],
      homegoalscore: ['', Validators.required],
      awaygoalscore: ['', Validators.required],
      homegoalconsider: ['', Validators.required],
      awaygoalconsider: ['', Validators.required]});
  }

  playerPositions: Position[] = [
    {value: 'Forward', viewValue: 'Forward'},
    {value: 'Midfielder', viewValue: 'Midfielder'},
    {value: 'Defender', viewValue: 'Defender'},
    {value: 'GoalKeeper', viewValue: 'GoalKeeper'}
  ];
  ngOnInit(): void {
    for (let i = 0; i < 5; i++) {
      this.goalScore.push(Object.assign({value: i}));
    }
     this.getCurrrentSeasionClubName();
     this.getSeasonInformation();
  }

  private getCurrrentSeasionClubName() {
    this.springService.get('/currentseason/get/clubs').subscribe(( data: any ) => {
       data.forEach(element => {
         this.clublist.push(Object.assign({clubName: element.clubName, id: element.id, fileName: element.fileName}));
       });
    });
  }

  private clubNameChanged(event) {
    this.hiddenPlayerInformation = false;
    this.playerImage = null;
    this.clubid = event;
    this.playerDetails.splice(0, this.playerDetails.length);
    this.getplayerList(this.clubid, this.playerPostion);
    this.returnBobImage(event, this.clublist).subscribe((res => {
      const urlCreator = window.URL;
      this.clubImage = this.sanitizer.bypassSecurityTrustUrl(
        urlCreator.createObjectURL(res));
    }));
  }
  private returnBobImage(event: string, list: any): any {
     const fileName = list.filter(res => {
       return res.id === event;
     })[0].fileName;
     return this.springService.get('/downloadFile/' + fileName, {
       headers: new HttpHeaders().set('Authorization', 'Token ' + localStorage.getItem('token')),
       responseType: 'blob'
     });
  }

  private playerPostionChanged(event) {
    this.hiddenPlayerInformation = false;
    this.playerPostion = event;
    this.getplayerList(this.clubid, event);
  }

  private getplayerList(clubId: string, playerPostion: string) {
    this.playerDetails.splice(0, this.playerDetails.length);
    this.playerService.getPlayerFromClubAndPosition(playerPostion, clubId)
      .subscribe(res => {
     this.updateList(res);
    });
  }

  private updateList(res: any) {
    this.playerDetails.push(Object.assign({playerName: res['playerName'], id: res['id'], fileName: res['fileName']}));
  }

  private getSeasonInformation() {
    this.springService.get('/season/getAll').pipe(map(res => {
      return res.forEach(data => {
        this.seasonDetails.push(Object.assign({id: data.id, seasonName: data.seasonName}));
      });
  })).subscribe();
  }
  playerChanged(playerId: any) {
    this.hiddenPlayerInformation = true;
    this.returnBobImage(playerId, this.playerDetails).subscribe((res: any) => {
      const urlCreator = window.URL;
      this.playerImage = this.sanitizer.bypassSecurityTrustUrl(
        urlCreator.createObjectURL(res)
      );
    });
  }
  public onSubmit() {
    if (this.goalForm.valid) {
      const goalInformation: Goal = new class implements Goal {
        awatyGoalScore: any;
        awayGoalConsider: any;
        clubId: any;
        homeGoalConsider: any;
        homeGoalScore: any;
        playerId: any;
        seasonId: any;
        value: any;
      };
      goalInformation.playerId = this.goalForm.value.playerName;
      goalInformation.seasonId = this.goalForm.value.seasonName;
      goalInformation.homeGoalScore = this.goalForm.value.homegoalscore;
      goalInformation.awatyGoalScore = this.goalForm.value.awaygoalscore;
      goalInformation.homeGoalConsider = this.goalForm.value.homegoalconsider;
      goalInformation.awayGoalConsider = this.goalForm.value.awaygoalconsider;
      goalInformation.clubId = this.goalForm.value.clubName;
      this.springService.post('/insert/goal', goalInformation).subscribe(data => {
         console.log(data);
      });
    } else {
      console.log('it is not valid');
    }
  }
}


export interface Season {
  id: any;
  seasonName: any;
}

export  interface  Goal {
  playerId: any;
  seasonId: any;
  homeGoalScore: any;
  awatyGoalScore: any;
  homeGoalConsider: any;
  awayGoalConsider: any;
  clubId: any;
  value: any;
}
