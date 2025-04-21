import {
  ChangeDetectionStrategy,
  Component,
  DoCheck,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiStatus } from '@core/constants/api.response';
import {
  EntityDetailsFileType,
  UploadFileProof,
  UploadFileProofResponse,
} from '@features/forms/rekyc-form/rekyc-form.model';
import { Store } from '@ngrx/store';
import { ToastService } from '@src/app/shared/ui/toast/toast.service';
import { HelperService } from 'src/app/core/services/helpers.service';
import { EntityDetailsFormService } from './entity-details-form.service';
import { updatePartialEntityDetails } from './store/entity-details.actions';
import { selectEntityDetails } from './store/entity-details.selectors';
import { EntityDetails } from './store/entity-details.state';

interface Doc {
  label: string;
  type: string;
  file: { name: string | null; link: string | null };
  isRequired: boolean;
}

@Component({
  selector: 'rekyc-entity-details-form',
  templateUrl: './entity-details-form.component.html',
  styleUrls: ['./entity-details-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RekycEntityDetailsFormComponent implements OnInit, DoCheck, OnDestroy {
  @Output() formNavigation = new EventEmitter<string>();
  form!: FormGroup;
  entityDocs: Doc[] = [
    {
      label: "Company's PAN",
      type: 'pan',
      file: {
        name: null,
        link: null,
      },
      isRequired: true,
    },
    {
      label: "Company's GSTIN",
      type: 'gstin',
      file: {
        name: null,
        link: null,
      },
      isRequired: true,
    },
    {
      label: 'Select Proof of Address',
      type: 'pan',
      file: {
        name: null,
        link: null,
      },
      isRequired: true,
    },
  ];
  entityAddressProofList = [
    {
      id: 1,
      label: 'Electricity Bill (not more than 2 months old)',
      value: 'electricity_bill',
    },
    {
      id: 2,
      label: 'Water Bill (not more than 2 months old)',
      value: 'water_bill',
    },
    {
      id: 3,
      label: 'Landline Bill (not more than 2 months old)',
      value: 'landline_bill',
    },
    {
      id: 4,
      label: 'Internet Bill (not more than 2 months old)',
      value: 'internet_bill',
    },
  ];
  isFileLoading = signal({
    pan: false,
    gstin: false,
    addressProof: false,
    coi: false,
    moa: false,
    aoa: false,
  });
  entityDetails = toSignal(this.store.select(selectEntityDetails));

  constructor(
    private fb: FormBuilder,
    private entityDetailsFormService: EntityDetailsFormService,
    private helperService: HelperService,
    private toast: ToastService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    const entityDetails = this.entityDetails?.();

    if (!entityDetails) {
      // eslint-disable-next-line no-console
      console.error('Entity details are not available.');
      return;
    }

    const documentKeys: Array<keyof EntityDetails> = ['pan', 'gstin', 'coi', 'moa', 'aoa'];

    const groupObj: Record<string, FormGroup> = {};

    documentKeys.forEach((key) => {
      groupObj[key] = this.fb.group({
        file: this.fb.group({
          name: [entityDetails[key]?.file?.name || ''],
          link: [entityDetails[key]?.file?.link || ''],
          isLoading: [false],
        }),
        isRequired: this.fb.control(
          entityDetails[key]?.isRequired !== undefined
            ? entityDetails[key].isRequired
            : key !== 'gstin',
        ),
      });
    });

    groupObj['addressProof'] = this.fb.group({
      file: this.fb.group({
        name: [entityDetails.addressProof?.file?.name],
        link: [entityDetails.addressProof?.file?.link],
        selectedType: [entityDetails.addressProof?.file?.selectedType],
        isLoading: [false],
      }),
      isRequired: this.fb.control(true),
    });

    this.form = this.fb.group(groupObj);
  }

  ngDoCheck(): void {
    // eslint-disable-next-line no-console
    console.log('Entity details form rendeing');
  }

  trackDoc(_index: number, doc: Doc): string {
    return doc.type;
  }

  get addressProofTypeControl(): FormControl<string> {
    return this.form.get('addressProof.type') as FormControl<string>;
  }

  isFileLoadingType(type: EntityDetailsFileType): boolean {
    return this.isFileLoading()[type];
  }

  setIsFileLoading(key: EntityDetailsFileType, value: boolean) {
    const obj = this.isFileLoading();
    obj[key] = value;
    this.isFileLoading.set(obj);
  }

  get isFormValid(): boolean {
    return Object.keys(this.form.value).every((key) => {
      const isRequired = this.form.get(`${key}.isRequired`)?.value;
      const name = this.form.get(`${key}.file.name`)?.value;
      return !isRequired || !!name;
    });
  }

  getErrorMessage(controlName: EntityDetailsFileType): string {
    const controlGroup = this.form.get(controlName) as FormGroup;

    if (!controlGroup) return '';

    const isRequired = controlGroup.get('isRequired')?.value;
    const nameControl = controlGroup.get('file.name');

    if (isRequired && !nameControl?.value) {
      nameControl?.setErrors({ required: true });
      return 'This document is required';
    }

    return '';
  }

  updateErrorMessages() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    Object.entries(this.form.controls).forEach(([key, control]) => {
      if (control instanceof FormGroup) {
        const isRequired = control.get('isRequired')?.value;
        const nameControl = control.get('file.name');

        if (isRequired && !nameControl?.value) {
          nameControl?.setErrors({ required: true });
        } else {
          nameControl?.setErrors(null);
        }
      }
    });
  }

  getFileControl(doc: string, control: 'name' | 'link') {
    return this.form.get(`${doc}.file.${control}`);
  }

  onAddressProofChange(value: string) {
    this.form.get('addressProof.file.selectedType')?.setValue(value);
    // eslint-disable-next-line no-console
    console.log('addressProof', value);
  }

  onFileSelection(controlName: EntityDetailsFileType, file: File): void {
    if (!file) return;

    this.uploadFileProof(controlName, file);
  }

  uploadFileProof(type: EntityDetailsFileType, file: File): void {
    if (!file || !type) return;

    const formData = new FormData();
    formData.append('docType', type);
    formData.append('entityId', 'ebitaus-CUS1234567-09042025');
    formData.append('file', file);

    const fileGroup = this.form.get(`${type}.file`) as FormGroup;
    if (!fileGroup) {
      // eslint-disable-next-line no-console
      console.warn(`No form group found for type: ${type}`);
      return;
    }

    fileGroup.patchValue({
      name: file.name,
    });

    this.entityDetailsFormService
      .uploadFileProof(formData as unknown as UploadFileProof)
      .subscribe({
        next: (result) => {
          const { loading, response } = result;
          fileGroup.get('isLoading')?.setValue(loading);
          this.setIsFileLoading(type, loading);

          if (!response) return;

          const { status } = response;

          const entityDetailsFileTypeEntityDetailsFileType =
            type !== 'addressProof' ? type.toUpperCase() : this.helperService.toTitleCase(type);

          if (status === ApiStatus.SUCCESS) {
            const { data } = response as { data: UploadFileProofResponse };
            fileGroup.get('name')?.setValue(data?.docName);
            fileGroup.get('link')?.setValue(data?.storedPath);
            this.toast.success(
              `${entityDetailsFileTypeEntityDetailsFileType} uploaded successfully`,
            );
          } else {
            this.toast.error(`Invalid document for ${entityDetailsFileTypeEntityDetailsFileType}`);
            this.removeFile(type);
          }
        },
      });
  }

  removeFile(type: EntityDetailsFileType): void {
    const fileGroup = this.form.get(`${type}.file`) as FormGroup;
    if (!fileGroup) {
      // eslint-disable-next-line no-console
      console.warn(`No form group found for type: ${type}`);
      return;
    }

    fileGroup.get('name')?.setValue('');
    fileGroup.get('link')?.setValue('');
    this.setIsFileLoading(type, false);
    // eslint-disable-next-line no-console
    console.log('ent det remove', this.form.value[type]);
  }

  submit(action: 'submit' | 'save' = 'submit'): void {
    if (action === 'submit') {
      this.form.markAllAsTouched();
      this.updateErrorMessages();
      if (!this.isFormValid) {
        // this.toast.error('Something went wrong!');
        // eslint-disable-next-line no-console
        console.warn('Form is not valid');
        return;
      }

      this.toast.success('Form sumitted successfully!');
      this.formNavigation.emit('next');
    } else {
      this.toast.info('Form saved successfully!');
    }
  }

  ngOnDestroy(): void {
    this.store.dispatch(updatePartialEntityDetails({ partialData: this.form.value }));
  }
}
