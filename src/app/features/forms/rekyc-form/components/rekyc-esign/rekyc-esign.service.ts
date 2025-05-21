import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from '@core/constants/apiurls';
import { ApiService } from '@core/services/api.service';

export interface EntityESignSignatoryList {
  id: string;
  name: string;
  emailId: string;
}

export interface ProceedEntityESign {
  type: 'aadhaar' | 'dsc';
  entityId: string;
  esignDetails: EntityESignSignatoryList[];
}

@Injectable({
  providedIn: 'root',
})
export class RekycEsignService {
  constructor(
    private api: ApiService,
    private http: HttpClient,
  ) {}

  proceedToESign(data: ProceedEntityESign) {
    return this.api.post(API_URL.APPLICATION.REKYC.ENTITY_ESIGN.PROCEED_TO_ESIGN, data);
  }

  entityESignParticipants(entityId: string) {
    return this.api.get(API_URL.APPLICATION.REKYC.ENTITY_ESIGN.ENTITY_ESIGN_PARTICIPANTS(entityId));
  }

  entityESignStatus(entityId: string) {
    return this.api.get(API_URL.APPLICATION.REKYC.ENTITY_ESIGN.ESIGN_STATUS(entityId));
  }

  entityESignPreviewDoc(entityId: string) {
    return this.http.get(API_URL.APPLICATION.REKYC.ENTITY_ESIGN.ESIGN_PREVIEW_DOC(entityId), {
      responseType: 'text',
      withCredentials: true,
    });
  }
}
