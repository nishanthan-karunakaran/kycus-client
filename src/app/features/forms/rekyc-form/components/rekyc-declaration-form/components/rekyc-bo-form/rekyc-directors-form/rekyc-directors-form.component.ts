import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  signal,
  SimpleChanges,
} from '@angular/core';
import { RekycDeclarationService } from '@features/forms/rekyc-form/components/rekyc-declaration-form/rekyc-declaration.service';
import { AusInfo } from '@features/forms/rekyc-form/rekyc-form.model';

interface Director {
  name: string;
  din: string;
}

@Component({
  selector: 'rekyc-directors-form',
  templateUrl: './rekyc-directors-form.component.html',
})
export class RekycDirectorsFormComponent implements OnInit, OnChanges {
  @Input() ausInfo: AusInfo | null = null;
  @Input({ required: true }) addBtnClicked = false;
  @Output() formNavigation = new EventEmitter<boolean>();
  @Output() updateAddBtnClicked = new EventEmitter<void>();
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

  constructor(private declarationService: RekycDeclarationService) {}

  ngOnInit(): void {
    this.fetchDirectors();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['addBtnClicked']) {
      const current = changes['addBtnClicked'].currentValue;
      if (current) {
        this.handleForm32Modal();
      }
    }
  }

  trackDir(_index: number, dir: Director) {
    return dir.din;
  }

  isFormValid() {
    return true;
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
    }
  }

  addDirector() {
    this.isDirDetChanged.set(true);
  }

  decideDirChange(action: 'continue' | 'cancel') {
    this.handleForm32Modal();
    if (action === 'cancel') {
      this.selectedDirDin = null;
      this.updateAddBtnClicked.emit();
    } else {
      if (this.addBtnClicked) {
        this.updateAddBtnClicked.emit();
        this.addDirector();
      } else {
        this.removeDirector();
      }
    }
  }

  submit(value: string) {
    // eslint-disable-next-line no-console
    console.log(value);
  }

  tabNavigation() {
    this.formNavigation.emit(true);
  }

  fetchDirectors() {
    const payload = {
      ausId: this.ausInfo?.ausId || 'ebitaus-CUS1234567-09042025-AUS3',
      flag: 'preview',
    };

    this.declarationService.getDirectorsList(payload).subscribe();
  }
}
