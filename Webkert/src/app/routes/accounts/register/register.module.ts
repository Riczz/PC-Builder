import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RegisterRoutingModule } from './register-routing.module';
import {RegisterComponent, RegisterErrorDialog} from './register.component';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {ReactiveFormsModule} from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {LoadingSpinnerModule} from '../../../modules/loading-spinner/loading-spinner.module';
import {MatDialogModule} from '@angular/material/dialog';
import {FlexLayoutModule} from '@angular/flex-layout';


@NgModule({
  declarations: [
    RegisterComponent,
    RegisterErrorDialog
  ],
  imports: [
    CommonModule,
    RegisterRoutingModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    LoadingSpinnerModule,
    MatDialogModule,
    FlexLayoutModule
  ]
})
export class RegisterModule { }
