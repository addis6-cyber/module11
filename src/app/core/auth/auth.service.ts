import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

export interface TmsUser {
  email: string;
  displayName: string;
  role: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http = inject(HttpClient);

  private apiUrl =
    `${environment.apiBaseUrl}/api/v1/auth`;

  // Keep this because your existing components use auth.user
  user = signal<LoginResponse | null>(null);

  // M11 user profile
  currentUser = signal<TmsUser | null>(null);

  // Store JWT in memory and restore it from localStorage
  private accessToken = signal<string | null>(
    localStorage.getItem('accessToken')
  );

  constructor() {
    const token = this.accessToken();

    if (token) {
      this.decodeUser(token);
    }
  }

  getAccessToken(): string | null {
    return this.accessToken();
  }

  me() {
  return this.http.get<LoginResponse>(
    `${this.apiUrl}/me`
  );
}

  hasRole(role: string): boolean {
    const currentUser = this.currentUser();

    return currentUser?.role === role ||
           currentUser?.role === 'Admin';
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

  private decodeUser(token: string): void {
    try {
      const payload = JSON.parse(
        atob(token.split('.')[1])
      );

      this.currentUser.set({
        email:
          payload.email ??
          payload[
            'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
          ] ??
          payload.sub ??
          '',

        displayName:
          payload.name ??
          payload.FirstName ??
          payload.email ??
          'User',

        role:
          payload[
            'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
          ] ??
          payload.role ??
          'Student'
      });

    } catch {
      this.currentUser.set(null);
    }
  }

  logout() {
  return this.http.post(
    `${this.apiUrl}/logout`,
    {}
  );
}

  clearUser(): void {
    this.logout();
  }

  setUser(user: LoginResponse): void {
    this.user.set(user);

    if (user.accessToken) {
      this.accessToken.set(user.accessToken);
      this.decodeUser(user.accessToken);
    }
  }

  saveTokens(response: LoginResponse): void {
    localStorage.setItem(
      'accessToken',
      response.accessToken
    );

    localStorage.setItem(
      'refreshToken',
      response.refreshToken
    );

    this.accessToken.set(response.accessToken);
    this.user.set(response);

    this.decodeUser(response.accessToken);
  }

  register(request: RegisterRequest) {
  return this.http.post(
    `${this.apiUrl}/register`,
    request
  );
}
  
}