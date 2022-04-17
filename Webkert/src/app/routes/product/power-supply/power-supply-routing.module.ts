import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PowerSupplyComponent } from './power-supply.component';

const routes: Routes = [{ path: '', component: PowerSupplyComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PowerSupplyRoutingModule { }
