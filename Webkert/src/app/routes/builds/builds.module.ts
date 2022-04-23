import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BuildsRoutingModule } from './builds-routing.module';
import { BuildsComponent } from './builds.component';
import {IndexModule} from '../index/index.module';
import { BuildViewerComponent } from '../../components/build-viewer/build-viewer.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { BuildSelectorComponent } from '../../components/build-selector/build-selector.component';
import {MatListModule} from '@angular/material/list';
import {FormsModule} from '@angular/forms';


@NgModule({
  declarations: [
    BuildsComponent,
    BuildViewerComponent,
    BuildSelectorComponent
  ],
  imports: [
    CommonModule,
    BuildsRoutingModule,
    IndexModule,
    MatCardModule,
    MatButtonModule,
    MatListModule,
    FormsModule
  ]
})
export class BuildsModule { }
