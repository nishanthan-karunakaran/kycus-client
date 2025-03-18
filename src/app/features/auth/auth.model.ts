export interface SigninState {
  otpSent: boolean;
  otpVerified: boolean;
}

export interface Signin {
  email: string;
  otp: string;
}

export interface SigninEmailValidation {
  email: string;
}
