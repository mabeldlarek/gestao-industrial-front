import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import Swal from 'sweetalert2';
import { FuncionarioService } from './services/funcionario.service';

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

  dadosForm: any = {
    id: null,
    matricula: '',
    nome: '',
    cargo: '',
    equipe: '',
    especialidades: [],
    status: 'ATIVO'
  };

  error: string | null = null;

  constructor(
    public activeModal: NgbActiveModal,
    private funcionarioService: FuncionarioService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.funcionarioEdicao) {
      // Clonagem para evitar mutação direta na tabela antes do save
      this.dadosForm = JSON.parse(JSON.stringify(this.funcionarioEdicao));
    }
  }

  salvar() {
    this.error = null;

    const operacaoObs = this.dadosForm.id
      ? this.funcionarioService.update(this.dadosForm.id, this.dadosForm)
      : this.funcionarioService.create(this.dadosForm);

    operacaoObs.subscribe({
      next: (response) => {
        this.activeModal.close(this.dadosForm);

        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: this.dadosForm.id ? 'Funcionário atualizado com sucesso!' : 'Funcionário cadastrado com sucesso!',
          timer: 2000,
          showConfirmButton: false
        });
      },
      error: (err) => {
        console.error('Erro na requisição:', err);

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
            this.error = backendMessage || 'Conflito: Matrícula ou dado duplicado.';
            break;
          case 400:
            this.error = backendMessage || 'Dados inválidos. Verifique os campos.';
            break;
          case 403:
            this.error = 'Você não tem permissão para esta ação.';
            break;
          case 0:
            this.error = 'Servidor inacessível.';
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