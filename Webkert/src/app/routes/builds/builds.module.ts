import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuildsRoutingModule } from './builds-routing.module';
import { BuildsComponent } from './builds.component';
import {IndexModule} from '../index/index.module';
import {BuildViewerComponent, DeleteBuildDialog} from './build-viewer/build-viewer.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { BuildSelectorComponent } from './build-selector/build-selector.component';
import {MatListModule} from '@angular/material/list';
import {FormsModule} from '@angular/forms';
import {LoadingSpinnerModule} from '../../modules/loading-spinner/loading-spinner.module';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    BuildsComponent,
    BuildViewerComponent,
    BuildSelectorComponent,
    DeleteBuildDialog
  ],
  exports: [
    BuildSelectorComponent
  ],
  imports: [
    CommonModule,
    BuildsRoutingModule,
    IndexModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    FormsModule,
    LoadingSpinnerModule,
    MatIconModule,
    MatDialogModule
  ]
})
export class BuildsModule { }
