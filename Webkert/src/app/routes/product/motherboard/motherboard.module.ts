import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MotherboardRoutingModule } from './motherboard-routing.module';
import { MotherboardComponent } from './motherboard.component';


@NgModule({
  declarations: [
    MotherboardComponent
  ],
  imports: [
    CommonModule,
    MotherboardRoutingModule
  ]
})
export class MotherboardModule { }
