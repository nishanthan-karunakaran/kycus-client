export interface Director {
  dirId: string;
  directorName: string;
  din: string;
  directorEmail?: string;
  status: string; // active || inactive || new-dir
  error?: {
    idError?: string;
    dinError?: string;
    nameError?: string;
    emailError?: string;
    errorMsg?: string;
  };
}

export interface Doc {
  name: string | null;
  link: string | null;
  file?: null | File;
}

export interface DirectorState {
  directorList: Director[];
  isDirectorModified: boolean;
  form32: Doc;
}
