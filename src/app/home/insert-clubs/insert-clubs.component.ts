import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
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
  public clubForm: FormGroup;
  constructor(
    private formBilder: FormBuilder,
    private messageService: MessageService,
    private springService: SpringService,
    private handleError: HttperrorresponseService
  ) { 
    this.clubForm = this.formBilder.group({
      clubName: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.clubForm.valid) {
      const club: Clubs = {
        'clubName': this.clubForm.value.clubName 
      }
       this.springService.insertClubName(club).pipe(
        catchError(this.handleError.errorHandling)
       ).subscribe(res => {
         this.messageService.showMessage('Club inserted '+ this.clubForm.value.clubName);
       }, error => {
        
        this.messageService.showMessage(error.message);
       });

      }
  
  }

}
