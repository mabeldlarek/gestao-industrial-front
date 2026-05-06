import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { MedidorService } from './medidor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medidor-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NgbModule,
    CardComponent
  ],
  templateUrl: './medidor-create.html'
})
export class MedidorCreate implements OnInit {
  @Input() medidorEdicao: any;

  // Objeto seguindo o seu JSON de referência
  medidor: any = {
    id: null,
    codigo: '',
    nome: '',
    tipo: null,
    unidade: '',
    valorAtual: 0,
    valorMinimo: 0,
    valorMaximo: 0
  };

  error: string | null = null;

  constructor(
    public activeModal: NgbActiveModal,
    private medidorService: MedidorService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.medidorEdicao) {
      this.medidor = JSON.parse(JSON.stringify(this.medidorEdicao));
    }
  }

  salvar() {
    this.error = null;

    if (this.medidor.valorMinimo >= this.medidor.valorMaximo) {
      this.error = "O valor mínimo não pode ser superior ou igual ao valor máximo.";
      this.cdr.detectChanges();
      return;
    }

    const operacaoObs = this.medidor.id
      ? this.medidorService.update(this.medidor.id, this.medidor)
      : this.medidorService.create(this.medidor);

    operacaoObs.subscribe({
      next: (response) => {
        this.activeModal.close(this.medidor);

        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: this.medidor.id ? 'Medidor atualizado com sucesso!' : 'Medidor cadastrado com sucesso!',
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
            this.error = backendMessage || 'Conflito: Já existe um medidor com este código.';
            break;
          case 400:
            this.error = backendMessage || 'Dados inválidos. Verifique os limites técnicos.';
            break;
          case 403:
            this.error = 'Você não tem permissão para gerenciar medidores.';
            break;
          case 0:
            this.error = 'Não foi possível conectar ao servidor de telemetria.';
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