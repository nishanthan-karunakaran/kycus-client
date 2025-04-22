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
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiStatus } from '@core/constants/api.response';
import { RekycDeclarationService } from '@features/forms/rekyc-form/components/rekyc-declaration-form/rekyc-declaration.service';
import { selectAusInfo } from '@features/forms/rekyc-form/components/rekyc-personal-details/store/personal-details.selectors';
import { SaveDirectorsDraft } from '@features/forms/rekyc-form/rekyc-form.model';
import { Store } from '@ngrx/store';
import { ToastService } from '@src/app/shared/ui/toast/toast.service';
import { updatePartialDirectors } from './store/declaration-directors.actions';
import {
  selectDeclarationDirectors,
  selectDeclarationIsDirectorsModified,
} from './store/declaration-directors.selectors';
import { Director } from './store/declaration-directors.state';

@Component({
  selector: 'rekyc-directors-form',
  templateUrl: './rekyc-directors-form.component.html',
})
export class RekycDirectorsFormComponent implements OnInit, OnChanges {
  @Input() addBtnClicked = false;
  @Output() formNavigation = new EventEmitter<boolean>();
  @Output() updateAddBtnClicked = new EventEmitter<void>();
  directorsList = signal<Director[]>([
    {
      directorName: 'Abishek Yadav',
      din: '43928237',
    },
    {
      directorName: 'Narayana Kumar',
      din: '32379523',
    },
    {
      directorName: 'Chittesh Sarav',
      din: '642749',
    },
  ]);
  form32 = {
    name: '',
    link: '',
  };
  isForm32ModalOpen = signal(false);
  selectedDirDin: string | null = null;
  isLoading = signal(false);
  readonly ausInfo = toSignal(this.store.select(selectAusInfo));
  readonly directors$ = toSignal(this.store.select(selectDeclarationDirectors));
  readonly isDirectorModified$ = toSignal(this.store.select(selectDeclarationIsDirectorsModified));

  constructor(
    private declarationService: RekycDeclarationService,
    private toast: ToastService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.fetchDirectors();
    // eslint-disable-next-line no-console
    console.log('directors', this.directors$());
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

    if (this.isDirectorModified$()) {
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
      this.directorsList.set(this.directorsList().filter((e) => e.din !== this.selectedDirDin));
      this.store.dispatch(updatePartialDirectors({ isDirectorModified: true }));
    }
  }

  addDirector() {
    this.store.dispatch(updatePartialDirectors({ isDirectorModified: true }));
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
      ausId: this.ausInfo()?.ausId as string,
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
          this.store.dispatch(updatePartialDirectors({ directorList: this.directorsList() }));
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
      ausId: this.ausInfo()?.ausId as string,
      flag: 'preview',
    };

    this.declarationService.getDirectorsList(payload).subscribe({
      next: (result) => {
        const { response } = result;

        if (!response) return;

        const { status } = response;

        if (status === ApiStatus.SUCCESS) {
          const { data } = response as { data: Director[] };
          const updatedDir = [...this.directorsList(), ...data];
          this.directorsList.set(updatedDir);
          this.store.dispatch(
            updatePartialDirectors({
              directorList: [...this.directorsList(), ...data],
            }),
          );
        }
      },
    });
  }
}
