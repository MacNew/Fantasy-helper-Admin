import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
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
              component: LoginComponent,
              canActivate: [AuthGuard],
              data: ['loginComponent']
          },
          {
              path:'home',
              component: HomeComponent,
              canActivate: [AuthGuard],
              data: ['homeComponent']
          },
          {
            path:'',
            component: LoginComponent,
            canActivate: [AuthGuard],
            data: ['']
        },
        
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
export const routingComponent= [HomeComponent,LoginComponent];
