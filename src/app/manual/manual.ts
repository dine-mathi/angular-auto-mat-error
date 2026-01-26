import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { merge } from 'rxjs';

@Component({
  selector: 'app-manual',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './manual.html',
  styleUrls: ['./manual.scss'],
})
export class Manual implements OnInit {
  protected email = new FormControl('', [Validators.required, Validators.email]);

  editProfileForm!: FormGroup;

  constructor(private fb: FormBuilder) {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(takeUntilDestroyed())
      .subscribe(() => console.log('Email control changed'));
  }

  ngOnInit(): void {
    this.editProfileForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  protected errorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    if (this.email.hasError('email')) {
      return 'Not a valid email';
    }
    return '';
  }
}
