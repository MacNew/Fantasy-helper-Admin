import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {SpringService} from '../../share/springService/spring.service';
import {clubDetails, Position} from '../insert-player/insert-player.component';
import {PlayerService} from '../../share/player.service';
import {playerDetails} from '../season/season.component';
import {catchError, map} from 'rxjs/operators';
import {DomSanitizer} from '@angular/platform-browser';
import {HttpHeaders} from '@angular/common/http';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MessageService } from '../../share/message.service';
import { MatTableDataSource, MatPaginator } from '@angular/material';
import {HttperrorresponseService} from '../../share/httpErrorHandlingService/httperrorresponse.service';

@Component({
  selector: 'app-goal-update',
  templateUrl: './goal-update.component.html',
  styleUrls: ['./goal-update.component.css']
})
export class GoalUpdateComponent  implements OnInit {
  clubid: string;
  playerPostion: string;
  clublist: clubDetails[] = [];
  clublistplayed: clubDetails[] = [];
  playerDetails: playerDetails[] = [];
  seasonDetails: Season[] = [];
  goalScore: Goal[] = [];
  playerImage: any;
  clubImage: any;
  goalDetails: MatTableDataSource<[{}]>;
  goalId: any = null;
  displayedColumns: string [] = [
    'clubFileName', 'clubName', 'homeGoalScore', 'awayGoalScore', 'homeGoalConsider', 'awayGoalConsider'
  ];
  @ViewChild(MatPaginator) paginator: MatPaginator;

  private goalForm: FormGroup;
  public hiddenPlayerInformation = false;
  constructor(private springService: SpringService,
              private playerService: PlayerService,
              private sanitizer: DomSanitizer,
              private formBuilder: FormBuilder,
              private messageService: MessageService,
              private handleError: HttperrorresponseService

  ) {
    for (let i = 0; i < 5; i++) {
      this.goalScore.push(Object.assign({value: i}));
    }
  }
  playerPositions: Position[] = [
    {value: 'Forward', viewValue: 'Forward'},
    {value: 'Midfielder', viewValue: 'Midfielder'},
    {value: 'Defender', viewValue: 'Defender'},
    {value: 'GoalKeeper', viewValue: 'GoalKeeper'}
  ];
  ngOnInit(): void {
    this.goalForm = this.formBuilder.group({
      clubName: [null, Validators.required],
      playerPostion: [null, Validators.required],
      playerName: [null, Validators.required],
      seasonName: [null, Validators.required],
      clubNameplayerPlayed: [null, Validators.required],
      homegoalscore: [null, Validators.required],
      awaygoalscore: [null, Validators.required],
      homegoalconsider: [null, Validators.required],
      awaygoalconsider: [null, Validators.required]});
      this.getCurrrentSeasionClubName();
      this.getSeasonInformation();
      this.getCurrentSeasionClubNamePlayed();
  }

  private getCurrrentSeasionClubName() {
    this.springService.get('/currentseason/get/clubs').subscribe(( data: any ) => {
       data.forEach(element => {
         this.clublist.push(Object.assign({clubName: element.clubName, id: element.id, fileName: element.fileName}));
       });
    });
  }

  private getCurrentSeasionClubNamePlayed() {
    this.springService.get('/currentseason/get/clubs').subscribe(( data: any ) => {
      data.forEach(element => {
        this.clublistplayed.push(Object.assign({clubName: element.clubName, id: element.id, fileName: element.fileName}));
      });
    });
  }

