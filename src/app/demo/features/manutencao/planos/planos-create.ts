import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-planos-create',
  standalone: true,
  imports: [CardComponent, SharedModule, NgbModule],
  templateUrl: './planos-create.html',
  styleUrl: './planos-create.scss'
})
export class PlanosCreate implements OnInit {

  @Input() planoEdicao: any;

  // Estrutura de dados conforme o formulário de planos
  dadosForm: any = {
    id: null,
    codigo: '',
    nome: '',
    equipamentoID: null,
    procedimentoID: null,
    tipoManutencao: 'PREVENTIVA',
    status: 'ATIVO',
    tipoFrequencia: 'TEMPO',
    valorFrequencia: 1,
    unidadeFrequencia: 'MES',
    gerarOMAuto: false,
    gerarOMAutoMedidor: false,
    dataCriacao: new Date().toISOString(),
    dataGeracaoAuto: '',
    codigoMedidor: ''
  };

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    if (this.planoEdicao) {
      // Clonagem profunda para desvincular da lista principal
      this.dadosForm = JSON.parse(JSON.stringify(this.planoEdicao));
      
      // Ajuste de data para o formato aceito pelo input datetime-local
      if (this.dadosForm.dataGeracaoAuto) {
        this.dadosForm.dataGeracaoAuto = this.dadosForm.dataGeracaoAuto.substring(0, 16);
      }
    }
  }

  salvar() {
    // Retorna o objeto preenchido para o componente de listagem
    this.activeModal.close(this.dadosForm);
  }
}