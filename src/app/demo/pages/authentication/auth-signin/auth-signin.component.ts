import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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

  constructor(
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

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
      },
      error: () => {
        this.error = 'Usuário ou senha inválidos';
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
