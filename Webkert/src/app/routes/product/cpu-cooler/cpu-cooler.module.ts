import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CpuCoolerRoutingModule } from './cpu-cooler-routing.module';
import { CpuCoolerComponent } from './cpu-cooler.component';


@NgModule({
  declarations: [
    CpuCoolerComponent
  ],
  imports: [
    CommonModule,
    CpuCoolerRoutingModule
  ]
})
export class CpuCoolerModule { }
