import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VideoCardRoutingModule } from './video-card-routing.module';
import { VideoCardComponent } from './video-card.component';


@NgModule({
  declarations: [
    VideoCardComponent
  ],
  imports: [
    CommonModule,
    VideoCardRoutingModule
  ]
})
export class VideoCardModule { }
