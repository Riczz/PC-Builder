import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IndexRoutingModule } from './index-routing.module';
import { IndexComponent } from './index.component';
import { MatTableModule} from '@angular/material/table';
import { BuildTableComponent } from '../../components/build-table/build-table.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [
    IndexComponent,
    BuildTableComponent
  ],
  imports: [
    CommonModule,
    IndexRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ]
})
export class IndexModule { }
