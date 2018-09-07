import { Routes, RouterModule } from '@angular/router';
import { InsertClubsComponent } from './insert-clubs/insert-clubs.component'
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from '../pagenotfound/page-not-found.component';
import { DisplayClubsInsertedComponent } from './display-clubs-inserted/display-clubs-inserted.component'
import { AuthGuard } from '../auth.guard';

const routes: Routes = [
  {
      path: 'home',component: HomeComponent,
      children: [
        {
          path:'insertclubs',
          component: InsertClubsComponent,
          canActivate : [AuthGuard]
        },
      ],
      },
      { path:'**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class HomeRoutingModule {
    
 }
export const homeComponents = [InsertClubsComponent,PageNotFoundComponent,DisplayClubsInsertedComponent];
