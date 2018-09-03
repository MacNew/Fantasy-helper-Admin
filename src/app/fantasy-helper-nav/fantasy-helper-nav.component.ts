import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fantasy-helper-nav',
  templateUrl: './fantasy-helper-nav.component.html',
  styleUrls: ['./fantasy-helper-nav.component.css']
})
export class FantasyHelperNavComponent {
  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );
    
  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}
  
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
   }
  }


