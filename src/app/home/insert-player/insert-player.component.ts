import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder, AbstractControl } from '@angular/forms';
import { MessageService } from '../../share/message.service'
import { SpringService } from '../../share/springService/spring.service'
import { Clubs } from '../../share/clubname';
import { HttperrorresponseService } from '../../share/httpErrorHandlingService/httperrorresponse.service'
import { catchError } from 'rxjs/operators';
import { CustomValidators } from '../../validators/custom-validators';
import { MatTableDataSource } from '@angular/material';
import { takeUntil,map } from 'rxjs/operators';
import { Subject, of } from 'rxjs';


@Component({
  selector: 'app-insert-player',
  templateUrl: './insert-player.component.html',
  styleUrls: ['./insert-player.component.css']
})
export class InsertPlayerComponent implements OnInit {
  clublist: clubDetails[]=[];
  player = {
    clubName: ['',Validators.required],
    playerName: ['',Validators.required],
    file: ['',Validators.compose([
      Validators.required, CustomValidators.fileVlidation
    ])]
  }
  private playerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private springService: SpringService,
    private handleError: HttperrorresponseService,
    ) {
     this.playerForm = this.formBuilder.group(this.player);
     }

  ngOnInit() {
    this.assignedClubName();       
  }

  assignedClubName() {
     this.springService.getAllClubs()
     .subscribe((data:any)=>{
      data.forEach(element => {
        this.clublist.push(Object.assign({clubName: element.clubName,id:element.id}));
      });
     });
  }
}

export interface clubDetails {
  clubName: any;
  id: any;
}