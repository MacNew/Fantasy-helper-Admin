import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Route } from '@angular/router';
import { Router } from '@angular/router';
import { AuthService } from '../share/authService/authentication.service';
import { User } from '../share/user';
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
    private databaseService: AuthService
     
 ){
   this.userForm = this.formBilder.group(loginForm);   
 }

 public onSubmit() {
  if (this.userForm.valid) {
    const user: User = { 'userName': 'MacNew','password': 'test'}; 
    this.databaseService.authenticateToken(user).subscribe(
      mytoken => {
        localStorage.setItem('token',mytoken.token);
        console.log('Token', localStorage.getItem('token'));
      }
    ), erro => console.log('Error on onSubmit()');
  }
}
}
