import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
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
    switch(data) {
       case 'homeComponent':
       if (!!localStorage.getItem('token')) {
        return true;
     } else {
       this.router.navigate(['/login']);
       return false; 
     } 
      case 'loginComponent':
      if (!!localStorage.getItem('token')) {
        this.router.navigate(['/home'])
        return false;
      } else {
        return true; 
      }
      case '':
      if (!!localStorage.getItem('token')) {
        this.router.navigate(['/home'])
        return false;
      } else {
        return true; 
      }
    }
    // Insert Clubs Authenticated
     if (route.url[0].path ==='insertclubs'
      || route.url[0].path === 'insertplayer'
      || route.url[0].path === 'season'
      || route.url[0].path === 'goalupdate'
     ) {
      if (this.authService.isAdmin()) {
        return true;
      } else {
        return false;
      }
     }
  }
}
