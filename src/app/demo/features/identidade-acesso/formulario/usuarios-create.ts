import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { UsuarioService } from './services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NgbModule,
    CardComponent
  ],
  templateUrl: './usuarios-create.html'
})
export class UsuarioCreate implements OnInit {
  @Input() usuarioEdicao: any;

  dadosForm: any = {
    id: null,        // Adicione o id explicitamente para controle
    nome: '',
    email: '',
    senha: '',
    ativo: true,
    tipoUsuario: 'BASIC'
  };

  tiposUsuario = [
    { label: 'Administrador', value: 'ADMIN' },
    { label: 'Padrão', value: 'BASIC' },
  ];

  exibirSenha = false;
  error: string | null = null;

  constructor(
    public activeModal: NgbActiveModal,
    private userService: UsuarioService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.usuarioEdicao) {
      this.dadosForm = JSON.parse(JSON.stringify(this.usuarioEdicao));
      this.dadosForm.nomeUsuario = this.dadosForm.nome;
    }
  }

  salvar() {
    this.error = null;

    const operacaoObs = this.dadosForm.id
      ? this.userService.update(this.dadosForm.id, this.dadosForm)
      : this.userService.create(this.dadosForm);

    operacaoObs.subscribe({
      next: (response) => {
        this.activeModal.close(this.dadosForm);

        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: this.dadosForm.id ? 'Usuário atualizado com sucesso!' : 'Usuário cadastrado com sucesso!',
          timer: 2000,
          showConfirmButton: false
        });
      },
      error: (err) => {
        console.error('Erro completo recebido:', err);

        let backendMessage = '';

        if (err.error) {
          try {
            const objetoJson = typeof err.error === 'string' ? JSON.parse(err.error) : err.error;
            backendMessage = objetoJson.message || objetoJson.error;
          } catch (e) {
            backendMessage = typeof err.error === 'string' ? err.error : err.message;
          }
        }

        switch (err.status) {
          case 409:
            this.error = backendMessage || 'Conflito: Este e-mail já está em uso.';
            break;
          case 400:
            this.error = backendMessage || 'Dados inválidos. Verifique os campos.';
            break;
          case 403:
            this.error = 'Você não tem permissão para esta ação.';
            break;
          case 0:
            this.error = 'Não foi possível comunicar com o servidor. Verifique sua conexão.';
            break;
          default:
            this.error = backendMessage || `Erro inesperado (${err.status})`;
            break;
        }

        this.cdr.detectChanges();
      }
    });
  }
}