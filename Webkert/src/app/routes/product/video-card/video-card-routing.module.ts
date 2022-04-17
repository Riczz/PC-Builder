import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoCardComponent } from './video-card.component';

const routes: Routes = [{ path: '', component: VideoCardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VideoCardRoutingModule { }
