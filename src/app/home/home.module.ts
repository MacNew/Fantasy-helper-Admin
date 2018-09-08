import { NgModule } from '@angular/core';
import  { HomeRoutingModule, homeComponents } from './home.route';
import { MyOwnCustomMaterialModule } from '../material'
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';  
import { BrowserModule } from '@angular/platform-browser';
import { InsertPlayerComponent } from './insert-player/insert-player.component';


@NgModule({
    declarations: [ 
        homeComponents, InsertPlayerComponent
    ],
    imports: [
        HomeRoutingModule,
        ReactiveFormsModule,
        CommonModule,
        BrowserModule,  
        MyOwnCustomMaterialModule
    ],
    exports: []
})
export class HomeModule {

}
