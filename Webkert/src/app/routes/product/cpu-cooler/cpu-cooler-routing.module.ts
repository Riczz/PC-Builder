import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CpuCoolerComponent } from './cpu-cooler.component';

const routes: Routes = [{ path: '', component: CpuCoolerComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CpuCoolerRoutingModule { }
