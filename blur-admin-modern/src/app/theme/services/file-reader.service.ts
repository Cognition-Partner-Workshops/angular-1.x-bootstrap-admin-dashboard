import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class FileReaderService {
  readonly progress$ = new Subject<{ total: number; loaded: number }>();

  readAsDataUrl(file: Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = () => reject(reader.result);
      reader.onprogress = (event) => this.progress$.next({ total: event.total, loaded: event.loaded });
      reader.readAsDataURL(file);
    });
  }
}
