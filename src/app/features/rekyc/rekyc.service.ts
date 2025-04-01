import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/core/constants/apiurls';
import { ApiService } from 'src/app/core/services/api.service';

@Injectable({
  providedIn: 'root',
})
export class RekycService {
  constructor(private api: ApiService) {}

  uploadExcel(data: FormData) {
    return this.api.post(API_URL.KYC.UPLOAD, data);
  }
}
