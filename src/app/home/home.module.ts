import { NgModule } from '@angular/core';
import  { HomeRoutingModule, homeComponents } from './home.route';
import { MyOwnCustomMaterialModule } from '../material'
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    declarations: [ 
        homeComponents
    ],
    imports: [
        HomeRoutingModule,
        ReactiveFormsModule,
    
        MyOwnCustomMaterialModule
    ],
    exports: []
})
export class HomeModule {

}
