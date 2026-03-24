import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

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

    console.log('Botão clicar acionado!'); // Adicione isso
  
    if (this.loginForm.invalid) {
      console.warn('Formulário inválido:', this.loginForm.value); // E isso
      this.loginForm.markAllAsTouched();
      return;
    }
  

    const payload: LoginRequest = this.loginForm.value as LoginRequest;

    this.authService.login(payload).subscribe({
      next: (response) => {
        console.log('Resposta do Servidor:', response); 
        
        if (response && response.accessToken) {
          localStorage.setItem('accessToken', response.accessToken);
          console.log('Token salvo com sucesso!');
        }
      },
      error: (err) => {
        console.error('Erro no login:', err);
        this.error = 'Usuário ou senha inválidos';
      }
    });
  }

  togglePasswordVisibility(): void {
    this.showPassword = !this.showPassword;
  }
}
