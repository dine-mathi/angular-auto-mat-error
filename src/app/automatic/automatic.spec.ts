import { describe, it, expect, beforeEach } from 'vitest';
import { FormBuilder } from '@angular/forms';

import { Automatic } from './automatic';

describe('Automatic (logic)', () => {
  let component: Automatic;

  beforeEach(() => {
    component = new Automatic(new FormBuilder());
    component.ngOnInit();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('editProfileForm should be invalid when empty', () => {
    expect(component.editProfileForm).toBeTruthy();
    const email = component.editProfileForm.get('email');
    expect(email).toBeTruthy();
    expect(component.editProfileForm.valid).toBeFalsy();
    expect(email?.hasError('required')).toBeTruthy();
  });

  it('email control should be invalid for incorrect email', () => {
    const email = component.editProfileForm.get('email')!;
    email.setValue('not-an-email');
    expect(email.hasError('email')).toBeTruthy();
    expect(component.editProfileForm.valid).toBeFalsy();
  });

  it('email control should be valid for correct email', () => {
    const email = component.editProfileForm.get('email')!;
    email.setValue('pat@example.com');
    expect(email.valid).toBeTruthy();
    expect(component.editProfileForm.valid).toBeTruthy();
  });
});
