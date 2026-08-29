import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
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
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      this.user.set(null);
      return;
    }

    this.user.set({
      accessToken,
      refreshToken: localStorage.getItem('refreshToken') ?? ''
    });
  }

  login(email: string, password: string) {
    return this.http.post<LoginResponse>(
      `${this.apiUrl}/login`,
      {
        email,
        password
      }
    );
  }

  saveTokens(response: LoginResponse) {
    localStorage.setItem(
      'accessToken',
      response.accessToken
    );

    localStorage.setItem(
      'refreshToken',
      response.refreshToken
    );

    this.user.set(response);
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
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.user.set(null);
  }
}