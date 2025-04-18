import { Injectable } from '@angular/core';
import { API_URL } from '@core/constants/apiurls';
import { ApiService } from '@core/services/api.service';
import { UploadFileProof } from '@features/forms/rekyc-form/rekyc-form.model';

@Injectable({
  providedIn: 'root',
})
export class RekycPersonalFormService {
  constructor(private api: ApiService) {}

  uploadProofDocument(data: UploadFileProof) {
    return this.api.post(API_URL.APPLICATION.REKYC.PERSONAL_FORM.PERSONAL_DOCS_UPLOAD, data);
  }
}
