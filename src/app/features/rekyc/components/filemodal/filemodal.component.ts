import { Component, EventEmitter, Input, Output } from '@angular/core';
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

  constructor(private toastService: ToastService) {}

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

        // eslint-disable-next-line no-console
        console.log(this.file);
        this.isOpenFilePreview = true;
        this.isDataFetching = true;
        setTimeout(() => {
          this.isDataFetching = false;
        }, 3000);
      } else {
        this.toastService.error('Please select a valid Excel file.');
      }
      // const reader = new FileReader();
      // reader.onload = () => {
      //   const fileContents = reader.result as string;
      //   // eslint-disable-next-line no-console
      //   console.log(fileContents);
      // };
      // reader.readAsText(this.file);
    } else {
      this.toastService.error('Please select a valid Excel file.');
    }
  }
}
