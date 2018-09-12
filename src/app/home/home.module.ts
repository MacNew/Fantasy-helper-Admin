import { NgModule } from '@angular/core';
import  { HomeRoutingModule, homeComponents } from './home.route';
import { MyOwnCustomMaterialModule } from '../material'
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { InsertPlayerComponent } from './insert-player/insert-player.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
    suppressScrollX: true
  };


@NgModule({
    declarations: [ 
        homeComponents, InsertPlayerComponent
    ],
    imports: [
        HomeRoutingModule,
        ReactiveFormsModule,
        CommonModule,
        BrowserModule,  
        MyOwnCustomMaterialModule,
        PerfectScrollbarModule
    ],
    providers: [
        {
          provide: PERFECT_SCROLLBAR_CONFIG,
          useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
        }],
    exports: []
})
export class HomeModule {

}
