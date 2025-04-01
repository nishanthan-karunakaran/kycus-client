import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToastService } from 'src/app/shared/ui/toast/toast.service';

interface ParsedData {
  id: number;
  company: string;
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
  parsedData: ParsedData[] = [
    {
      id: 1,
      company: 'Ebitaus',
      requestedOn: '01-01-2025, 11:00',
      status: 'Completed',
    },
    {
      id: 2,
      company: 'Tata Motors',
      requestedOn: '02-01-2025, 11:30',
      status: 'In Progress',
    },
    {
      id: 3,
      company: 'Arun Excello',
      requestedOn: '03-01-2025, 11:40',
      status: 'In Progress',
    },
    {
      id: 1,
      company: 'Ebitaus',
      requestedOn: '01-01-2025, 11:00',
      status: 'Completed',
    },
    {
      id: 2,
      company: 'Tata Motors',
      requestedOn: '02-01-2025, 11:30',
      status: 'In Progress',
    },
    {
      id: 3,
      company: 'Arun Excello',
      requestedOn: '03-01-2025, 11:40',
      status: 'In Progress',
    },
    {
      id: 1,
      company: 'Ebitaus',
      requestedOn: '01-01-2025, 11:00',
      status: 'Completed',
    },
    {
      id: 2,
      company: 'Tata Motors',
      requestedOn: '02-01-2025, 11:30',
      status: 'In Progress',
    },
    {
      id: 3,
      company: 'Arun Excello',
      requestedOn: '03-01-2025, 11:40',
      status: 'In Progress',
    },
    {
      id: 1,
      company: 'Ebitaus',
      requestedOn: '01-01-2025, 11:00',
      status: 'Completed',
    },
    {
      id: 2,
      company: 'Tata Motors',
      requestedOn: '02-01-2025, 11:30',
      status: 'In Progress',
    },
    {
      id: 3,
      company: 'Arun Excello',
      requestedOn: '03-01-2025, 11:40',
      status: 'In Progress',
    },
    {
      id: 1,
      company: 'Ebitaus',
      requestedOn: '01-01-2025, 11:00',
      status: 'Completed',
    },
    {
      id: 2,
      company: 'Tata Motors',
      requestedOn: '02-01-2025, 11:30',
      status: 'In Progress',
    },
    {
      id: 3,
      company: 'Arun Excello',
      requestedOn: '03-01-2025, 11:40',
      status: 'In Progress',
    },
    {
      id: 1,
      company: 'Ebitaus',
      requestedOn: '01-01-2025, 11:00',
      status: 'Completed',
    },
    {
      id: 2,
      company: 'Tata Motors',
      requestedOn: '02-01-2025, 11:30',
      status: 'In Progress',
    },
    {
      id: 3,
      company: 'Arun Excello',
      requestedOn: '03-01-2025, 11:40',
      status: 'In Progress',
    },
  ];
  activePage = 1;

  private readonly ROWS_PER_PAGE = 10;

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
