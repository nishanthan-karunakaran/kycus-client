import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  public toTitleCase(txt: string): string {
    return txt.charAt(0).toUpperCase() + txt.slice(1);
  }
}
