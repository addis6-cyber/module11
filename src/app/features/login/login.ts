import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../core/auth/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {

  private auth = inject(AuthService);
  private router = inject(Router);

  email = '';
  password = '';
  error = '';
  isLoading = false;

  login() {
    this.error = '';
    this.isLoading = true;

    this.auth.login(this.email, this.password).subscribe({
      next: response => {
  this.auth.saveTokens(response);
  this.isLoading = false;

  if (response.role === 'Instructor') {
    this.router.navigate(['/instructor']);
  } else if (response.role === 'Admin') {
    this.router.navigate(['/admin/courses']);
  } else {
    this.router.navigate(['/dashboard']);
  }
},

      error: () => {
        this.error = 'Invalid email or password.';
        this.isLoading = false;
      }
    });
  }
  goToRegister() {
  this.router.navigate(['/register']);
}
}