import { InjectionToken } from '@angular/core';

export const VALIDATION_MESSAGES_TOKEN = new InjectionToken<{
  [key: string]: { [key: string]: string };
}>('VALIDATION_MESSAGES_TOKEN');
