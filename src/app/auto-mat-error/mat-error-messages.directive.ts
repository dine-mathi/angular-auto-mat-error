import {
  AfterContentInit,
  ChangeDetectorRef,
  ContentChild,
  Directive,
  ElementRef,
  Inject,
  OnDestroy,
  Optional,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatError } from '@angular/material/form-field';
import { merge, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { VALIDATION_MESSAGES_TOKEN } from './validation-messages';

@Directive({
  selector: '[appMatErrorMessages]',
})
export class MatErrorMessagesDirective implements AfterContentInit, OnDestroy {
  private readonly subscriptions = new Subscription();

  @ContentChild(NgControl, { descendants: true }) inputNgControl?: NgControl;
  @ContentChild(MatError, { read: ElementRef }) matErrorElement?: ElementRef;

  constructor(
    private readonly cdr: ChangeDetectorRef,
    @Optional()
    @Inject(VALIDATION_MESSAGES_TOKEN)
    private readonly validationMessages?: { [key: string]: { [key: string]: string } }
  ) {}

  ngAfterContentInit(): void {
    const statusChanges = this.inputNgControl?.statusChanges;
    const valueChanges = this.inputNgControl?.valueChanges;
    if (!statusChanges || !valueChanges) return;

    const sub = merge(this.inputNgControl?.statusChanges!, this.inputNgControl?.valueChanges!)
      .pipe(debounceTime(600))
      .subscribe((state) => {
        this.updateErrors(state as 'VALID' | 'INVALID');
      });
    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  // Update error messages based on control state
  private updateErrors(state: 'VALID' | 'INVALID'): void {
    console.log('Updating errors for state:', state);
    if (state !== 'INVALID') {
      this.setErrorText('');
      return;
    }

    const controlErrors = this.inputNgControl?.errors;
    const controlName = this.inputNgControl?.name;
    if (!controlErrors || !controlName) return;

    const errorName = Object.keys(controlErrors)[0];
    const errorMsg = this.validationMessages?.[controlName]?.[errorName];
    if (!errorMsg) return;

    this.setErrorText(errorMsg);

    if (this.inputNgControl?.dirty && this.inputNgControl.control) {
      this.inputNgControl.control.markAsTouched();
    }
    this.cdr.markForCheck();
  }

  // Helper to set error message text
  private setErrorText(message: string): void {
    const el = this.matErrorElement?.nativeElement;
    if (el) el.textContent = message;
  }
}
