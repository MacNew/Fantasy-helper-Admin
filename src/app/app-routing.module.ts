import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  {
      path: '',            //<---- parent component declared here
      component: AppComponent,
      children: [                          //<---- child components declared here
          {
              path:'login',
              component: LoginComponent
          },
          {
              path:'dashboard',
              component: DashboardComponent,
              canActivate: [AuthGuard]
          },
          {
            path:'',
            component: LoginComponent,
        }
      ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponent= [DashboardComponent,LoginComponent];
