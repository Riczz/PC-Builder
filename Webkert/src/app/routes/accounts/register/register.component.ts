import {Component} from '@angular/core';
import {AbstractControl, FormBuilder, Validators} from '@angular/forms';
import {RegisterForm} from '../../../shared/interfaces/RegisterForm';
import {emailPattern, passwordPattern} from '../../../shared/regex';
import {AuthService} from '../../../shared/services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  registerForm = this.createForm({
    username: '',
    email: '',
    password: '',
    passwordAgain: ''
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router) {
  }

  submitForm() {
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      this.authService.register(
        this.registerForm.get('username')?.value,
        this.registerForm.get('email')?.value,
        this.registerForm.get('password')?.value)
        .then(() => this.router.navigateByUrl('/accounts/login'))
        .catch(console.error);
    } else {
      // console.log('INVALID');
    }
  }

  private createForm(form: RegisterForm) {
    const formGroup = this.formBuilder.group(form);
    formGroup.get('username')?.addValidators([Validators.minLength(6), Validators.maxLength(255), Validators.required]);
    formGroup.get('email')?.addValidators([Validators.email, Validators.pattern(emailPattern), Validators.required]);
    formGroup.get('password')?.addValidators([Validators.pattern(passwordPattern), Validators.maxLength(255), Validators.required]);
    formGroup.get('passwordAgain')?.addValidators([Validators.pattern(passwordPattern), Validators.maxLength(255), Validators.required]);
    return formGroup;
  }

  getError(fieldName: string): string[] {
    const field = this.getField(fieldName) as any;
    const errors: string[] = [];

    if (field.hasError('required')) {
      errors.push('This field is required.');
    }

    switch (fieldName) {
    case 'username': {
      if (field.hasError('minlength')) {
        errors.push(`Username too short. Minimum length: ${field.getError('minlength').requiredLength}`);
      } else if (field.hasError('maxlength')) {
        errors.push(`Too many characters for username. Maximum length: ${field.getError('maxlength').requiredLength}`);
      }
      break;
    }
    case 'email': {
      if (field.hasError('email') || field.hasError('pattern')) {
        errors.push('Not a valid e-mail.');
      }
      break;
    }
    case 'password': {
      if (field.hasError('pattern')) {
        errors.push('Invalid password. Must be at least 8 characters long and contain at least one number.');
      }

      if (field.hasError('maxlength')) {
        errors.push(`Too many characters for password. Maximum length: ${field.getError('maxlength').requiredLength}`);
      }
      break;
    }
      //TODO
    case 'passwordAgain': {
      if (field.hasError('maxlength')) {
        errors.push(`Too many characters for password. Maximum length: ${field.getError('maxlength').requiredLength}`);
      }

      if (this.getField('password')?.value !== field.value) {
        errors.push('Passwords don\'t match.');
      }
      break;
    }
    default: {
      break;
    }
    }

    // console.log('ERRORS: ' + errors);
    return errors;
  }

  private getField(field: string): AbstractControl | null {
    return this.registerForm.get(field);
  }
}
