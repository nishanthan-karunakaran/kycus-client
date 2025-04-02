import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ApiStatus } from 'src/app/core/constants/api.response';
import { RekycData, SubmitReKycExcel, UploadReKycExcel } from 'src/app/features/rekyc/rekyc.model';
import { RekycService } from 'src/app/features/rekyc/rekyc.service';
import { ToastService } from 'src/app/shared/ui/toast/toast.service';

@Component({
  selector: 'app-filemodal',
  templateUrl: './filemodal.component.html',
  styleUrls: ['./filemodal.component.scss'],
})
export class FilemodalComponent {
  @Input() isModalOpen = false;
  @Output() closeModal = new EventEmitter<boolean>();

  file: File | null = null;
  isOpenFilePreview = false;
  isDataFetching = false;
  isDataSubmitting = false;
  rekycData: RekycData[] = [];
  duplicateRekycData: RekycData[] = [];
  activePage = 1;
  isDragging = false;

  constructor(
    private toastService: ToastService,
    private rekycService: RekycService,
  ) {}

  handleModal() {
    this.closeModal.emit(false);
  }

  handlePreviewModal() {
    this.isOpenFilePreview = false;
    this.closeModal.emit(false);
  }

  handleFile(event: Event | DragEvent) {
    if (event instanceof Event && (event.target as HTMLInputElement)?.files) {
      this.file = (event.target as HTMLInputElement).files?.[0] ?? null;
    } else if (event instanceof DragEvent && event.dataTransfer) {
      this.file = event.dataTransfer.files?.[0] ?? null;
    }

    if (this.file) {
      if (this.file.type === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
        if (this.file.size >= 20 * 1024 * 1024) {
          this.toastService.error('File size must be less than 20MB');
          return;
        }

        this.fileUpload();
      } else {
        this.toastService.error('Please select a valid Excel file.');
      }
    } else {
      this.toastService.error('Please select a valid Excel file.');
    }
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.isDragging = true;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.isDragging = false;
    this.handleFile(event);
  }

  onDragLeave() {
    this.isDragging = false;
  }

  fileUpload() {
    const formData = new FormData();
    formData.append('file', this.file as Blob);
    formData.append('mode', 'preview');

    this.isOpenFilePreview = true;

    this.rekycService.uploadExcel(formData as unknown as UploadReKycExcel).subscribe({
      next: (result) => {
        const { loading, response } = result;
        this.isDataFetching = loading;

        if (!response) return;

        const { status } = response;

        if (status === ApiStatus.SUCCESS) {
          const { data } = response;
          const { uniqueRows, duplicateRows } = data as {
            uniqueRows: RekycData[];
            duplicateRows: RekycData[];
          };
          this.rekycData = uniqueRows as RekycData[];
          this.duplicateRekycData = duplicateRows as RekycData[];

          if (duplicateRows.length > 0) {
            this.toastService.warning('Duplicate data found');
          }
        } else {
          this.handlePreviewModal();
          this.toastService.error('Failed to parse the data');
        }
      },
    });
  }

  submitReKycExcel() {
    const payload: SubmitReKycExcel = {
      mode: 'submit',
      uploadedBy: 'admin@hdfc.com',
      bankName: 'HDFC Bank',
      data: this.rekycData,
    };

    this.rekycService.submitExcel(payload).subscribe({
      next: (result) => {
        const { loading, response } = result;
        this.isDataSubmitting = loading;

        if (!response) return;

        const { status } = response;

        if (status === ApiStatus.SUCCESS) {
          this.toastService.success('Data submitted successfully');
          this.handlePreviewModal();
        } else {
          this.toastService.error('Failed to submit the data');
        }
      },
    });
  }

  get filteredData(): RekycData[] {
    return [
      ...this.rekycData.map((e) => ({ ...e, isDuplicate: false })),
      ...this.duplicateRekycData.map((e) => ({ ...e, isDuplicate: true })),
    ];
  }

  setActivePage(page: number): void {
    this.activePage = page;
  }

  trackRow(_: number, rekycDataRekycData: RekycData): number {
    return rekycDataRekycData.id;
  }

  trackAus(index: number): number {
    return index;
  }
}
