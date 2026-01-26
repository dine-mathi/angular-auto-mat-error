import { Component, OnInit, Provider } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VALIDATION_MESSAGES_TOKEN } from '../auto-mat-error/validation-messages';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatErrorMessagesDirective } from '../auto-mat-error/mat-error-messages.directive';

export const VALIDATION_MESSAGES_PROVIDER: Provider = {
  provide: VALIDATION_MESSAGES_TOKEN,
  useValue: {
    email: {
      required: 'You must enter a value',
      email: 'Not a valid email',
    },
  },
};

@Component({
  selector: 'app-automatic',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatErrorMessagesDirective,
  ],
  providers: [VALIDATION_MESSAGES_PROVIDER],
  templateUrl: './automatic.html',
  styleUrls: ['./automatic.scss'],
})
export class Automatic implements OnInit {
  editProfileForm!: FormGroup;

  constructor(private fb: FormBuilder) {}
  ngOnInit(): void {
    this.editProfileForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
}
