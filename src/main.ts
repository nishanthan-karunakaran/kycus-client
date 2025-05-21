/// <reference types="@angular/localize" />

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { isDevMode } from '@angular/core';

const start = performance.now();

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  // eslint-disable-next-line no-console
  .catch((err) => console.error(err))
  .then(() => {
    const end = performance.now();
    if (isDevMode()) {
      // eslint-disable-next-line no-console
      console.log(`Angular app bootstrapped in ${Math.round(end - start)} ms`);
    }
  });
