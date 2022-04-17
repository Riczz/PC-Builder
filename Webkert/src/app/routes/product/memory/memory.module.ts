import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MemoryRoutingModule } from './memory-routing.module';
import { MemoryComponent } from './memory.component';


@NgModule({
  declarations: [
    MemoryComponent
  ],
  imports: [
    CommonModule,
    MemoryRoutingModule
  ]
})
export class MemoryModule { }
