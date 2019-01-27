import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder, AbstractControl } from '@angular/forms';
import { MessageService } from '../../share/message.service';
import { SpringService } from '../../share/springService/spring.service';
import { ClubService } from '../../share/club.service';
import { HttperrorresponseService } from '../../share/httpErrorHandlingService/httperrorresponse.service';
import { catchError } from 'rxjs/operators';
import { CustomValidators } from '../../validators/custom-validators';
import { MatTableDataSource, MatDialog } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogsPromptComponent } from '../../share/dialogs/dialogs-prompt.component';

@Component({
  selector: 'app-insert-clubs',
  templateUrl: './insert-clubs.component.html',
  styleUrls: ['./insert-clubs.component.css']
})

export class InsertClubsComponent implements OnInit{
  clubdetails = new MatTableDataSource();
  displayedColumns:string[] = [
    'fileName','clubName','isCurrentSeasonPlaying', 'action'
  ];
  deleteDialog: any;
  clubLogoName: string = "";
  imageSrc: string;
  clubsDetails : any[];
  myClubForm = {
  clubName: ['', Validators.required],
  file: ['',Validators.compose([
    Validators.required, CustomValidators.fileVlidation
    ])
  ],
  isCurrentPlaying: ['', Validators.required],
}
  private clubForm: FormGroup;
  selectedFile = null;
  private onDestroy$ = new Subject<void>();
  constructor(
    private formBilder: FormBuilder,
    private messageService: MessageService,
    private springService: SpringService,
    private handleError: HttperrorresponseService,
    private router: Router,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private clubService: ClubService
    
  ) { 
    this.clubForm = this.formBilder.group(this.myClubForm);
    this.clubService.clublistStateChange$.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
       this.getClubList();    
    });

    route.params.subscribe(val => {
      if (this.route.snapshot.url[1] && this.route.snapshot.url[1].path === 'edit') {
        this.springService.get('/getclubName/' + this.route.snapshot.paramMap.get('id'))
        .subscribe((data) => {
          data.isCurrentPlaying = data['currentSeasonPlaying'].toString();
          this.clubForm.patchValue(data);
        }, (error) => {
          console.log(error);
        });
      }
      this.getClubList();
    });
  }
  applyFilter(filterValue: any) {
    this.clubdetails.filter = filterValue.trim().toLowerCase();
  }

  onSubmit() {
    if (this.clubForm.valid) { 
      var formDate: FormData = new FormData();
      var clubId = this.route.snapshot.url[(this.route.snapshot.url.length-1)].path;
      var insertOrEdit;
      clubId === 'insertclubs' ? '':formDate.append('clubId', clubId);
      formDate.append('file', this.selectedFile);
      formDate.append('clubName', this.clubForm.value.clubName);
      formDate.append('isPlaying', this.clubForm.value.isCurrentPlaying);
      if (clubId === 'insertclubs') {
        insertOrEdit = this.springService.post('/insert/clubs',formDate);
      } else {
        insertOrEdit = this.springService.put('/edit/clubs', formDate); 
      }
      insertOrEdit.pipe(
        catchError(this.handleError.errorHandling)
       ).subscribe(res => {
         this.messageService.showMessage('Club inserted '+ this.clubForm.value.clubName);
         this.clubForm.reset();
         this.imageSrc = 'http://placehold.it/180';
         this.clubService.clubListStateChange.next();
       }, error => {
        this.messageService.showMessage(error.message.error.erroMessage);
       });       
      }
  }
  
  onFileSelected(event): void {
      this.selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result.toString();
      reader.readAsDataURL(this.selectedFile);
  }

  ngOnInit() {

  }

  getClubList() {
    this.springService.get('/currentseason/get/clubs').pipe(
      catchError(this.handleError.errorHandling)
    ).subscribe(res => {
      this.clubdetails.data = res;
    }, error => {
      this.messageService.showMessage(error.message.error.erroMessage);
    });
  }

  updateClub(club) {
    this.router.navigate([ '/home/insertclubs/edit/' + club.id ]);
  }

  deleteClick(clubDetails) {
    this.deleteDialog = this.dialog.open(DialogsPromptComponent, {
      data: {
        okClick: this.deleteClub(clubDetails),
        changeType: 'delete',
        type: 'club',
        displayName: clubDetails.clubName
      }
    });
  }

  deleteClub(clubDetails) {
    return () => {
      this.springService.delete("/delete/club/" + clubDetails.id).pipe(
        catchError(this.handleError.errorHandling)
      ).subscribe((data) => {
          this.getClubList();
          this.deleteDialog.close();
          this.messageService.showMessage('You have deleted Meetup ' + clubDetails.clubName);
        }, error => this.deleteDialog.componentInstance.message = 'There was a problem deleting this club');
    };
  }
}
