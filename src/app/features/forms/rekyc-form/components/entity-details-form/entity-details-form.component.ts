import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Store } from '@ngrx/store';

type Screens = 'entity-details' | 'directors' | 'bo';

interface ScreenHeader {
  label: string;
  value: string;
}

@Component({
  selector: 'rekyc-entity-details-form',
  templateUrl: './entity-details-form.component.html',
  styleUrls: ['./entity-details-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RekycEntityDetailsFormComponent {
  currentScreen = signal<Screens>('entity-details');
  screenHeaders: ScreenHeader[] = [
    {
      label: 'Entity Details',
      value: 'entity-details',
    },
    {
      label: 'List of Directors',
      value: 'directors',
    },
    {
      label: 'Beneficiary Owners',
      value: 'bo',
    },
  ];

  constructor(private store: Store) {}

  trackScreenHeader(_index: number, screen: ScreenHeader) {
    return screen.value;
  }

  setCurrentScreen(value: string) {
    this.currentScreen.set(value as Screens);
  }

  submit(value: string) {
    // eslint-disable-next-line no-console
    console.log(value);
  }
}
