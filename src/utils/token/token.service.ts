import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root' })
export class TokenService {

  private readonly TOKEN_KEY = 'access_token';

  save(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  get(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  clear(): void {
    localStorage.removeItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.get();
  }
}
