import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder, AbstractControl } from '@angular/forms';
import { MessageService } from '../../share/message.service'
import { SpringService } from '../../share/springService/spring.service'
import { Clubs } from '../../share/clubname';
import { HttperrorresponseService } from '../../share/httpErrorHandlingService/httperrorresponse.service'
import { catchError } from 'rxjs/operators';
import { CustomValidators } from '../../validators/custom-validators';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-insert-clubs',
  templateUrl: './insert-clubs.component.html',
  styleUrls: ['./insert-clubs.component.css']
})

export class InsertClubsComponent implements OnInit{
  clubdetails = new MatTableDataSource();
  displayedColumns:string[] = [
    'fileName','clubName','isCurrentSeasonPlaying'
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
  public clubForm: FormGroup;
  selectedFile = null;
  constructor(
    private formBilder: FormBuilder,
    private messageService: MessageService,
    private springService: SpringService,
    private handleError: HttperrorresponseService,   
  ) { 
    this.clubForm = this.formBilder.group(this.myClubForm);
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
       }, error => {
         console.log("This is an error "+error);
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
    this.springService.getAllClubs().pipe(
      catchError(this.handleError.errorHandling)
    ).subscribe(res => {
      this.clubdetails.data = res;
    }, error => {
      this.messageService.showMessage(error.message.error.erroMessage);
    });
  }
    
}