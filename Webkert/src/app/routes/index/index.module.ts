import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {IndexRoutingModule} from './index-routing.module';
import {IndexComponent} from './index.component';
import {MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {BuildTableComponent, SaveBuildDialog} from '../../components/build-table/build-table.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import {LoadingSpinnerModule} from '../../modules/loading-spinner/loading-spinner.module';
import {MatDialogModule} from '@angular/material/dialog';
import {FormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    IndexComponent,
    BuildTableComponent,
    SaveBuildDialog
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatPaginatorModule,
    MatSortModule,
    MatSnackBarModule,
    LoadingSpinnerModule,
    MatDialogModule,
    FormsModule,
    MatDividerModule,
    MatInputModule,
    MatSelectModule,
    MatRadioModule,
  ]
})
export class IndexModule {}
