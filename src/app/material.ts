import { MatInputModule,MatButtonModule} from '@angular/material'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSnackBarModule} from '@angular/material/snack-bar';
@NgModule({
    imports: [ MatFormFieldModule, MatButtonModule, FormsModule,MatInputModule],
    exports: [MatButtonModule, MatFormFieldModule, FormsModule, MatInputModule, MatSnackBarModule]
})
export class MyOwnCustomMaterialModule {

}