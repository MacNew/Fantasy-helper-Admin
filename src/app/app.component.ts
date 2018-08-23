import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
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
    constructor(public router:Router) {
    
    }
}
