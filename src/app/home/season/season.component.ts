import { Component, OnInit } from '@angular/core';
import { SpringService } from '../../share/springService/spring.service'
import { FormGroup, Validators,FormBuilder, AbstractControl } from '@angular/forms';
import { CustomValidators } from '../../validators/custom-validators';

@Component({
  selector: 'app-season-first',
  templateUrl: './season.component.html',
  styleUrls: ['./season.component.css']
})

export class Season implements OnInit {
  clublist: clubDetails[] = [];
  forwardPlayerlist: playerDetails[] = [];
  midfilderPlayerlist: playerDetails[] = [];
  defenderPlayerlist: playerDetails[] = [];
  goalkeeperslist: playerDetails[] = [];
  private seasonForm:FormGroup;
  mySeasonForm = {
    seasonName: ['', Validators.required],
    winerClub: ['', Validators.required, CustomValidators.matchClubsecond ],
    runnerUpClub: ['', Validators.required, CustomValidators.matchClub]  
  }
  constructor(
    private springService: SpringService,
    private formBilder: FormBuilder
    ) {
    this.seasonForm = this.formBilder.group(this.mySeasonForm);
  }

  ngOnInit() {
    this.assignedClubName();
    this.getPlayerlist('Forward').subscribe((data: any)=>{
      data.forEach(element => {
        this.forwardPlayerlist.push(Object.assign({playerName: element.playerName, id:element.id}));
      });
    });

    this.getPlayerlist('Midfielder').subscribe((data: any)=>{
      data.forEach(element => {
        this.midfilderPlayerlist.push(Object.assign({playerName: element.playerName, id:element.id}));
      });
    });

    this.getPlayerlist('Defender').subscribe((data: any)=>{
      data.forEach(element => {
        this.defenderPlayerlist.push(Object.assign({playerName: element.playerName, id:element.id}));
      });
    });

    this.getPlayerlist('GoalKeeper').subscribe((data: any)=>{
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