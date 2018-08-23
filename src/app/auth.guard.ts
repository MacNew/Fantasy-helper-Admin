import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './share/authService/authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  
  constructor(private authService: AuthService, 
              private router: Router   
  ) {}

  canActivate(route: ActivatedRouteSnapshot) : boolean {
    const data = route.data[0];
    console.log('My data', data);
    switch(data) {
       case 'dashboardComponent':
       if (!!localStorage.getItem('token')) {
        return true;
     } else {
       this.router.navigate(['/login']);
       return false; 
     } 
      case 'loginComponent':
      if (!!localStorage.getItem('token')) {
        this.router.navigate(['/dashboard'])
        return false;
      } else {
        return true; 
      }
      case '':
      if (!!localStorage.getItem('token')) {
        this.router.navigate(['/dashboard'])
        return false;
      } else {
        return true; 
      }
      
    }
  }  
}
