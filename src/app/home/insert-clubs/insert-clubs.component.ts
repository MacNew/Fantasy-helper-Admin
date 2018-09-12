import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder, AbstractControl } from '@angular/forms';
import { MessageService } from '../../share/message.service'
import { SpringService } from '../../share/springService/spring.service'
import { Clubs } from '../../share/clubname';
import { HttperrorresponseService } from '../../share/httpErrorHandlingService/httperrorresponse.service'
import { catchError } from 'rxjs/operators';
import { CustomValidators } from '../../validators/custom-validators';
import { MatTableDataSource } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';

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
  clubLogoName: string = "";
  imageSrc: string;
  clubsDetails : any[];
  myClubForm = {
  clubName: ['', Validators.required],
  file: ['', 
    Validators.compose([
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
    private route: ActivatedRoute
    
  ) { 
    this.clubForm = this.formBilder.group(this.myClubForm);
    this.springService.clublistStateChange$.pipe(takeUntil(this.onDestroy$)).subscribe(() => {
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

  onSubmit() {
    if (this.clubForm.valid) {
      const club: Clubs = {
        'clubName': this.clubForm.value.clubName,
        'isPlaying': this.clubForm.value.isCurrentPlaying, 
      }
       this.springService.insertClubName(club, this.selectedFile).pipe(
        catchError(this.handleError.errorHandling)
       ).subscribe(res => {
         this.messageService.showMessage('Club inserted '+ this.clubForm.value.clubName);
         this.clubForm.reset();
         this.imageSrc = 'http://placehold.it/180';
         this.springService.clubListStateChange.next();
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
    this.springService.getAllClubs().pipe(
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
}