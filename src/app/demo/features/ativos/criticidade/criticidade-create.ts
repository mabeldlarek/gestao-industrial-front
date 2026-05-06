import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CriticidadeService } from './criticidade.service';
import Swal from 'sweetalert2';

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

  dadosForm: any = {
    id: null,
    equipamentoID: '',
    impactoProducao: null,
    frequenciaProducao: null,
    impactoSeguranca: null,
    frequenciaSeguranca: null,
    impactoAmbiental: null,
    frequenciaAmbiental: null,
    impactoCusto: null,
    frequenciaCusto: null,
    impactoFalha: null,
    frequenciaFalha: null,
    dataAnalise: new Date().toISOString(),
    resultadoFinal: ''
  };

  error: string | null = null;
  
  impactoOptions = ['INSIGNIFICANTE', 'BAIXO', 'MEDIO', 'ALTO', 'CATASTROFICO'];
  frequenciaOptions = ['IMPROVAVEL', 'REMOTA', 'BAIXA', 'MEDIA', 'ALTA'];

  constructor(
    public activeModal: NgbActiveModal,
    private criticidadeService: CriticidadeService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    if (this.criticidadeEdicao) {
      this.dadosForm = JSON.parse(JSON.stringify(this.criticidadeEdicao));
    }
  }

  calcularScoreTotal(): string {
    const pesosImpacto: any = { 'INSIGNIFICANTE': 1, 'BAIXO': 2, 'MEDIO': 3, 'ALTO': 4, 'CATASTROFICO': 5 };
    const pesosFrequencia: any = { 'IMPROVAVEL': 1, 'REMOTA': 2, 'BAIXA': 3, 'MEDIA': 4, 'ALTA': 5 };

  
    const score = pesosImpacto[this.dadosForm.impactoProducao || 'BAIXO'] + 
                  pesosFrequencia[this.dadosForm.frequenciaProducao || 'REMOTA'];

    if (score >= 8) return 'CRÍTICO';
    if (score >= 5) return 'MÉDIO';
    return 'BAIXO';
  }

  salvar() {
    this.error = null;
    
    this.dadosForm.resultadoFinal = this.calcularScoreTotal();

    const operacaoObs = this.dadosForm.id
      ? this.criticidadeService.update(this.dadosForm.id, this.dadosForm)
      : this.criticidadeService.create(this.dadosForm);

    operacaoObs.subscribe({
      next: (response: any) => {
        const resultado = response?.body || this.dadosForm;
        
        this.activeModal.close(resultado);

        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: this.dadosForm.id ? 'Análise de criticidade atualizada!' : 'Análise de criticidade registrada!',
          timer: 2000,
          showConfirmButton: false
        });
      },
      error: (err) => {
        console.error('Erro na análise:', err);
        this.tratarErro(err);
        this.cdr.detectChanges();
      }
    });
  }

  private tratarErro(err: any) {
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
      case 400:
        this.error = backendMessage || 'Verifique se todos os campos de impacto e frequência foram preenchidos.';
        break;
      case 403:
        this.error = 'Sem permissão para salvar análises.';
        break;
      case 0:
        this.error = 'Servidor offline.';
        break;
      default:
        this.error = backendMessage || `Erro inesperado (${err.status})`;
        break;
    }
  }
}