import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

import { SharedModule } from 'src/app/theme/shared/shared.module';
import { AuthService } from './auth-signin.service';
import { LoginRequest } from './login-request.model';

@Component({
  selector: 'app-auth-signin',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    SharedModule
  ],
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})

export class AuthSigninComponent {

  error = '';
  showPassword = false;
  private router: Router

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) { }

  loginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(1)]]
  });

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    const payload: LoginRequest = this.loginForm.value as LoginRequest;

    this.authService.login(payload).subscribe({
      next: (response) => {
        localStorage.setItem('accessToken', response.accessToken);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        if (err.status === 502) {
          this.error = 'Servidor indisponível (Bad Gateway). Tente novamente mais tarde.';
        }
        if (err.status === 400) {
          this.error = 'O servidor não entendeu a requisiçãol (Bad Request). Tente novamente mais tarde.';
        }
        if (err.status === 401) {
          this.error = 'Credenciais inválidas. Tente novamente.';
        }
        if (err.status === 403) {
          this.error = 'Acesso não autorizado. Tente novamente.';
        }
        if (err.status === 404) {
          this.error = 'Recurso não encontrado. Tente novamente.';
        }
        else {
          this.error = 'Erro inesperado. Tente novamente mais tarde.';
        }
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
