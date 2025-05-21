import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URL } from 'src/app/core/constants/apiurls';
import { ApiService } from 'src/app/core/services/api.service';
import { GetReKycApplicationsParams, SubmitReKycExcel, UploadReKycExcel } from './rekyc.model';
import { environment } from '@src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RekycService {
  constructor(
    private api: ApiService,
    private http: HttpClient,
  ) {}

  uploadExcel(data: UploadReKycExcel) {
    return this.api.post(API_URL.REKYC.UPLOAD_EXCEL, data);
  }

  submitExcel(data: SubmitReKycExcel) {
    return this.api.post(API_URL.REKYC.SUBMIT_EXCEL, data);
  }

  getReKycApplications(params?: GetReKycApplicationsParams) {
    let queryParams = new HttpParams();

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams = queryParams.set(key, value.toString());
        }
      });
    }

    return this.api.get(API_URL.APPLICATION.REKYC.APPLICATIONS, queryParams);
  }

  sendReminder(entityId: string) {
    return this.api.get(API_URL.REKYC.SEND_REMINDER(entityId));
  }

  viewReport(entityId: string) {
    window.open(
      `${environment.apiBaseUrl}${API_URL.APPLICATION.REKYC.REPORT.VIEW(entityId)}`,
      '_blank',
    );
  }

  downloadReport(entityId: string) {
    const url = `/kycus/rekyc/downloadFinalReport/${entityId}`;

    this.http
      .get<Blob>(url, {
        responseType: 'blob' as 'json',
      })
      .subscribe((blob: Blob) => {
        const link = document.createElement('a');
        const url = window.URL.createObjectURL(blob);
        link.href = url;
        link.download = `Final Re-KYC Report - ${entityId.split('-').pop()}.zip`;
        link.click();
        window.URL.revokeObjectURL(url);
      });
  }

  downloadSample() {
    return this.http.get(`http://3.109.141.220:3002${API_URL.REKYC.EXCEL_TEMPLATE}`);
  }

  generateReport(entityId: string) {
    return this.api.get(API_URL.APPLICATION.REKYC.REPORT.GENERATE_REPORT(entityId));
  }
}
