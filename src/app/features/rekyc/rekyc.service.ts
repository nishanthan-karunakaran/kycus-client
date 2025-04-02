import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/core/constants/apiurls';
import { ApiService } from 'src/app/core/services/api.service';
import { SubmitReKycExcel, UploadReKycExcel } from './rekyc.model';

@Injectable({
  providedIn: 'root',
})
export class RekycService {
  constructor(private api: ApiService) {}

  uploadExcel(data: UploadReKycExcel) {
    return this.api.post(API_URL.REKYC.UPLOAD_EXCEL, data);
  }

  submitExcel(data: SubmitReKycExcel) {
    return this.api.post(API_URL.REKYC.SUBMIT_EXCEL, data);
  }
}
