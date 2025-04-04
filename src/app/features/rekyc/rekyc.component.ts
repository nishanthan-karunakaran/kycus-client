import { Component, DoCheck } from '@angular/core';

interface Application {
  id: number;
  company: string;
  requestedOn: string;
  status: string;
}

@Component({
  selector: 'app-rekyc',
  templateUrl: './rekyc.component.html',
  styleUrls: ['./rekyc.component.scss'],
})
export class RekycComponent implements DoCheck {
  applications: Application[] = [
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
  searchInput: string | number | boolean = '';
  activePage = 1;
  isModalOpen = false;
  selectedReKycEntity: Application | null = null;

  private readonly ROWS_PER_PAGE = 10;

  ngDoCheck(): void {
    // eslint-disable-next-line no-console
    console.log('rendeing');
  }

  handleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  handleReKycSheet(data: Application | null = null) {
    setTimeout(
      () => {
        this.selectedReKycEntity = data;
      },
      data === null ? 300 : 0,
    );
  }

  get filteredApplications(): Application[] {
    const query = this.searchInput as string;
    const start = this.activePage * this.ROWS_PER_PAGE - this.ROWS_PER_PAGE;
    const end = this.activePage * this.ROWS_PER_PAGE;

    return this.applications
      .slice(start, end)
      .filter((application) => application.company.toLowerCase().includes(query));
  }

  onSearchInputChange(event: string | number | boolean): void {
    this.searchInput = event;
  }

  setActivePage(page: number): void {
    this.activePage = page;
  }

  onRowSelected(row: Application) {
    // eslint-disable-next-line no-console
    console.log('Selected Row:', row);
  }

  trackByKey(_: number, key: string): string {
    return key;
  }

  trackRow(_: number, application: Application): number {
    return application.id;
  }
}
