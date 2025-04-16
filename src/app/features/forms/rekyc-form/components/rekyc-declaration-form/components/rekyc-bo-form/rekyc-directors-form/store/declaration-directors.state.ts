export interface Director {
  directorName: string;
  din: string;
  directorEmail?: string;
  status?: boolean;
}

export interface Doc {
  name: string | null;
  link: string | null;
}

export interface DirectorState {
  directorList: Director[];
  isDirectorModified: boolean;
  form32: Doc;
}
