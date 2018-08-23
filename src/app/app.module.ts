import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyOwnCustomMaterialModule } from './material'
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule, routingComponent } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { DatabaserviceService } from './share/databaservice.service';

@NgModule({
  declarations: [
    AppComponent,
   routingComponent,
  
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MyOwnCustomMaterialModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    
  ],
  providers: [DatabaserviceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
