export interface Aus {
  name: string;
  email: string;
}

export interface RekycData {
  id: number;
  companyName: string;
  companyType: string;
  custId: string;
  cinNumber: string;
  panNumber: string;
  ausDetails: Aus[];
  isDuplicate: boolean; // for ui only
}

export interface UploadReKycExcel {
  file: Blob;
  mode: 'preview';
}

export interface SubmitReKycExcel {
  mode: 'submit';
  uploadedBy: string;
  bankName: string;
  data: RekycData[];
}
