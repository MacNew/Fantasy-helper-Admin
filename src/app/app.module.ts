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
import { HttperrorresponseService } from './share/httpErrorHandlingService/httperrorresponse.service'
import { MessageService } from './share/message.service';
import { AuthGuard } from './auth.guard';
import { LayoutModule } from '@angular/cdk/layout';
import { FantasyHelperNavComponent } from './fantasy-helper-nav/fantasy-helper-nav.component'
@NgModule({
  declarations: [
   AppComponent,
   routingComponent,
   FantasyHelperNavComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MyOwnCustomMaterialModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    HomeModule
  ],
  providers: [ AuthService, SpringService, HttperrorresponseService, AuthGuard,MessageService ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