  private clubNameChanged(event) {
    this.hiddenPlayerInformation = false;
    this.playerImage = null;
    this.clubid = event;
    this.getplayerList(this.clubid, this.playerPostion);
    this.returnBobImage(event, this.clublist).subscribe((res => {
      const urlCreator = window.URL;
      this.clubImage = this.sanitizer.bypassSecurityTrustUrl(
        urlCreator.createObjectURL(res));
    }));
    this.updateGoalInformation(0);
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
    this.updateGoalInformation(0);
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
    this.updateGoals('homegoalscore', false);
    this.updateGoals('awaygoalscore', false);
    this.updateGoals('homegoalconsider', false);
    this.updateGoals('awaygoalconsider', false);
    this.updateGoals('clubNameplayerPlayed', false);
    this.updateGoals('seasonName',false);
    this.returnBobImage(playerId, this.playerDetails).subscribe((res: any) => {
      const urlCreator = window.URL;
      this.playerImage = this.sanitizer.bypassSecurityTrustUrl(
        urlCreator.createObjectURL(res)
      );
    });
    this.updateGoalInformation(0);
  }
  public onSubmit() {
    if (this.goalForm.valid) {
      const goalInformation: Goal = new class implements Goal {
        id: any;
        awatyGoalScore: any;
        awayGoalConsider: any;
        clubId: any;
        homeGoalConsider: any;
        homeGoalScore: any;
        playerId: any;
        seasonId: any;
        value: any;
      };
      if (this.goalId != null) {
      goalInformation.id = this.goalId; }
      goalInformation.playerId = this.goalForm.value.playerName;
      goalInformation.seasonId = this.goalForm.value.seasonName;
      goalInformation.homeGoalScore = this.goalForm.value.homegoalscore;
      goalInformation.awatyGoalScore = this.goalForm.value.awaygoalscore;
      goalInformation.homeGoalConsider = this.goalForm.value.homegoalconsider;
      goalInformation.awayGoalConsider = this.goalForm.value.awaygoalconsider;
      goalInformation.clubId = this.goalForm.value.clubNameplayerPlayed;
      this.springService.post('/insert/goal', goalInformation).subscribe(data => {
        this.messageService.showMessage('Update goal information Sucessfully ');
        this.goalForm.reset();
      });
    }
  }
  clubPlayedChanged(value: any) {
    const playerId = this.goalForm.value.playerName;
    const seasonId = this.goalForm.value.seasonName;
    this.springService.get('/getGoalInformation/' + value + '/' + seasonId + '/' + playerId)
      .subscribe(data => {
        console.log(data);
        if (data != null) {
          this.goalId = data['id'];
          this.updateGoals('homegoalscore', 'homeGoalScore', data);
          this.updateGoals('awaygoalscore', 'awatyGoalScore', data);
          this.updateGoals('homegoalconsider', 'homeGoalConsider', data);
          this.updateGoals('awaygoalconsider', 'awayGoalConsider', data);
        } else {
          this.updateGoals('homegoalscore', false);
          this.updateGoals('awaygoalscore', false);
          this.updateGoals('homegoalconsider', false);
          this.updateGoals('awaygoalconsider', false);
        }
      });
    this.goalId = null;
  }
  private updateGoals(formName: string, returnObjectName?: any, data?: any) {
    returnObjectName ? this.goalForm.get(formName).setValue(this.goalScore.find(res => {
      return res.value === data[returnObjectName];
    }).value) : this.goalForm.get(formName).setValue('');
  }

  playerSeasonChange(event: any) {
    this.goalId = null;
    this.updateGoals('homegoalscore', false);
    this.updateGoals('awaygoalscore', false);
    this.updateGoals('homegoalconsider', false);
    this.updateGoals('awaygoalconsider', false);
    this.updateGoals('clubNameplayerPlayed', false);
    this.updateGoalInformation(event);
  }

   updateGoalInformation(event: any) {
     this.springService.get('/getGoalInformation/' + event + '/' + this.goalForm.value.playerName).pipe(
       catchError(this.handleError.errorHandlingOfGoalInformation)
     ).subscribe(data => {
       this.goalDetails = new MatTableDataSource(data);
       this.goalDetails.paginator = this.paginator;
     }, error => {
     });
   }

  applyFilter(value: any) {
    this.goalDetails.filter = value.trim().toLowerCase();
  }
}

export interface Season {
  id: any;
  seasonName: any;
}

export  interface  Goal {
  id: any;
  playerId: any;
  seasonId: any;
  homeGoalScore: any;
  awatyGoalScore: any;
  homeGoalConsider: any;
  awayGoalConsider: any;
  clubId: any;
  value: any;
}
