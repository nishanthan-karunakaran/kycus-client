import {
  Component,
  ElementRef,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiStatus } from 'src/app/core/constants/api.response';
import { HelperService } from 'src/app/core/services/helpers.service';
import { ValidatorsService } from 'src/app/core/services/validators.service';
import { AuthStep } from 'src/app/features/auth/auth.model';
import { AuthService } from 'src/app/features/auth/auth.service';
import { ToastService } from 'src/app/shared/ui/toast/toast.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  isSubmitted = false;
  isLoading = false;
  loginState = signal<AuthStep>({
    otpSent: false,
    otpVerified: false,
  });
  loginForm!: FormGroup;
  @ViewChild('otpInput') otpInput!: ElementRef<HTMLInputElement>;

  constructor(
    private fb: FormBuilder,
    private helperService: HelperService,
    private validatorsService: ValidatorsService,
    private authService: AuthService,
    private toast: ToastService,
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        '',
        [Validators.required, this.validatorsService.emailValidator()],
      ],
      otp: [''],
    });
  }

  getFormError(field: string): string | null {
    const control = this.loginForm.get(field);
    if (!control || (!this.isSubmitted && !control.touched)) return null;

    if (control.hasError('required')) {
      return field !== 'otp'
        ? this.helperService.toTitleCase(field) + ' is required'
        : field.toUpperCase() + ' is required';
    }

    if (control.hasError('email')) return 'Invalid email format';

    if (control.hasError('minlength')) {
      const minLength = control.errors?.['minlength']?.requiredLength;
      return `${field} must be at least ${minLength} characters`;
    }

    return null;
  }

  private updateOTPValidators() {
    this.loginForm
      .get('otp')
      ?.setValidators([Validators.required, Validators.minLength(6)]);
    this.loginForm.get('otp')?.updateValueAndValidity();
  }

  sendOTP() {
    this.authService.signin({ email: this.loginForm.value.email }).subscribe({
      next: (result) => {
        console.log('On Next =>', result);

        const { loading, response } = result;
        this.isLoading = loading;

        if (!response) return;

        const { status } = response;

        if (status === ApiStatus.SUCCESS) {
          this.loginState.mutate((state) => (state.otpSent = true));
          this.toast.success('OTP sent successfully!');

          this.isSubmitted = false;
          this.updateOTPValidators();
        } else {
          this.toast.error(response.message || 'Something went wrong!');
        }
      },
      complete: () => {
        console.log('Request completed');
      },
    });
  }

  submitOTP() {
    /* i call the service later */
  }

  submitLoginForm() {
    this.isSubmitted = true;

    console.log(this.loginForm.value);

    if (this.loginForm.invalid) return; // Stop execution if form is invalid

    if (this.loginState().otpSent) {
      this.submitOTP();
    } else {
      this.sendOTP();
    }
  }
}
