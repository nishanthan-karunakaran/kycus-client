import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ApiStatus } from '@core/constants/api.response';
import { HelperService } from '@core/services/helpers.service';
import { ToastService } from '@src/app/shared/ui/toast/toast.service';
import { UploadFileProof } from '@features/forms/rekyc-form/rekyc-form.model';
import { RekycPersonalFormService } from './rekyc-personal.service';

interface Doc {
  label: string;
  type: string;
  file: { name: string | null; link: string | null };
  isRequired: boolean;
}

@Component({
  selector: 'rekyc-personal-details',
  templateUrl: './rekyc-personal-details.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RekycPersonalDetailsComponent implements OnInit {
  form!: FormGroup;
  entityDocs: Doc[] = [
    {
      label: 'Select Proof of Identity',
      type: 'proofOfIdentity',
      file: {
        name: null,
        link: null,
      },
      isRequired: true,
    },
    {
      label: 'Select Proof of Address',
      type: 'proofOfAddress',
      file: {
        name: null,
        link: null,
      },
      isRequired: true,
    },
    {
      label: 'Upload Photograph',
      type: 'photograph',
      file: {
        name: null,
        link: null,
      },
      isRequired: true,
    },
    {
      label: 'Upload Specimen Signature',
      type: 'signature',
      file: {
        name: null,
        link: null,
      },
      isRequired: true,
    },
  ];
  proofOfIdentityList = [
    {
      id: 1,
      label: 'Driving License',
      value: 'driving_license',
    },
    {
      id: 2,
      label: 'Aadhaar',
      value: 'aadhaar',
    },
    {
      id: 3,
      label: 'Voter ID',
      value: 'voter_id',
    },
    {
      id: 4,
      label: 'Pan',
      value: 'Pan',
    },
  ];
  proofOfAddressList = [
    {
      id: 1,
      label: 'Driving License',
      value: 'driving_license',
    },
    {
      id: 2,
      label: 'Aadhaar',
      value: 'aadhaar',
    },
    {
      id: 3,
      label: 'Voter ID',
      value: 'voter_id',
    },
    {
      id: 4,
      label: 'Pan',
      value: 'Pan',
    },
  ];
  @Output() formNavigation = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder,
    private personalFormService: RekycPersonalFormService,
    private helperService: HelperService,
    private toast: ToastService,
  ) {}
  ngOnInit(): void {
    const documentKeys = ['photograph', 'signature'];

    const groupObj: Record<string, FormGroup> = {};

    documentKeys.forEach((key) => {
      groupObj[key] = this.fb.group({
        file: this.fb.group({
          name: [''],
          link: [''],
          selectedType: 'driving_license',
          isLoading: false,
        }),
        isRequired: this.fb.control(true),
      });
    });

    groupObj['proofOfIdentity'] = this.fb.group({
      file: this.fb.group({
        name: [''],
        link: [''],
        selectedType: 'driving_license',
      }),
      isRequired: this.fb.control(true),
    });

    groupObj['proofOfAddress'] = this.fb.group({
      file: this.fb.group({
        name: [''],
        link: [''],
        selectedType: 'driving_license',
      }),
      isRequired: this.fb.control(true),
    });

    this.form = this.fb.group(groupObj);
  }

  trackDoc(_index: number, doc: Doc): string {
    return doc.type;
  }

  get addressProofTypeControl(): FormControl<string> {
    return this.form.get('addressProof.type') as FormControl<string>;
  }

  getSelectedAddressProof() {
    const selectedType = this.form.get('addressProof.file.selectedType')?.value;
    // eslint-disable-next-line no-console
    console.log('selectedType', selectedType);
  }

  get isFormValid(): boolean {
    return Object.keys(this.form.value).every((key) => {
      const link = this.form.get(`${key}.file.name`)?.value;
      return !!link;
    });
  }

  getFileControl(doc: string, control: 'name' | 'link') {
    return this.form.get(`${doc}.file.${control}`);
  }

  onProofDocChange(doc: string, value: string) {
    this.form.get(`${doc}.file.selectedType`)?.setValue(value);
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

  uploadFileProof(type: string, file: File): void {
    if (!file || !type) return;

    const formData = new FormData();
    formData.append('docType', type);
    formData.append('entityId', 'ebitaus-CUS1234567-09042025');
    formData.append('ausId', 'ebitaus-CUS1234567-09042025-AUS3');
    formData.append('file', file);

    const fileGroup = this.form.get(`${type}.file`) as FormGroup;
    if (!fileGroup) {
      // eslint-disable-next-line no-console
      console.warn(`No form group found for type: ${type}`);
      return;
    }

    fileGroup.patchValue({
      name: file.name,
      link: file,
    });

    this.personalFormService.uploadProofDocument(formData as unknown as UploadFileProof).subscribe({
      next: (result) => {
        const { loading, response } = result;
        fileGroup.get('isLoading')?.setValue(loading);

        if (!response) return;

        const { status } = response;

        const fileType =
          type !== 'addressProof' ? type.toUpperCase() : this.helperService.toTitleCase(type);

        if (status === ApiStatus.SUCCESS) {
          this.toast.success(`${fileType} uploaded successfully`);
        } else {
          this.toast.error(`Invalid document for ${fileType}`);
        }
      },
    });
  }

  submit(action: 'submit' | 'save' = 'submit'): void {
    if (!this.isFormValid) {
      this.toast.error('Something went wrong!');
      // eslint-disable-next-line no-console
      console.warn('Form is not valid');
      return;
    }

    // eslint-disable-next-line no-console
    console.log(this.form.value);

    if (action === 'submit') {
      this.toast.success('Form sumitted successfully!');
    } else {
      this.toast.info('Form saved successfully!');
    }
    this.formNavigation.emit('next');
  }
}
