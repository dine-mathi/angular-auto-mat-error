import { ComponentFixture, TestBed } from '@angular/core/testing';
import { describe, it, expect, beforeEach } from 'vitest';

import { Manual } from './manual';

describe('Manual', () => {
  let component: Manual;
  let fixture: ComponentFixture<Manual>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Manual]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Manual);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
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
    fixture.detectChanges();
    expect(email.hasError('email')).toBeTruthy();
    expect(component.editProfileForm.valid).toBeFalsy();
  });

  it('email control should be valid for correct email', () => {
    const email = component.editProfileForm.get('email')!;
    email.setValue('pat@example.com');
    fixture.detectChanges();
    expect(email.valid).toBeTruthy();
    expect(component.editProfileForm.valid).toBeTruthy();
  });
});
