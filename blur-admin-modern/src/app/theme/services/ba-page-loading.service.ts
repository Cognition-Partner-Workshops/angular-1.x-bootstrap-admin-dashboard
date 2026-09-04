import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class BaPageLoadingService {
  readonly pageFinishedLoading = signal(false);
}
