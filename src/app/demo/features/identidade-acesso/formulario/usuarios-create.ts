import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Router } from '@angular/router'; // Corrigido o caminho do import
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { UsuarioService } from './services/usuario.service';
import Swal from 'sweetalert2';
import { HttpHeaders } from '@angular/common/http';

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
    nomeUsuario: '',
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
    private fb: FormBuilder,
    private userService: UsuarioService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.usuarioEdicao) {
      this.dadosForm = JSON.parse(JSON.stringify(this.usuarioEdicao));
      this.dadosForm.senha = '';
    }
  }

  salvar() {
    this.error = null;

    this.userService.create(this.dadosForm).subscribe({
      next: (response) => {
        this.activeModal.close(this.dadosForm);
        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: 'Usuário cadastrado com sucesso.',
          timer: 2000,
          showConfirmButton: false
        });
      },
      error: (err) => {
        console.error('Erro completo recebido:', err); // Importante para debugar

        let backendMessage = '';
        if (err.error) {
          const texto = err.error;
          
          const objetoJson = JSON.parse(texto);

          backendMessage = objetoJson.message;

          switch (err.status) {
            case 409:
              this.error = backendMessage;
              break;
            case 400:
              this.error = backendMessage;
              break;
            case 0:
              this.error = 'Não foi possível comunicar com o servidor.';
              break;
            default:
              this.error = backendMessage || `Erro inesperado (${err.status})`;
          }

          this.cdr.detectChanges();
        }
      }

    });
  }
}
