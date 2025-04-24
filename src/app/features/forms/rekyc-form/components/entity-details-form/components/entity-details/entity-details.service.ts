import { Injectable } from '@angular/core';
import { API_URL } from '@core/constants/apiurls';
import { ApiService } from '@core/services/api.service';
import { UploadFileProof } from '@features/forms/rekyc-form/rekyc-form.model';

@Injectable({
  providedIn: 'root',
})
export class EntityDetailsService {
  constructor(private api: ApiService) {}

  uploadFileProof(data: UploadFileProof) {
    return this.api.post(API_URL.APPLICATION.REKYC.ENTITY_DETAILS_FORM.ENTITY_DOCS_UPLOAD, data);
  }

  getEntityDetails(entityId: string) {
    return this.api.get(API_URL.APPLICATION.REKYC.ENTITY_DETAILS_FORM.ENTITY_DETAILS(entityId));
  }
}
