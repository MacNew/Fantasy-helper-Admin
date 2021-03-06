import {Component, OnInit, ViewChild} from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { MessageService } from '../../share/message.service';
import { SpringService } from '../../share/springService/spring.service';
import { PlayerService } from '../../share/player.service';
import { HttperrorresponseService } from '../../share/httpErrorHandlingService/httperrorresponse.service'
import { catchError, switchMap } from 'rxjs/operators';
import { CustomValidators } from '../../validators/custom-validators';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { DomSanitizer } from '@angular/platform-browser';
import { forkJoin, Subject } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

export interface Position {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-insert-player',
  templateUrl: './insert-player.component.html',
  styleUrls: ['./insert-player.component.css']
})
export class InsertPlayerComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  clubName: string;
  private onDestroy$ = new Subject<void>();
  playerdetails: MatTableDataSource<[{}]>; // = new MatTableDataSource();
  displayedColumns: string[] = [
    'fileName', 'playerName', 'playerPosition'
  ];
  playerPositions: Position[] = [
    {value: 'Forward', viewValue: 'Forward'},
    {value: 'Midfielder', viewValue: 'Midfielder'},
    {value: 'Defender', viewValue: 'Defender'},
    {value: 'GoalKeeper', viewValue: 'GoalKeeper'}
  ];
  clublist: ClubDetails[] = [];
  clubImage: any;
  playerImage: any;
  selectedFile = null;
  player = {
    playerclubName: ['', Validators.required],
    playerName: ['', Validators.required],
    playerPosition: ['', Validators.required],
    file: ['', Validators.compose([
      Validators.required, CustomValidators.fileVlidation
    ])]
  }
  private playerForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private springService: SpringService,
    private handleError: HttperrorresponseService,
    private sanitizer: DomSanitizer,
    private playerService: PlayerService
  ) {
     this.playerForm = this.formBuilder.group(this.player);
     }

  ngOnInit() {
    this.assignedClubName();
    this.playerService.playerListStateChange$.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      this.playerStageChange();
   });
  }

  assignedClubName() {
     this.springService.get('/currentseason/get/clubs')
     .subscribe((data: any) => {
      data.forEach(element => {
        this.clublist.push(Object.assign({ clubName: element.clubName, id: element.id }));
      });
     });
  }

  playerStageChange() {
    this.springService.get('/get/player/' + this.playerForm.value.playerclubName.toString())
    .subscribe(res => {
      this.playerdetails.data = res;
    });
  }

  clubNameChanged(event) {
    this.springService.get('/fileName/' + event).pipe(
      catchError(this.handleError.errorHandling),
        switchMap((res: any) => {
          this.clubName = res.clubName;
          return forkJoin(this.springService.get('/downloadFile/' + res['fileName'],
          {
            headers: new HttpHeaders().set('Authorization', 'Token ' + localStorage.getItem('token')),
            responseType: 'blob'
          }), this.springService.get('/get/player/' + this.playerForm.value.playerclubName.toString()))} )
       ).subscribe((res: any ) => {
         console.log('Image', res[0]);
         const UrlCreator = window.URL;
         this.clubImage = this.sanitizer.bypassSecurityTrustUrl(
         UrlCreator.createObjectURL(res[0]));
         this.playerdetails = new MatTableDataSource(res[1]);
         this.playerdetails.paginator = this.paginator;
    }, error => {
       this.messageService.showMessage(error.message);
    });
  }
  applyFilter(filterValue: any) {
    this.playerdetails.filter = filterValue.trim().toLowerCase();
  }

  onSubmit() {
   const formData: FormData = new FormData();
   formData.append('file', this.selectedFile);
   formData.append('playerName', this.playerForm.value.playerName);
   formData.append('clubId', this.playerForm.value.playerclubName);
   formData.append('playerPosition', this.playerForm.value.playerPosition);
   this.springService.post('/insert/player', formData).pipe(
     catchError(this.handleError.errorHandling)
   ).subscribe(data => {
    this.playerService.playerListStateChange.next();
     this.messageService.showMessage('player inserted Sucessfully');
   }, error => {
      this.messageService.showMessage('data can t inserted');
   });
  }

  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => this.playerImage = reader.result.toString();
    reader.readAsDataURL(this.selectedFile);
  }
}

export interface ClubDetails {
  clubName: any;
  id: any;
  fileName: any;
}
