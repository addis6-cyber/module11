import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface LoginResponse {
  displayName: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private apiUrl =
    `${environment.apiBaseUrl}/api/v1/auth`;

  user = signal<LoginResponse | null>(null);

  me() {
    return this.http.get<LoginResponse>(
      `${this.apiUrl}/me`
    );
  }

  loadUser() {
    this.me().subscribe({
      next: user => this.user.set(user),
      error: () => this.user.set(null)
    });
  }

  login(username: string, password: string) {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      {
        username,
        password
      }
    );
  }

  logout() {
    return this.http.post(
      `${this.apiUrl}/logout`,
      {}
    );
  }

  setUser(user: LoginResponse) {
    this.user.set(user);
  }

  clearUser() {
    this.user.set(null);
  }
}