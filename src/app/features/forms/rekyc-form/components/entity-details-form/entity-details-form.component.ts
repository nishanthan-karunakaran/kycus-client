import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RekycFormService } from '@features/forms/rekyc-form/rekyc-form.service';

type Screens = 'entity-details' | 'directors' | 'bo';

interface ScreenHeader {
  label: string;
  value: string;
}

@Component({
  selector: 'rekyc-entity-details-form',
  templateUrl: './entity-details-form.component.html',
  // styleUrls: ['./entity-details-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RekycEntityDetailsFormComponent {
  currentScreen = signal(
    this.rekycFormService.getRekycLS('currentEntityDetTab') || 'entity-details',
  );
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

  constructor(private rekycFormService: RekycFormService) {}

  trackScreenHeader(_index: number, screen: ScreenHeader) {
    return screen.value;
  }

  setCurrentScreen(value: string) {
    this.currentScreen.set(value as Screens);
    this.rekycFormService.updateRekycLS('currentEntityDetTab', value);
  }

  submit(value: string) {
    // eslint-disable-next-line no-console
    console.log(value);
  }
}
