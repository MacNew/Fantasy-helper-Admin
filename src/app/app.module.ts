import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyOwnCustomMaterialModule } from './material'
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule, routingComponent } from './app-routing.module';
import { HomeModule } from './home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './share/authService/authentication.service';
import { SpringService } from './share/springService/spring.service';
import { SeasonService } from './share/seasonService';
import { PlayerService } from './share/player.service';
import { HttperrorresponseService } from './share/httpErrorHandlingService/httperrorresponse.service'
import { MessageService } from './share/message.service';
import { AuthGuard } from './auth.guard';
import { LayoutModule } from '@angular/cdk/layout';
import { FantasyHelperNavComponent } from './fantasy-helper-nav/fantasy-helper-nav.component'
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { DialogsPromptComponent } from './share/dialogs/dialogs-prompt.component';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [
   AppComponent,
   routingComponent,
   FantasyHelperNavComponent,
   DialogsPromptComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MyOwnCustomMaterialModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    HomeModule,
    PerfectScrollbarModule
  ],
  providers: [ {
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  },AuthService, SpringService, HttperrorresponseService, AuthGuard,MessageService ],
  bootstrap: [ AppComponent ],
  entryComponents: [DialogsPromptComponent]
})
export class AppModule { }
