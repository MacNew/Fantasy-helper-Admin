import { MatInputModule,MatButtonModule} from '@angular/material'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
    imports: [ MatFormFieldModule, MatButtonModule, FormsModule,MatInputModule],
    exports: [MatButtonModule, MatFormFieldModule, FormsModule, MatInputModule]
})
export class MyOwnCustomMaterialModule {

}