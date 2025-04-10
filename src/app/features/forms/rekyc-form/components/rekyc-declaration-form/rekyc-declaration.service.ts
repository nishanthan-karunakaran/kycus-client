import { Injectable } from '@angular/core';
import { API_URL } from '@core/constants/apiurls';
import { ApiService } from '@core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class RekycDeclarationService {
  constructor(private api: ApiService) {}

  getDirectorsList(payload: { ausId: string; flag: string }) {
    return this.api.post(`${API_URL.APPLICATION.REKYC.DECLARATION_FORM.DIRECTORS}`, payload);
  }
}
