import { Injectable } from '@angular/core';
import { API_URL } from '@core/constants/apiurls';
import { ApiService } from '@core/services/api.service';

export interface EntityFilledBy {
  ausId: string;
  email?: string;
}

@Injectable({
  providedIn: 'root',
})
export class RekycEntityFilledbyService {
  constructor(private api: ApiService) {}

  updateEntityFilledBy(data: EntityFilledBy) {
    return this.api.post(API_URL.APPLICATION.REKYC.ENTITY_INFO.ENTITY_FILLED_BY, data);
  }
}
