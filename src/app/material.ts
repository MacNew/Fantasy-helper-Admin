import { MatInputModule, MatButtonModule, MatSidenavModule, MatListModule} from '@angular/material';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatCardModule, MatIconModule, MatToolbarModule, MatTableModule, MatDialogModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatSelectModule } from '@angular/material/select';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatMenuModule} from '@angular/material/menu';
import {MatPaginatorModule} from '@angular/material/paginator';
@NgModule({
    imports: [ MatFormFieldModule, MatButtonModule,
        FormsModule, MatSidenavModule, MatListModule,
        MatInputModule, MatCardModule, MatIconModule,
        MatToolbarModule, FlexLayoutModule, MatSelectModule,
        MatTableModule, MatGridListModule, MatMenuModule, MatDialogModule, MatPaginatorModule
    ],
    exports: [MatButtonModule, MatFormFieldModule, MatListModule,
        FormsModule, MatInputModule, MatSidenavModule,
        MatSnackBarModule, MatCardModule, MatIconModule,
        MatToolbarModule, FlexLayoutModule, MatSelectModule, MatTableModule,
        MatGridListModule, MatMenuModule, MatDialogModule, MatPaginatorModule
    ]
})
export class MyOwnCustomMaterialModule {

}
