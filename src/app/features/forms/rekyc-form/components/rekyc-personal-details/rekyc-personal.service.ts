import { Injectable } from '@angular/core';
import { API_URL } from '@core/constants/apiurls';
import { ApiService } from '@core/services/api.service';
import { UploadFileProof } from '@features/forms/rekyc-form/rekyc-form.model';

export interface AusEsignPreviewDoc {
  fileName: string;
  url: string;
}

export type ESignStatus = 'Not Initiated' | 'Initiated' | 'Awaiting Signing' | 'Signed';

export interface AusESignPreviewData {
  name: string;
  fatherName: string;
  proofOfIdentity: AusEsignPreviewDoc;
  proofOfAddress: AusEsignPreviewDoc;
  line1: string;
  line2: string;
  city: string;
  state: string;
  country: string;
  pinCode: string;
  photographUrl: string;
  signatureUrl: string;
  esignStatus: ESignStatus;
  redirectUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class RekycPersonalFormService {
  constructor(private api: ApiService) {}

  uploadProofDocument(data: UploadFileProof) {
    return this.api.post(API_URL.APPLICATION.REKYC.PERSONAL_FORM.PERSONAL_DOCS_UPLOAD, data);
  }

  getPersonalDetails(entityId: string, ausId: string) {
    return this.api.get(API_URL.APPLICATION.REKYC.PERSONAL_FORM.PERSONAL_DETAILS(entityId, ausId));
  }

  previewAusDetails(entityId: string, ausId: string) {
    return this.api.get(API_URL.APPLICATION.REKYC.PERSONAL_FORM.PREVIEW_DETAILS(entityId, ausId));
  }

  esignAusPreview(entityId: string, ausId: string) {
    return this.api.get(API_URL.APPLICATION.REKYC.PERSONAL_FORM.ESIGN_PREVIEW(entityId, ausId));
  }

  esignAusPreviewSave(data: { entityId: string; ausId: string; data: AusESignPreviewData }) {
    return this.api.post(API_URL.APPLICATION.REKYC.PERSONAL_FORM.ESIGN_PREVIEW_SAVE, data);
  }

  proceedToESign(data: { type: 'aadhaar' | 'dsc'; ausId: string }) {
    return this.api.post(API_URL.APPLICATION.REKYC.PERSONAL_FORM.PROCEED_TO_ESIGN, data);
  }
}
