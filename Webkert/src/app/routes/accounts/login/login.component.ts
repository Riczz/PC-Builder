import {Component, Inject} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {LoginForm} from '../../../shared/interfaces/LoginForm';
import {AuthService} from '../../../shared/services/auth.service';
import {Router} from '@angular/router';
import {MAT_DIALOG_DATA, MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loading = false;

  loginForm = this.createForm({
    email: '',
    password: '',
  });

  constructor(
    private dialog: MatDialog,
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
  }

  submitForm() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      this.loading = true;
      this.authService.login(
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value)
        .then(() => this.router.navigateByUrl('/'))
        .catch(reason => this.openDialog(reason))
        .finally(() => this.loading = false);
    }
  }

  private createForm(form: LoginForm) {
    const formGroup = this.formBuilder.group(form);
    formGroup.get('email')?.addValidators([Validators.required]);
    formGroup.get('password')?.addValidators([Validators.required]);
    return formGroup;
  }

  private openDialog(message: string) {
    this.dialog.open(LoginErrorDialog, {
      data: {
        message: message
      }
    });
  }

  getError(fieldName: string): string[] {
    const field = this.getField(fieldName) as any;
    const errors: string[] = [];

    if (field.hasError('required')) {
      errors.push('This field is required.');
    }
    return errors;
  }

  private getField(field: string): AbstractControl | null {
    return this.loginForm.get(field);
  }
}

export interface DialogData {
  message: string
}

@Component({
  selector: 'login-error-dialog',
  templateUrl: 'login-error-dialog.html'
})
export class LoginErrorDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }
}
