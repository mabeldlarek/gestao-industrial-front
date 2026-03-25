import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ordem-manutencao-create',
  standalone: true,
  imports: [CardComponent, SharedModule, NgbModule],
  templateUrl: './ordem-create.html',
})
export class OrdemManutencaoCreate implements OnInit {
  @Input() omEdicao: any;

  // Inicialização com todos os campos do seu JSON
  dadosForm: any = {
    id: null,
    numeroOS: '',
    equipamentoID: '',
    planoManutencaoID: '',
    procedimentoID: '',
    descricaoProblema: '',
    tipoManutencao: 'PREVENTIVA',
    status: 'ABERTA',
    prioridade: 'MEDIA',
    dataAbertura: new Date().toISOString().substring(0, 16),
    dataFechamento: null,
    solicitanteID: '',
    responsavelID: '',
    observacoes: '',
    custoEstimado: 0,
    custoReal: null,
    tempoParadaEstimado: 0,
    tempoParadaReal: null,
    modoFalhaID: '',
    causaRaizID: ''
  };

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    if (this.omEdicao) {
      this.dadosForm = JSON.parse(JSON.stringify(this.omEdicao));
      
      // Formatação de datas para os inputs datetime-local
      if (this.dadosForm.dataAbertura) {
        this.dadosForm.dataAbertura = this.dadosForm.dataAbertura.substring(0, 16);
      }
      if (this.dadosForm.dataFechamento) {
        this.dadosForm.dataFechamento = this.dadosForm.dataFechamento.substring(0, 16);
      }
    }
  }

  salvar() {
    this.activeModal.close(this.dadosForm);
  }
}