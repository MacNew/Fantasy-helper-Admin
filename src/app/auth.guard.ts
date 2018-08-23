import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './share/authService/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, 
              private router: Router   
  ) {

  }
  canActivate() : boolean {
    if (!!localStorage.getItem('token')) {
       return true;
    } else {
      this.router.navigate(['/login']);
      return false; 
    } 
  }

}
