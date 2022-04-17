import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ProductComponent} from './product.component';

const routes: Routes = [{path: '', component: ProductComponent}, {
  path: 'cpu',
  data: {title: 'Choose a Processor'},
  loadChildren: () => import('./cpu/cpu.module').then(m => m.CpuModule)
}, {
  path: 'cpu-cooler',
  data: {title: 'Choose a CPU Cooler'},
  loadChildren: () => import('./cpu-cooler/cpu-cooler.module').then(m => m.CpuCoolerModule)
}, {
  path: 'motherboard',
  data: {title: 'Choose a Motherboard'},
  loadChildren: () => import('./motherboard/motherboard.module').then(m => m.MotherboardModule)
}, {
  path: 'video-card',
  data: {title: 'Choose a Video Card'},
  loadChildren: () => import('./video-card/video-card.module').then(m => m.VideoCardModule)
}, {
  path: 'memory',
  data: {title: 'Choose Memory'},
  loadChildren: () => import('./memory/memory.module').then(m => m.MemoryModule)
}, {
  path: 'case',
  data: {title: 'Choose a Case'},
  loadChildren: () => import('./case/case.module').then(m => m.CaseModule)
}, {
  path: 'power-supply',
  data: {title: 'Choose a PSU'},
  loadChildren: () => import('./power-supply/power-supply.module').then(m => m.PowerSupplyModule)
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule {
}
