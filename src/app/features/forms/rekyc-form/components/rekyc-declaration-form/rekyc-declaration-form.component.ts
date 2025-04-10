import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

type Screens = 'directors' | 'bo';

interface ScreenHeader {
  label: string;
  value: string;
}

interface Director {
  name: string;
  din: string;
}

@Component({
  selector: 'rekyc-declaration-form',
  templateUrl: './rekyc-declaration-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RekycDeclarationFormComponent {
  currentScreen = signal<Screens>('directors');
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
  directorsList: Director[] = [
    {
      name: 'Abishek Yadav',
      din: '43928237',
    },
    {
      name: 'Narayana Kumar',
      din: '32379523',
    },
    {
      name: 'Chittesh Sarav',
      din: '642749',
    },
  ];
  isDirDetChanged = signal(false);
  form32 = {
    name: null,
    link: null,
  };
  isForm32ModalOpen = signal(false);
  selectedDirDin: string | null = null;
  addBtnClicked = false;

  trackScreenHeader(_index: number, screen: ScreenHeader) {
    return screen.value;
  }

  trackDir(_index: number, dir: Director) {
    return dir.din;
  }

  get actionBtnLabel() {
    if (this.currentScreen() === 'directors') {
      return 'Next';
    } else {
      return 'Submit';
    }
  }

  get isFormValid() {
    if (this.currentScreen() === 'directors') {
      return true;
    }

    const isForm32Uploaded = this.form32.name !== null && this.form32.link !== null;

    let isDirFilled = false;
    const isBOFilled = false;

    if (this.isDirDetChanged()) {
      if (isForm32Uploaded) {
        isDirFilled = true;
      }

      isDirFilled = false;
    } else {
      isDirFilled = true;
    }

    return isDirFilled && isBOFilled;
  }

  handleAddBtn() {
    // eslint-disable-next-line no-console
    console.log('enter click add', this.currentScreen);
    if (this.currentScreen() === 'directors') {
      this.handleForm32Modal();
    } else {
      this.addBtnClicked = true;
    }
  }

  handleForm32Modal() {
    const status = this.isForm32ModalOpen();
    this.isForm32ModalOpen.set(!status);
  }

  tryDeleteDir(din: string) {
    this.selectedDirDin = din;
    this.handleForm32Modal();
  }

  removeDirector() {
    if (this.selectedDirDin) {
      this.directorsList = this.directorsList.filter((e) => e.din !== this.selectedDirDin);
      this.isDirDetChanged.set(true);
      this.handleForm32Modal();
    }
  }

  addDirector() {
    this.isDirDetChanged.set(true);
    this.handleForm32Modal();
  }

  decideDirChange(action: 'continue' | 'cancel') {
    if (action === 'cancel') {
      this.selectedDirDin = null;
      this.handleForm32Modal();
    } else {
      if (this.addBtnClicked) {
        this.addDirector();
      } else {
        this.removeDirector();
      }
    }
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
