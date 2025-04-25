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
      APPLICATIONS: '/kycus/rekyc/applications',
      AUS_LIST: (ausId: string) => `/kycus/rekyc/ausListDropdown/${ausId}`,
      DELETE_DOCUMENT: '/kycus/rekyc/document/delete',
      TAB_COMPLETION_STATUS: (ausId: string) => `/kycus/rekyc/tabCompletionStatus?ausId=${ausId}`,
      AUTH: {
        REQUEST_OTP: '/kycus/rekyc/auth/request-otp',
        VERIFY_OTP: '/kycus/rekyc/auth/verify-otp',
      },
      ENTITY_INFO: {
        ENTITY_FILLED_BY: '/kycus/rekyc/entityInfo/entityFilledBy',
      },
      ENTITY_DETAILS_FORM: {
        ENTITY_DOCS_UPLOAD: '/kycus/rekyc/entityDocs/uploads',
        ENTITY_DETAILS: (entityId: string) => `/kycus/rekyc/entityDetails/${entityId}`,
        PREVIEW_DETAILS: (entityId: string) => `/kycus/rekyc/entityPreview/${entityId}`,
      },
      DECLARATION_FORM: {
        DIRECTORS: {
          DIRECTORS: '/kycus/rekyc/declaration/directors',
          SAVE_DRAFT: '/kycus/rekyc/declaration/directors',
        },
        BO: '/kycus/rekyc/declaration/beneficiaryOwner',
      },
      PERSONAL_FORM: {
        PERSONAL_DOCS_UPLOAD: '/kycus/rekyc/ausDocs/uploads',
        PERSONAL_DETAILS: (entityId: string, ausId: string) =>
          `/kycus/rekyc/ausDetails/${entityId}/${ausId}`,
        PREVIEW_DETAILS: (entityId: string, ausId: string) =>
          `/kycus/rekyc/ausPreview/${entityId}/${ausId}`,
      },
      REKYC_FORM: {
        GET: (entityId: string) => `/kycus/rekyc/rekycForm/${entityId}`,
        PUT: (entityId: string) => `/kycus/rekyc/rekycForm/${entityId}`,
      },
    },
  },
};
