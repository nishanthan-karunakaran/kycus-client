export enum FormStep {
  ENTITY_DETAILS = 'entityDetails',
  DECLARATION = 'declaration',
  PERSONAL_DETAILS = 'personalDetails',
  KYC_FORM = 'kycForm',
  E_SIGN = 'eSign',
}

export interface FormPage {
  label: string;
  step: FormStep;
  isCompleted: boolean;
  canShow: boolean;
}
