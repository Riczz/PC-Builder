import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {LoginForm} from '../../../shared/interfaces/LoginForm';
import {AuthService} from '../../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  loginForm = this.createForm({
    email: '',
    password: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
  }

  submitForm() {
    this.loginForm.markAllAsTouched();

    if (this.loginForm.valid) {
      this.authService.login(
        this.loginForm.get('email')?.value,
        this.loginForm.get('password')?.value)
        .then(() => this.router.navigateByUrl('/'))
        .catch(console.error);
    }
  }

  private createForm(form: LoginForm) {
    const formGroup = this.formBuilder.group(form);
    formGroup.get('email')?.addValidators([Validators.required]);
    formGroup.get('password')?.addValidators([Validators.required]);
    return formGroup;
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
