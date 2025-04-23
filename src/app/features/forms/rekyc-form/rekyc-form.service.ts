import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class RekycFormService {
  getRekycLS(key: string) {
    const obj = localStorage.getItem('rekyc');
    const currentRekyc: Record<string, string> = obj ? JSON.parse(obj) : {};
    return currentRekyc[key] || null;
  }

  updateRekycLS(key: string, value: string) {
    const obj = localStorage.getItem('rekyc');
    const currentRekyc = obj ? JSON.parse(obj) : {};
    currentRekyc[key] = value;
    localStorage.setItem('rekyc', JSON.stringify(currentRekyc));
  }
}
