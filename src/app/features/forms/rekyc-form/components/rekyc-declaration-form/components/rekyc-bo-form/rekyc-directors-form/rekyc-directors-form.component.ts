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
import { ApiStatus } from '@core/constants/api.response';
import { RekycDeclarationService } from '@features/forms/rekyc-form/components/rekyc-declaration-form/rekyc-declaration.service';
import { AusInfo, Director, SaveDirectorsDraft } from '@features/forms/rekyc-form/rekyc-form.model';
import { ToastService } from '@src/app/shared/ui/toast/toast.service';

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
    name: '',
    link: '',
  };
  isForm32ModalOpen = signal(false);
  selectedDirDin: string | null = null;
  isLoading = signal(false);

  constructor(
    private declarationService: RekycDeclarationService,
    private toast: ToastService,
  ) {}

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

  onForm32Change(file: File) {
    if (!file) return;
    // eslint-disable-next-line no-console
    console.log(file.name);
    this.form32.name = file.name;
    this.form32.link = file.name;

    // this.uploadFileProof(controlName, file);
  }

  isFormValid(): boolean {
    if (this.directorsList.length === 0) return false;

    if (this.isDirDetChanged()) {
      return this.form32.name.length > 0 && this.form32.link.length > 0;
    }

    return true;
  }

  removeForm32() {
    this.form32.name = '';
    this.form32.link = '';
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

  saveDraft() {
    const data = {
      ausId: 'ebitaus-CUS1234567-09042025-AUS3',
      directorsList: this.directorsList,
    };
    const formData = new FormData();
    formData.append('form32', this.form32.name);
    formData.append('data', JSON.stringify(data));
    formData.append('flag', 'save');

    this.declarationService.saveDraft(formData as unknown as SaveDirectorsDraft).subscribe({
      next: (result) => {
        const { loading, response } = result;
        this.isLoading.set(loading);

        if (!response) return;

        const { status } = response;

        if (status === ApiStatus.SUCCESS) {
          this.toast.success('Directors details saved successfully!');
        } else {
          this.toast.error(response.message || 'Something went wrong!');
        }
      },
    });
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
