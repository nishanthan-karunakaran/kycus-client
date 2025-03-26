import { Component, DoCheck } from '@angular/core';

interface User {
  id: number;
  age: number;
  name: string;
}

@Component({
  selector: 'app-rekyc',
  templateUrl: './rekyc.component.html',
  styleUrls: ['./rekyc.component.scss'],
})
export class RekycComponent implements DoCheck {
  render = 0;
  user = [
    {
      id: 1,
      age: 1,
      name: 'AAAAA',
    },
    {
      id: 2,
      age: 2,
      name: 'BBBBB',
    },
    {
      id: 3,
      age: 3,
      name: 'CCCCC',
    },
  ];
  columns = [
    {
      key: 'id',
      label: 'ID',
    },
    {
      key: 'name',
      label: 'Name',
    },
    {
      key: 'age',
      label: 'Age',
    },
  ];

  ngDoCheck(): void {
    this.render++;
    // eslint-disable-next-line no-console
    console.log('this.render => ', this.render);
  }

  onRowSelected(row: User) {
    // eslint-disable-next-line no-console
    console.log('Selected Row:', row);
  }
}
