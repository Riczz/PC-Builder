import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MotherboardComponent } from './motherboard.component';

const routes: Routes = [{ path: '', component: MotherboardComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MotherboardRoutingModule { }
