import { MatInputModule,MatButtonModule, MatSidenavModule, MatListModule} from '@angular/material'
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule, MatIconModule, MatToolbarModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
    imports: [ MatFormFieldModule, MatButtonModule, 
        FormsModule,MatSidenavModule,MatListModule,
        MatInputModule, MatCardModule, MatIconModule,
        MatToolbarModule,FlexLayoutModule
    ],
    exports: [MatButtonModule, MatFormFieldModule,MatListModule, 
        FormsModule, MatInputModule,MatSidenavModule, 
        MatSnackBarModule,MatCardModule, MatIconModule,
        MatToolbarModule,FlexLayoutModule]
})
export class MyOwnCustomMaterialModule {

}