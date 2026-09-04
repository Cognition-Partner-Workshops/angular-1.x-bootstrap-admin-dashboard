import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideRouter } from '@angular/router';
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    provideToastr({
      closeButton: true,
      timeOut: 5000,
      autoDismiss: false,
      maxOpened: 0,
      newestOnTop: true,
      positionClass: 'toast-top-right',
      preventDuplicates: false,
    })
  ]
};
