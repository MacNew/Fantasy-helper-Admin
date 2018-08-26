import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Route } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../share/authService/authentication.service';
import { User } from '../share/user';
import { HttperrorresponseService } from '../share/httpErrorHandlingService/httperrorresponse.service'
import { catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { MessageService } from '../share/message.service';
import { HttpResponse } from '@angular/common/http';

const loginForm = {
  name: [ '', Validators.required ],
  password: [ '', Validators.required ]
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent  {
  public userForm: FormGroup;
  constructor(
    private formBilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private handleError: HttperrorresponseService,
    private messageService: MessageService
 ){
   this.userForm = this.formBilder.group(loginForm);   
 }

 public onSubmit() {
  if (this.userForm.valid) {
    const user: User = {
      'userName': this.userForm.value.name,
      'password': this.userForm.value.password
    }
      this.authService.getToken(user).pipe(
        catchError(this.handleError.errorHandling) 
      ).subscribe(mytoken => {
        localStorage.setItem('token', mytoken.token);
        this.router.navigate(["/home"]);
      }, error => {
         this.messageService.showMessage('User name or password does not match');
      });
  }
}
}
