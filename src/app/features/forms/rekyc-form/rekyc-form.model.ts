export enum FormStep {
  ENTITY_DETAILS,
  DECLARATION,
  PERSONAL_DETAILS,
  KYC_FORM,
  E_SIGN,
}

// export enum FormStep {
//   ENTITY_DETAILS = 'entityDetails',
//   DECLARATION = 'declaration',
//   PERSONAL_DETAILS = 'personalDetails',
//   KYC_FORM = 'kycForm',
//   E_SIGN = 'eSign',
// }

export interface VerifyOtpResponse {
  ausId: string;
  ausName: string;
  ausType: 'aus' | 'others';
  filledBy: string | null;
}

export interface EntityInfo {
  entityId: string;
  entityName: string;
  filledBy: string | null;
}

export interface AusInfo {
  ausId: string;
  ausName: string;
  ausType: 'aus' | 'others';
}

export interface FormPage {
  label: string;
  step: FormStep;
  isCompleted: boolean;
  canShow: boolean;
}

export interface UploadFileProof {
  file: Blob;
  docType: string;
  entityId?: string;
  ausId?: string;
}

export interface UploadFileProofResponse {
  docName?: string;
  storedPath?: string;
}

export interface Director {
  name: string;
  din: string;
}

export interface SaveDirectorsDraft {
  form32: File;
  data: {
    ausId: string;
    directorsList: Director[];
  };
}

export interface BoDetail {
  name: string;
  addressLine: string;
  city: string;
  state: string;
  country: string;
  pincode: string;
}

export interface SaveBODetails {
  ausId: string;
  boList: BoDetail[];
}
