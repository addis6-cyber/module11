import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './registration.html',
  styleUrl: './registration.scss'
})
export class RegistrationComponent {

  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  isSubmitting = false;
  errorMessage = '';
  successMessage = '';

  registrationForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    password: ['', [
      Validators.required,
      Validators.minLength(12)
    ]],
    confirmPassword: ['', Validators.required],
    role: ['Student', Validators.required]
  });

  register(): void {
    this.errorMessage = '';
    this.successMessage = '';

    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }

    const formValue = this.registrationForm.getRawValue();

    if (formValue.password !== formValue.confirmPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.isSubmitting = true;

    this.auth.register({
      email: formValue.email!,
      password: formValue.password!,
      firstName: formValue.firstName!,
      lastName: formValue.lastName!,
      role: formValue.role!
    }).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.successMessage = 'Registration successful. Redirecting to login...';

        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      },
      error: (error) => {
        this.isSubmitting = false;

        if (error.error?.errors) {
          this.errorMessage = error.error.errors.join(', ');
        } else {
          this.errorMessage =
            error.error?.message ||
            'Registration failed. Please try again.';
        }
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/login']);
  }
}