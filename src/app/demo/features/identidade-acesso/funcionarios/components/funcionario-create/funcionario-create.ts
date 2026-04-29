import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { FuncionarioService } from '../../services/funcionario.service'; // Ajuste o caminho do seu serviço
import Swal from 'sweetalert2';

@Component({
  selector: 'app-funcionario-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NgbModule,
    CardComponent
  ],
  templateUrl: './funcionario-create.html'
})
export class FuncionarioCreate implements OnInit {
  @Input() funcionarioEdicao: any;

  funcionario: any = {
    id: null,
    matricula: '',
    nome: '',
    cargo: '',
    equipe: '',
    especialidades: [],
    status: 'ATIVO',
    usuarioId: null
  };

  statusOptions = ['ATIVO', 'INATIVO', 'FERIAS'];
  error: string | null = null;

  constructor(
    public activeModal: NgbActiveModal,
    private funcionarioService: FuncionarioService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.funcionarioEdicao) {
      this.funcionario = JSON.parse(JSON.stringify(this.funcionarioEdicao));
    }
  }
  atualizarEspecialidades(valor: string) {
    if (valor) {
      // Converte a string em array e remove espaços em branco extras
      this.funcionario.especialidades = valor.split(',').map(s => s.trim());
    } else {
      this.funcionario.especialidades = [];
    }
  }
  salvar() {
    this.error = null;

    if (typeof this.funcionario.especialidades === 'string') {
      this.funcionario.especialidades = this.funcionario.especialidades.split(',').map((s: string) => s.trim());
    }

    const operacaoObs = this.funcionario.id
      ? this.funcionarioService.update(this.funcionario.id, this.funcionario)
      : this.funcionarioService.create(this.funcionario);

    operacaoObs.subscribe({
      next: (response) => {
        this.activeModal.close(this.funcionario);

        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: this.funcionario.id ? 'Funcionário atualizado com sucesso!' : 'Funcionário cadastrado com sucesso!',
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
            this.error = backendMessage || 'Conflito: Matrícula já existe.';
            break;
          case 400:
            this.error = backendMessage || 'Dados inválidos. Verifique os campos.';
            break;
          case 403:
            this.error = 'Você não tem permissão para esta ação.';
            break;
          case 0:
            this.error = 'Não foi possível comunicar com o servidor.';
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