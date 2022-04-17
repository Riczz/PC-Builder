import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CpuRoutingModule } from './cpu-routing.module';
import { CpuComponent } from './cpu.component';


@NgModule({
  declarations: [
    CpuComponent
  ],
  imports: [
    CommonModule,
    CpuRoutingModule
  ]
})
export class CpuModule { }
