import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import {LoginComponent, LoginErrorDialog} from './login.component';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {LoadingSpinnerModule} from '../../../modules/loading-spinner/loading-spinner.module';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    LoginComponent,
    LoginErrorDialog
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatDividerModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
    LoadingSpinnerModule,
    MatDialogModule,
  ]
})
export class LoginModule { }
