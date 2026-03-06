// angular import
import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { email, Field, form, minLength, required } from '@angular/forms/signals';

// project import
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-auth-signup',
  imports: [CommonModule, RouterModule, SharedModule, Field],
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export class AuthSignupComponent {
  private cd = inject(ChangeDetectorRef);

  submitted = signal(false);
  error = signal('');
  showPassword = signal(false);

  registerModel = signal<{ email: string; senha: string; nomeUsuario: string; tipoUsuario: string; ativo: boolean }>({
    email: '',
    senha: '',
    nomeUsuario: '',
    tipoUsuario: '',
    ativo: true
  });

  registerForm = form(this.registerModel, (schemaPath) => {
    required(schemaPath.email, { message: 'Email é obrigatório' });
    email(schemaPath.email, { message: 'Enter a valid email address' });
    required(schemaPath.senha, { message: 'Senha é obrigatória' });
    minLength(schemaPath.senha, 8, { message: 'Senha deve ter no mínimo 8 caracteres' });
    required(schemaPath.nomeUsuario, { message: 'Nome de usuário é obrigatório' });
    required(schemaPath.tipoUsuario, { message: 'Tipo de usuário é obrigatório' });
  });

  onSubmit(event: Event) {
    this.submitted.set(true);
    this.error.set('');
    event.preventDefault();
    const credentials = this.registerModel();
    console.log('register user logged in with:', credentials);
    this.cd.detectChanges();
  }

  togglePasswordVisibility() {
    this.showPassword.set(!this.showPassword());
  }
}
