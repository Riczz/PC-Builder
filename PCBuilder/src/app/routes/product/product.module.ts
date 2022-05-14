import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { ProductComponent } from './product.component';
import {MatTableModule} from '@angular/material/table';
import {ProductTableComponent} from './product-table/product-table.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    ProductComponent,
    ProductTableComponent
  ],
  imports: [
    CommonModule,
    ProductRoutingModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule
  ]
})
export class ProductModule { }
