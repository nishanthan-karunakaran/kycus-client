import { EntityDetailsFormService } from './entity-details-form.service';
import { ChangeDetectionStrategy, Component, DoCheck, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

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
export class RekycEntityDetailsFormComponent implements OnInit, DoCheck {
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
      label: 'Electricity Bill (not more than 2 months old)',
      value: 'electicity_bill',
    },
    {
      label: 'Water Bill (not more than 2 months old)',
      value: 'water_bill',
    },
    {
      label: 'Landline Bill (not more than 2 months old)',
      value: 'landline_bill',
    },
  ];

  constructor(
    private fb: FormBuilder,
    private entityDetailsFormService: EntityDetailsFormService,
  ) {}
  ngOnInit(): void {
    this.form = this.fb.group({
      pan: this.fb.group({
        file: this.fb.group({
          name: [''],
          link: [''],
        }),
        isRequired: true,
      }),
      gstin: this.fb.group({
        file: this.fb.group({
          name: [''],
          link: [''],
        }),
        isRequired: true,
      }),
      addressProof: this.fb.group({
        file: this.fb.group({
          name: [''],
          link: [''],
        }),
        isRequired: true,
      }),
      coi: this.fb.group({
        file: this.fb.group({
          name: [''],
          link: [''],
        }),
        isRequired: true,
      }),
      moa: this.fb.group({
        file: this.fb.group({
          name: [''],
          link: [''],
        }),
        isRequired: true,
      }),
      aoa: this.fb.group({
        file: this.fb.group({
          name: [''],
          link: [''],
        }),
        isRequired: true,
      }),
    });
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

  get isFormValid(): boolean {
    return Object.keys(this.form.value).every((key) => {
      const link = this.form.get(`${key}.file.link`)?.value;
      return !!link;
    });
  }

  onFileChange(event: Event, docType: string): void {
    const input = event.target as HTMLInputElement;
    const file = input?.files?.[0];
    if (file) {
      // const fileGroup = this.form.get(`${docType}.file`) as FormGroup;
      // fileGroup.patchValue({
      //   name: file.name,
      //   link: URL.createObjectURL(file),
      // });
      this.uploadFileProof(docType, file);
    }
  }

  uploadFileProof(type: string, file: Blob) {
    const formData = new FormData();
    formData.append('file', file as Blob);
    formData.append('type', type);

    // eslint-disable-next-line no-console
    console.log('type =>', type);
    this.form.get(`${type}.file.name`)?.setValue('Dummy_Doc_Name.pdf');
    this.form.get(`${type}.file.link`)?.setValue('dummy-link');

    // this.entityDetailsFormService.uploadFileProof(formData as unknown as UploadFileProof)
    // .subscribe();
  }

  submit(): void {
    // eslint-disable-next-line no-console
    console.log(this.form.value.documents);
  }
}
