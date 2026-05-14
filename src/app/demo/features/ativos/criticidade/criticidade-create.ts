import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CriticidadeService } from './criticidade.service';

@Component({
  selector: 'app-criticidade-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NgbModule,
    CardComponent
  ],
  templateUrl: './criticidade-create.html'
})
export class CriticidadeCreate implements OnInit {

  @Input() criticidadeEdicao: any;
  @Input() idEquipamento!: string;

  dadosForm: any = {
    nivel: '',
    impactoProducao: '',
    frequenciaProducao: '',
    impactoSeguranca: '',
    frequenciaSeguranca: '',
    impactoAmbiental: '',
    frequenciaAmbiental: '',
    impactoCusto: '',
    frequenciaCusto: '',
    impactoFalha: '',
    frequenciaFalha: '',
    resultadoFinal: ''
  };

  error: string | null = null;
  loading = false;

  impactoOptions = [
    'Insignificante',
    'Baixo',
    'Médio',
    'Alto',
    'Catastrófico'
  ];

  frequenciaOptions = [
    'Improvável',
    'Remota',
    'Baixa',
    'Média',
    'Alta'
  ];
  constructor(
    public activeModal: NgbActiveModal,
    private criticidadeService: CriticidadeService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.criticidadeEdicao) {
      this.dadosForm = {
        ...this.criticidadeEdicao
      };
    }
  }

  private montarPayloadCalculo() {

    return {

      nivel: this.dadosForm.nivel,

      impactoProducao:
        this.dadosForm.impactoProducao,

      frequenciaImpactoProducao:
        this.dadosForm.frequenciaProducao,

      impactoSeguranca:
        this.dadosForm.impactoSeguranca,

      frequenciaImpactoSeguranca:
        this.dadosForm.frequenciaSeguranca,

      impactoAmbiental:
        this.dadosForm.impactoAmbiental,

      frequenciaImpactoAmbiental:
        this.dadosForm.frequenciaAmbiental,

      custoReparo:
        this.dadosForm.impactoCusto,

      frequenciaCustoReparo:
        this.dadosForm.frequenciaCusto,

      impactoFalha:
        this.dadosForm.impactoFalha,

      frequenciaFalha:
        this.dadosForm.frequenciaFalha
    };
  }

  calcularScoreTotal(): Promise<any> {

    return new Promise((resolve, reject) => {

      const payload = this.montarPayloadCalculo();

      this.criticidadeService
        .calculate(this.idEquipamento, payload)
        .subscribe({

          next: (response) => {
            resolve(response);
          },

          error: (err) => {
            reject(err);
          }
        });
    });
  }

  async salvar() {
    this.error = null;
    this.loading = true;

    try {
      const resultadoCalculo = await this.calcularScoreTotal();


      this.activeModal.close(resultadoCalculo);

      Swal.fire({
        icon: 'success',
        title: 'Sucesso!',
        text: 'Análise de criticidade registrada e calculada!',
        timer: 2000,
        showConfirmButton: false
      });

      this.loading = false;

    } catch (err: any) {
      console.error('Erro na operação:', err);
      this.loading = false;
      this.tratarErro(err);
      this.cdr.detectChanges();
    }
  }

  private tratarErro(err: any) {

    let backendMessage = '';

    if (err?.error) {

      try {

        const objetoJson =
          typeof err.error === 'string'
            ? JSON.parse(err.error)
            : err.error;

        backendMessage =
          objetoJson.message ||
          objetoJson.error ||
          '';

      } catch {

        backendMessage =
          typeof err.error === 'string'
            ? err.error
            : err.message;
      }
    }

    switch (err.status) {

      case 400:
        this.error =
          backendMessage ||
          'Verifique se todos os campos foram preenchidos.';
        break;

      case 403:
        this.error =
          'Sem permissão para salvar análises.';
        break;

      case 404:
        this.error =
          'Equipamento não encontrado.';
        break;

      case 0:
        this.error =
          'Servidor offline.';
        break;

      default:
        this.error =
          backendMessage ||
          `Erro inesperado (${err.status})`;
        break;
    }
  }
}