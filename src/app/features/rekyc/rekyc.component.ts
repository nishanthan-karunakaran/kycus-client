import { Component, DoCheck } from '@angular/core';

interface User {
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
  users: User[] = [
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
  selectedReKycEntity: User | null = null;

  private readonly ROWS_PER_PAGE = 10;

  ngDoCheck(): void {
    // eslint-disable-next-line no-console
    console.log('rendeing');
  }

  handleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  handleReKycSheet(data: User | null = null) {
    setTimeout(
      () => {
        this.selectedReKycEntity = data;
      },
      data === null ? 300 : 0,
    );
  }

  get filteredUsers(): User[] {
    const query = this.searchInput as string;
    const start = this.activePage * this.ROWS_PER_PAGE - this.ROWS_PER_PAGE;
    const end = this.activePage * this.ROWS_PER_PAGE;

    return this.users.slice(start, end).filter((user) => user.company.toLowerCase().includes(query));
  }

  onSearchInputChange(event: string | number | boolean): void {
    this.searchInput = event;
  }

  setActivePage(page: number): void {
    this.activePage = page;
  }

  onRowSelected(row: User) {
    // eslint-disable-next-line no-console
    console.log('Selected Row:', row);
  }

  trackByKey(_: number, key: string): string {
    return key;
  }

  trackRow(_: number, user: User): number {
    return user.id;
  }
}
