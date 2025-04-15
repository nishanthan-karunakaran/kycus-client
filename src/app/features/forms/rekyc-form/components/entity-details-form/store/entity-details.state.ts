export interface Doc {
  name: string;
  link: string;
  selectedType?: string;
}

export interface ProofDoc {
  label: string;
  type: string;
  docType: string;
  file: Doc;
  isRequired: boolean;
}

export interface BasicDoc {
  label: string;
  type: string;
  file: Doc;
  isRequired: boolean;
}

export interface EntityDetails {
  pan: BasicDoc;
  gstin: BasicDoc;
  addressProof: ProofDoc;
  coi: BasicDoc;
  moa: BasicDoc;
  aoa: BasicDoc;
}

const createInitialDoc = (label = '', type = '', isRequired = true): BasicDoc => ({
  label,
  type,
  file: {
    name: '',
    link: '',
  },
  isRequired,
});

const createInitialProofDoc = (label = '', type = '', isRequired = true): ProofDoc => ({
  label,
  type,
  docType: '',
  file: {
    name: '',
    link: '',
    selectedType: 'electricity_bill',
  },
  isRequired,
});

export const initialEntityDetails: EntityDetails = {
  pan: createInitialDoc("Company's PAN", 'pan', true),
  gstin: createInitialDoc("Company's GSTIN", 'gstin', false),
  addressProof: createInitialProofDoc('Select Proof of Address', 'addressProof', true),
  coi: createInitialDoc('COI (Certificate of Incoporation) ', 'coi', true),
  moa: createInitialDoc('MOA (Memorandum of Association) ', 'moa', true),
  aoa: createInitialDoc('AOA (Articles of Association) ', 'aoa', true),
};
