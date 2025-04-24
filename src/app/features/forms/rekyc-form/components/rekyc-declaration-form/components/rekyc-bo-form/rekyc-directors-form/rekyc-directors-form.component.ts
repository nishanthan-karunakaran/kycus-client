import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ApiStatus } from '@core/constants/api.response';
import { RekycDeclarationService } from '@features/forms/rekyc-form/components/rekyc-declaration-form/rekyc-declaration.service';
import { selectAusInfo } from '@features/forms/rekyc-form/components/rekyc-personal-details/store/personal-details.selectors';
import { SaveDirectorsDraft } from '@features/forms/rekyc-form/rekyc-form.model';
import { updateRekycStepStatus } from '@features/forms/rekyc-form/store/rekyc-form.action';
import { Store } from '@ngrx/store';
import { ToastService } from '@src/app/shared/ui/toast/toast.service';
import { removeDirector, updatePartialDirectors } from './store/declaration-directors.actions';
import { initialDirectorState } from './store/declaration-directors.reducers';
import {
  selectDeclarationIsDirectorsModified,
  selectReKycDirectors,
} from './store/declaration-directors.selectors';
import { Director, Doc } from './store/declaration-directors.state';
import { RekycFormService } from '@features/forms/rekyc-form/rekyc-form.service';

@Component({
  selector: 'rekyc-directors-form',
  templateUrl: './rekyc-directors-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RekycDirectorsFormComponent implements OnInit {
  @Output() formNavigation = new EventEmitter<boolean>();
  addBtnClicked = false;
  directorsList = toSignal(this.store.select(selectReKycDirectors), {
    initialValue: initialDirectorState.directorList,
  });
  form32: Doc = {
    name: '',
    link: '',
    file: null,
  };
  form32Error = signal('');
  isForm32ModalOpen = signal(false);
  selectedDirDin: string | null = null;
  isLoading = signal(false);
  readonly ausInfo = toSignal(this.store.select(selectAusInfo));
  readonly isDirectorModified$ = toSignal(this.store.select(selectDeclarationIsDirectorsModified));

  constructor(
    private declarationService: RekycDeclarationService,
    private rekycFormService: RekycFormService,
    private toast: ToastService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    this.fetchDirectors();
  }

  get activeDirectors() {
    return this.directorsList().filter((dir) => dir.status !== 'inactive');
  }

  trackDir(_index: number, dir: Director) {
    return dir.dirId;
  }

  trackDirInput(index: number) {
    return index;
  }

  onDirInputChange(
    dirId: string,
    type: 'directorName' | 'din',
    input: string | number | boolean,
  ): void {
    const value = input.toString();
    const updatedList = this.directorsList().map((dir) => {
      if (dir.dirId === dirId) {
        const obj = { ...dir, [type]: value };
        return obj;
      }
      return dir;
    });

    this.store.dispatch(updatePartialDirectors({ directorList: updatedList }));
  }

  onForm32Change(file: File) {
    if (!file) return;
    this.form32.name = file.name;
    this.form32.link = file.name;
    this.form32.file = file;
    this.form32Error.set('');

    // this.uploadFileProof(controlName, file);
  }

  isFormValid(): boolean {
    if (this.directorsList.length === 0) return false;

    if (this.isDirectorModified$()) {
      return this.form32.file !== null;
    }

    return true;
  }

  removeForm32() {
    this.form32.name = '';
    this.form32.link = '';
    this.form32.file = null;
  }

  handleForm32Modal() {
    const status = this.isForm32ModalOpen();
    this.isForm32ModalOpen.set(!status);
  }

  tryDeleteDir(din: string) {
    this.selectedDirDin = din;

    if (this.isDirectorModified$()) {
      this.deleteDirector();
    } else {
      this.handleForm32Modal();
    }
  }

  deleteDirector() {
    if (this.selectedDirDin) {
      this.store.dispatch(removeDirector({ dirId: this.selectedDirDin }));
      this.store.dispatch(updatePartialDirectors({ isDirectorModified: true }));
    }
  }

  addDirector() {
    // this.dirInputLength.set(this.dirInputLength() + 1);
    this.store.dispatch(updatePartialDirectors({ isDirectorModified: true }));
    const newDir: Director = {
      dirId: Date.now().toString(),
      directorName: '',
      din: '',
      status: 'new-dir',
    };
    const updatedDirList = [...this.directorsList(), newDir];
    this.store.dispatch(updatePartialDirectors({ directorList: updatedDirList }));
  }

  handleDirModification(type: 'delete' | 'add', din: string | null = null) {
    if (!this.isDirectorModified$()) {
      this.handleForm32Modal();
      this.selectedDirDin = din;
    } else {
      if (type === 'add') {
        this.addDirector();
      } else {
        if (din) {
          this.selectedDirDin = din;
          this.deleteDirector();
        }
      }
    }
  }

  cancelDirEdit() {
    this.store.dispatch(updatePartialDirectors({ isDirectorModified: false }));
    this.fetchDirectors();
  }

  decideDirChange(action: 'continue' | 'cancel') {
    this.handleForm32Modal();
    this.removeForm32();
    if (action === 'cancel') {
      this.selectedDirDin = null;
    } else {
      if (this.selectedDirDin !== null) {
        this.deleteDirector();
      } else {
        this.addDirector();
      }
    }
  }

  saveDraft() {
    const data = {
      ausId: this.ausInfo()?.ausId as string,
      directorsList: this.directorsList(),
    };
    const formData = new FormData();
    formData.append('form32', this.form32.file as Blob);
    formData.append('data', JSON.stringify(data));
    formData.append('flag', 'save');

    this.declarationService.saveDraft(formData as unknown as SaveDirectorsDraft).subscribe({
      next: (result) => {
        const { loading, response } = result;
        this.isLoading.set(loading);

        if (!response) return;

        const { status } = response;

        if (status === ApiStatus.SUCCESS) {
          this.toast.info('Directors details saved successfully!');
          this.store.dispatch(updatePartialDirectors({ directorList: this.directorsList() }));
        } else {
          this.toast.error(response.message || 'Something went wrong!');
        }
      },
    });
  }

  submit() {
    if (this.isDirectorModified$() && this.form32.file === null) {
      this.form32Error.set('Please upload Form 32');
      return;
    } else {
      this.form32Error.set('');
    }

    const existingDir = this.directorsList();
    const refinedDirList = existingDir.map((dir) => {
      if (dir.status === 'new-dir') {
        return { ...dir, status: 'active' };
      }
      return dir;
    });

    const data = {
      ausId: this.ausInfo()?.ausId as string,
      directorsList: refinedDirList,
    };
    const formData = new FormData();
    formData.append('form32', this.form32.file as Blob);
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
          this.store.dispatch(
            updatePartialDirectors({ directorList: refinedDirList, isDirectorModified: false }),
          );
          this.store.dispatch(updateRekycStepStatus({ directorDetails: true }));
          this.rekycFormService.updatRekycFormStep('directors');
        } else {
          this.toast.error(response.message || 'Something went wrong!');
        }
      },
    });
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
