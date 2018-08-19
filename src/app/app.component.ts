import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
const loginForm = {
  name: [ '', Validators.required ],
  password: [ '', Validators.required ]
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  public userForm: FormGroup;
  constructor(
     private formBilder: FormBuilder,
      
  ){
    this.userForm = this.formBilder.group(loginForm);   
  }
  public onSubmit() {
    if (this.userForm.valid) {
    console.log("Your user Name is "+this.userForm.value.name);
    console.log("Your password is "+this.userForm.value.password);
    }
  }
}
