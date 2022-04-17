import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PowerSupplyRoutingModule } from './power-supply-routing.module';
import { PowerSupplyComponent } from './power-supply.component';


@NgModule({
  declarations: [
    PowerSupplyComponent
  ],
  imports: [
    CommonModule,
    PowerSupplyRoutingModule
  ]
})
export class PowerSupplyModule { }
