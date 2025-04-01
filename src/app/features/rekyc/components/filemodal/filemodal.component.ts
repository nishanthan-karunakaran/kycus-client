import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HelperService } from 'src/app/core/services/helpers.service';
import { RekycService } from 'src/app/features/rekyc/rekyc.service';
import { ToastService } from 'src/app/shared/ui/toast/toast.service';

interface ParsedData {
  id: number;
  companyName: string;
  requestedOn: string;
  status: string;
}

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
  parsedData: ParsedData[] = [];
  activePage = 1;

  private readonly ROWS_PER_PAGE = 10;

  constructor(
    private toastService: ToastService,
    private rekycService: RekycService,
    private helperService: HelperService,
  ) {}

  handleModal() {
    this.closeModal.emit(false);
  }

  handlePreviewModal() {
    this.isOpenFilePreview = false;
    this.closeModal.emit(false);
  }

  handleFile(event: Event) {
    this.file = (event.target as HTMLInputElement)?.files?.[0] ?? null;

    if (this.file) {
      if (
        this.file.type ===
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
      ) {
        if (this.file.size >= 20 * 1024 * 1024) {
          this.toastService.error('File size must be less than 20MB');
          return;
        }

        this.isOpenFilePreview = true;
        this.fileUpload();
      } else {
        this.toastService.error('Please select a valid Excel file.');
      }
    } else {
      this.toastService.error('Please select a valid Excel file.');
    }
  }

  fileUpload() {
    const formData = new FormData();
    formData.append('file', this.file as Blob);
    formData.append('mode', 'preview');
    this.rekycService.uploadExcel(formData).subscribe({
      next: (result) => {
        const { loading, response } = result;
        this.isDataFetching = loading;

        if (!response) return;

        // const { status } = response;

        // if (status === ApiStatus.SUCCESS) {
        const { data } = response;
        this.parsedData = [];

        (data as ParsedData[]).forEach((item) => {
          const formattedItem: Record<string, string | number | boolean> = {};

          Object.entries(item).forEach(([key, value]) => {
            const camelCaseKey = this.helperService.toCamelCase(key);
            formattedItem[camelCaseKey] = value;
          });

          formattedItem['id'] = this.parsedData.length + 1;
          formattedItem['status'] = 'In Progress';
          formattedItem['requestedOn'] = new Date().toLocaleDateString();
          this.parsedData.push(formattedItem as unknown as ParsedData);
        });

        // eslint-disable-next-line no-console
        console.log('parsedData', this.parsedData);

        // }
      },
    });
  }

  get filteredData(): ParsedData[] {
    return this.parsedData.slice(
      this.activePage * this.ROWS_PER_PAGE - this.ROWS_PER_PAGE,
      this.activePage * this.ROWS_PER_PAGE,
    );
  }

  setActivePage(page: number): void {
    this.activePage = page;
  }

  trackRow(_: number, parsedData: ParsedData): number {
    return parsedData.id;
  }
}
