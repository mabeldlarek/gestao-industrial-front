import { CommonModule } from '@angular/common';

import { Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
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
      console.warn('Formulário inválido:', this.loginForm.value); // E isso
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
        switch (err.status) {
          case 502:
            this.error = 'Servidor indisponível (Bad Gateway). Verifique se o Docker está rodando.';
            break;
          case 400:
            this.error = 'O servidor não entendeu a requisição (Bad Request).';
            break;
          case 401:
            this.error = 'Credenciais inválidas. Tente novamente.';
            break;
          case 403:
            this.error = 'Acesso não autorizado.';
            break;
          case 404:
            this.error = 'Recurso não encontrado no servidor.';
            break;
          default:
            this.error = 'Erro inesperado (' + err.status + '). Tente novamente mais tarde.';
            break;
        }
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
