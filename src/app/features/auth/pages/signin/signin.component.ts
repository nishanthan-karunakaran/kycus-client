import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HelperService } from 'src/app/core/services/helpers.service';
import { ToastService } from 'src/app/shared/ui/toast/toast.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  fb = inject(FormBuilder);
  helperService = inject(HelperService);
  toast = inject(ToastService);
  submitted = false;
  isLoading = false;
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    otp: ['', [Validators.required, Validators.minLength(6)]],
  });

  ngOnInit(): void {
    this.toast.success('Login to access your account');
  }

  getFormError(field: string): string | null {
    if (!this.submitted) return null;

    const control = this.loginForm.get(field);
    if (!control) return null;

    if (control.hasError('required'))
      return `${
        field !== 'otp'
          ? this.helperService.toTitleCase(field)
          : field.toUpperCase()
      } is required`;

    if (control.hasError('email')) return 'Invalid email format';

    if (control.hasError('minlength')) {
      const minLength = control.errors?.['minlength']?.requiredLength;
      return `${field} must be at least ${minLength} characters`;
    }

    return null;
  }

  submitLoginForm() {
    this.submitted = true;
    console.log('login form values', this.loginForm.value);

    if (this.loginForm.invalid) return;

    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
    }, 3000);
  }
}
