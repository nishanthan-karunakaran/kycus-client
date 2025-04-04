export const API_URL = {
  AUTH: {
    SEND_EMAIL_OTP: '/auth/kycus/sendEmailOtp',
    VALIDATE_EMAIL_OTP: '/auth/kycus/validateEmail',
    SIGNUP: '/auth/kycus/signup',
    REQUEST_LOGIN_OTP: '/auth/kycus/requestLoginOtp',
    LOGIN: '/auth/kycus/login',
  },
  REKYC: {
    UPLOAD_EXCEL: '/kycus/rekyc/upload',
    SUBMIT_EXCEL: '/kycus/rekyc/upload',
  },
  APPLICATION: {
    REKYC: {
      AUTH: {
        REQUEST_OTP: '/kycus/rekyc/auth/request-otp',
        VERIFY_OTP: '/kycus/rekyc/auth/verify-otp',
      },
      APPLICATIONS: '/kycus/rekyc/applications',
    },
  },
};
