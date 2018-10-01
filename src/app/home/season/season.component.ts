import { Component, OnInit } from '@angular/core';
import { SpringService } from '../../share/springService/spring.service'
import { FormGroup, Validators,FormBuilder, AbstractControl } from '@angular/forms';
import { CustomValidators } from '../../validators/custom-validators';
import { MessageService } from '../../share/message.service'
import { catchError } from 'rxjs/operators';
import { HttperrorresponseService } from '../../share/httpErrorHandlingService/httperrorresponse.service'
import { MatTableDataSource } from '@angular/material';
import { SeasonService } from '../../share/seasonService';
import { PlayerService } from '../../share/player.service';
import { Subject } from 'rxjs'
import { takeUntil } from 'rxjs/operators';


@Component({
  selector: 'app-season-first',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css']
})

export class Season implements OnInit {
  private onDestroy$ = new Subject<void>();
  seasionDetails = new MatTableDataSource();
  displayedColumns:string[] = [
    'seasonName','winerClubName','runnerUpClubName', 'topScorer','topMidFielder','topDefender','topGoalKepper'
  ];
  clublist: clubDetails[] = [];
  forwardPlayerlist: playerDetails[] = [];
  midfilderPlayerlist: playerDetails[] = [];
  defenderPlayerlist: playerDetails[] = [];
  goalkeeperslist: playerDetails[] = [];
  private seasonForm:FormGroup;
  mySeasonForm = {
    seasonName: ['', Validators.required],
    winerClub: ['', Validators.required, CustomValidators.matchClubsecond ],
    runnerUpClub: ['', Validators.required, CustomValidators.matchClub],
    forward: ['', Validators.required],
    midfielder: ['', Validators.required],
    defender: ['', Validators.required],
    goalkeeper: ['', Validators.required]
  }
  constructor(
    private springService: SpringService,
    private formBilder: FormBuilder,
    private messageService: MessageService,
    private handleError: HttperrorresponseService,
    private seasonService: SeasonService,
    private playerSerive: PlayerService
    ) {
      this.seasonForm = this.formBilder.group(this.mySeasonForm); 
      this.getSeasionList();
      this.seasonService.seasonStateChange$.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      this.getSeasionList();
   });
  }

  public getSeasionList() {
    this.springService.get('/season/getAll').subscribe(data=> {
    this.seasionDetails.data = data;
    });
  }

  ngOnInit() {
    this.assignedClubName();
    
    this.playerSerive.getPlayer('Forward').subscribe((data: any) => {
      data.forEach(element => {
        this.forwardPlayerlist.push(Object.assign({playerName: element.playerName, id:element.id}));
      });
    });

    this.playerSerive.getPlayer('Midfielder').subscribe((data: any) => {
      data.forEach(element => {
        this.midfilderPlayerlist.push(Object.assign({playerName: element.playerName, id:element.id}));
      });
    });

    this.playerSerive.getPlayer('Defender').subscribe((data: any) => {
      data.forEach(element => {
        this.defenderPlayerlist.push(Object.assign({playerName: element.playerName, id:element.id}));
      });
    });

    this.playerSerive.getPlayer('GoalKeeper').subscribe((data: any)=>{
      data.forEach(element => {
        this.goalkeeperslist.push(Object.assign({playerName: element.playerName, id:element.id}));
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

 onSubmit() { 
   if (this.seasonForm.valid) {
    this.springService.post('/season/save',{
      winerClubName: this.seasonForm.value.winerClub,
	    runnerUpClubName: this.seasonForm.value.runnerUpClub,
	    topScorer: this.seasonForm.value.forward,
	    topGoalKepper: this.seasonForm.value.goalkeeper,
	    topDefender: this.seasonForm.value.defender,
	    topMidFielder: this.seasonForm.value.midfielder,
	    seasonName: this.seasonForm.value.seasonName
    }).pipe(
      catchError(this.handleError.errorHandling)
    ).subscribe(data => {
      this.seasonForm.reset();
      this.seasonForm.controls['seasonName'].setErrors(null);
      this.seasonForm.controls['runnerUpClub'].setErrors(null);
      this.seasonForm.controls['goalkeeper'].setErrors(null);
      this.seasonForm.controls['defender'].setErrors(null);
      this.seasonForm.controls['midfielder'].setErrors(null);
      this.seasonForm.controls['winerClub'].setErrors(null);
      this.seasonForm.controls['forward'].setErrors(null);
      this.seasonService.seasonStateChange.next();
      this.messageService.showMessage("Season Data Save sucefully");
    }, error=> this.messageService.showMessage(error.statusCode));
   }
 }

 applyFilter(filterValue: any) {
  this.seasionDetails.filter = filterValue.trim().toLowerCase();
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