import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder, AbstractControl } from '@angular/forms';
import { MessageService } from '../../share/message.service'
import { SpringService } from '../../share/springService/spring.service'
import { Clubs } from '../../share/clubname';
import { HttperrorresponseService } from '../../share/httpErrorHandlingService/httperrorresponse.service'
import { catchError } from 'rxjs/operators';
@Component({
  selector: 'app-insert-clubs',
  templateUrl: './insert-clubs.component.html',
  styleUrls: ['./insert-clubs.component.css']
})

export class InsertClubsComponent {
  clubLogoName: string = "";
  myClubForm = {
  clubName: ['', Validators.required],
  file: ['', Validators.required],
  isCurrentPlaying: ['', Validators.required]
}
  public clubForm: FormGroup;
  selectedFile = null;
  constructor(
    private formBilder: FormBuilder,
    private messageService: MessageService,
    private springService: SpringService,
    private handleError: HttperrorresponseService
  ) { 
    this.clubForm = this.formBilder.group(this.myClubForm);
  }
  
  onSubmit() {
    if (this.clubForm.valid) {
      const club: Clubs = {
        'clubName': this.clubForm.value.clubName,
        'isPlaying': this.clubForm.value.isCurrentPlaying
      }
       this.springService.insertClubName(club, this.selectedFile).pipe(
        catchError(this.handleError.errorHandling)
       ).subscribe(res => {
         this.messageService.showMessage('Club inserted '+ this.clubForm.value.clubName);
         this.clubForm.reset();
       }, error => {
         console.log(error);
        this.messageService.showMessage(error.message.error.erroMessage);
        
       });
      }
  }
  imageSrc: string;
  onFileSelected(event): void {
      this.selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = e => this.imageSrc = reader.result;
      reader.readAsDataURL(this.selectedFile);    
  }

}
