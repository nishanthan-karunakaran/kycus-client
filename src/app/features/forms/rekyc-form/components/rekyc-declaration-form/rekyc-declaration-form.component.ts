import { ChangeDetectionStrategy, Component, Input, signal } from '@angular/core';
import { AusInfo } from '@features/forms/rekyc-form/rekyc-form.model';

type Screens = 'directors' | 'bo';

interface ScreenHeader {
  label: string;
  value: string;
}

@Component({
  selector: 'rekyc-declaration-form',
  templateUrl: './rekyc-declaration-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RekycDeclarationFormComponent {
  @Input() ausInfo: AusInfo | null = null;
  currentScreen = signal<Screens>('bo');
  screenHeaders: ScreenHeader[] = [
    {
      label: 'Directors',
      value: 'directors',
    },
    {
      label: 'Beneficiary Owners',
      value: 'bo',
    },
  ];
  addBtnTrigger = false;

  trackScreenHeader(_index: number, screen: ScreenHeader) {
    return screen.value;
  }

  handleAddBtn() {
    this.addBtnTrigger = !this.addBtnTrigger;
  }

  setCurrentScreen(value: string) {
    this.currentScreen.set(value as Screens);
  }

  submit(value: string) {
    // eslint-disable-next-line no-console
    console.log(value);
  }

  tabNavigation() {
    if (this.currentScreen() === 'directors') {
      this.setCurrentScreen('bo');
    }
  }
}
