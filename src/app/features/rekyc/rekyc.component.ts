import { Component, DoCheck, OnInit } from '@angular/core';
import { HelperService } from 'src/app/core/services/helpers.service';

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
export class RekycComponent implements OnInit, DoCheck {
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
  columns: string[] = [];
  searchInput: string | number | boolean = '';
  activePage = 1;
  isModalOpen = false;

  private readonly ROWS_PER_PAGE = 10;

  constructor(private helperService: HelperService) {}

  ngDoCheck(): void {
    // eslint-disable-next-line no-console
    console.log('rendeing');
  }

  ngOnInit(): void {
    if (this.users.length > 0) {
      this.columns = Object.keys(this.users[0]).map((key) =>
        this.helperService.toTitleCase(key, 'camelCase'),
      );
    }
  }

  handleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  get filteredUsers(): User[] {
    const query = this.searchInput as string;
    return this.users
      .slice(
        this.activePage * this.ROWS_PER_PAGE - this.ROWS_PER_PAGE,
        this.activePage * this.ROWS_PER_PAGE,
      )
      .filter((user) => user.company.toLowerCase().includes(query));
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
