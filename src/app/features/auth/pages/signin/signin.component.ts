import {
  Component,
  ElementRef,
  inject,
  OnInit,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { HelperService } from 'src/app/core/services/helpers.service';
import { ValidatorsService } from 'src/app/core/services/validators.service';
import { SigninState } from 'src/app/features/auth/auth.model';
import { ToastService } from 'src/app/shared/ui/toast/toast.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  fb = inject(FormBuilder);
  helperService = inject(HelperService);
  validatorsService = inject(ValidatorsService);
  toast = inject(ToastService);
  renderer = inject(Renderer2);

  isSubmitted = false;
  isLoading = false;
  loginState = signal<SigninState>({
    otpSent: false,
    otpVerified: false,
  });
  loginForm = this.fb.group({
    email: ['', [Validators.required, this.validatorsService.emailValidator()]],
    otp: [''],
  });
  @ViewChild('otpInput') otpInput!: ElementRef<HTMLInputElement>;

  ngOnInit(): void {}

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

  sendOTP() {
    this.loginState.mutate((state) => {
      state.otpSent = true;
    });

    this.isSubmitted = false;
    setTimeout(() => {
      this.renderer.selectRootElement(this.otpInput.nativeElement).focus();
    }, 0);
    this.loginForm
      .get('otp')
      ?.setValidators([Validators.required, Validators.minLength(6)]);
    this.loginForm.get('otp')?.updateValueAndValidity();
  }

  submitOTP() {}

  submitLoginForm() {
    this.isSubmitted = true;

    if (this.loginForm.invalid) return; // Stop execution if form is invalid

    if (this.loginState().otpSent) {
      this.submitOTP();
    } else {
      this.sendOTP();
    }

    // this.isLoading = true;
    // setTimeout(() => {
    //   this.isLoading = false;
    // }, 3000);
  }
}
