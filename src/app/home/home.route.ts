import { Routes, RouterModule } from '@angular/router';
import { InsertClubsComponent } from './insert-clubs/insert-clubs.component'
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { PageNotFoundComponent } from '../pagenotfound/page-not-found.component';
import { DisplayClubsInsertedComponent } from './display-clubs-inserted/display-clubs-inserted.component'
import { AuthGuard } from '../auth.guard';
import { InsertPlayerComponent } from './insert-player/insert-player.component'

const routes: Routes = [
  {
      path: 'home',component: HomeComponent,
      children: [
        {
          path:'insertclubs',
          component: InsertClubsComponent,
          canActivate : [AuthGuard]
        },
        {
          path:'insertclubs/edit/:id',
          component: InsertClubsComponent,
          canActivate : [AuthGuard]
        },
        {
         path: 'insertplayer',
         component: InsertPlayerComponent,
         canActivate: [AuthGuard]
        }
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
