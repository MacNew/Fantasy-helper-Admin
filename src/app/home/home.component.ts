import { Component, OnInit } from '@angular/core';
import { AuthService } from '../share/authService/authentication.service'

@Component({
  selector: 'app-dashboard',
  templateUrl: './home.component.html'
  
})
export class HomeComponent implements OnInit {

  constructor(private auth:AuthService) { }

  ngOnInit() {
    
  }

}
