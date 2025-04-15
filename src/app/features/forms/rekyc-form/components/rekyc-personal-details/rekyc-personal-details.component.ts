import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiStatus } from '@core/constants/api.response';
import { HelperService } from '@core/services/helpers.service';
import {
  UploadFileProof,
  UploadFileProofResponse,
} from '@features/forms/rekyc-form/rekyc-form.model';
import { ToastService } from '@src/app/shared/ui/toast/toast.service';
import { RekycPersonalFormService } from './rekyc-personal.service';
import { selectPersonalDetails } from './store/personal-details.selectors';
import { Store } from '@ngrx/store';
import { toSignal } from '@angular/core/rxjs-interop';
import { PersonalDetails } from './store/personal-details.state';
import { updatePartialPersonalDetails } from './store/personal-details.actions';

interface Doc {
  label: string;
  type: string;
  file: { name: string | null; link: string | null };
  isRequired: boolean;
}

type FileType = 'identityProof' | 'addressProof' | 'photograph' | 'signature';

@Component({
  selector: 'rekyc-personal-details',
  templateUrl: './rekyc-personal-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RekycPersonalDetailsComponent implements OnInit, OnDestroy {
  form!: FormGroup;
  identityProofList = [
    {
      id: 1,
      label: 'Driving License',
      value: 'drivingLicense',
    },
    {
      id: 2,
      label: 'Aadhaar',
      value: 'aadhaar',
    },
    {
      id: 3,
      label: 'Voter ID',
      value: 'voterId',
    },
    {
      id: 4,
      label: 'Pan',
      value: 'pan',
    },
  ];
  addressProofList = [
    {
      id: 1,
      label: 'Driving License',
      value: 'drivingLicense',
    },
    {
      id: 2,
      label: 'Aadhaar',
      value: 'aadhaar',
    },
    {
      id: 3,
      label: 'Voter ID',
      value: 'voterId',
    },
    {
      id: 4,
      label: 'Pan',
      value: 'Pan',
    },
  ];
  isFileLoading = signal({
    identityProof: false,
    addressProof: false,
    photograph: false,
    signature: false,
  });
  @Output() formNavigation = new EventEmitter<string>();
  personalDetails = toSignal(this.store.select(selectPersonalDetails));

  constructor(
    private fb: FormBuilder,
    private personalFormService: RekycPersonalFormService,
    private helperService: HelperService,
    private toast: ToastService,
    private store: Store,
  ) {}

  ngOnInit(): void {
    const personalDetails = this.personalDetails?.();

    if (!personalDetails) {
      // eslint-disable-next-line no-console
      console.error('Entity details are not available.');
      return;
    }

    const documentKeys: Array<keyof PersonalDetails> = [
      'identityProof',
      'addressProof',
      'photograph',
      'signature',
    ];

    const groupObj: Record<string, FormGroup> = {};

    documentKeys.forEach((key) => {
      groupObj[key] = this.fb.group({
        file: this.fb.group({
          name: [personalDetails[key]?.file?.name || ''],
          link: [personalDetails[key]?.file?.link || ''],
          isLoading: [false],
        }),
        isRequired: this.fb.control(
          personalDetails[key]?.isRequired !== undefined ? personalDetails[key].isRequired : false,
        ),
      });
    });

    groupObj['addressProof'] = this.fb.group({
      file: this.fb.group({
        name: [personalDetails.addressProof?.file?.name],
        link: [personalDetails.addressProof?.file?.link],
        selectedType: [personalDetails.addressProof?.file?.selectedType],
        isLoading: [false],
      }),
      isRequired: this.fb.control(true),
    });

    this.form = this.fb.group(groupObj);
  }

  trackDoc(_index: number, doc: Doc): string {
    return doc.type;
  }

  get isFormValid(): boolean {
    return Object.keys(this.form.value).every((key) => {
      const link = this.form.get(`${key}.file.name`)?.value;
      return !!link;
    });
  }

  isFileLoadingType(type: FileType): boolean {
    return this.isFileLoading()[type];
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

  onProofDocChange(doc: string, value: string) {
    this.form.get(`${doc}.file.selectedType`)?.setValue(value);
    this.removeFile(doc);
  }

  onFileSelection(controlName: string, file: File): void {
    if (!file) return;

    this.uploadFileProof(controlName, file);
  }

  removeFile(controlName: string): void {
    const fileGroup = this.form.get(`${controlName}.file`) as FormGroup;
    if (!fileGroup) {
      // eslint-disable-next-line no-console
      console.warn(`No form group found for type: ${controlName}`);
      return;
    }

    fileGroup.patchValue({
      name: '',
      link: '',
    });
  }

  setIsFileLoading(key: FileType, value: boolean) {
    const obj = this.isFileLoading();
    obj[key] = value;
    this.isFileLoading.set(obj);
  }

  uploadFileProof(type: string, file: File): void {
    if (!file || !type) return;

    const fileGroup = this.form.get(`${type}.file`) as FormGroup;

    if (!fileGroup) {
      // eslint-disable-next-line no-console
      console.warn(`No form group found for type: ${type}`);
      return;
    }

    const formData = new FormData();
    formData.append('entityId', 'ebitaus-CUS1234567-09042025');
    formData.append('ausId', 'ebitaus-CUS1234567-09042025-AUS3');
    formData.append('file', file);
    formData.append('docType', type);
    formData.append('selectedType', fileGroup.get('selectedType')?.value);

    fileGroup.patchValue({
      name: file.name,
    });

    this.personalFormService.uploadProofDocument(formData as unknown as UploadFileProof).subscribe({
      next: (result) => {
        const { loading, response } = result;
        fileGroup.get('isLoading')?.setValue(loading);

        if (!response) return;

        const { status } = response;

        const fileType = this.helperService.toTitleCase(type);

        if (status === ApiStatus.SUCCESS) {
          const { data } = response as { data: UploadFileProofResponse };
          fileGroup.get('name')?.setValue(data?.docName);
          fileGroup.get('link')?.setValue(data?.storedPath);
          this.toast.success(`${fileType} uploaded successfully`);
        } else {
          this.toast.error(`Invalid document for ${fileType}`);
          // fileGroup.patchValue({
          // name: '',
          // });
        }
      },
    });
  }

  submit(action: 'submit' | 'save' = 'submit'): void {
    if (action === 'submit') {
      this.form.markAllAsTouched();
      this.updateErrorMessages();

      if (!this.isFormValid) {
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
    this.store.dispatch(updatePartialPersonalDetails({ partialData: this.form.value }));
  }
}
