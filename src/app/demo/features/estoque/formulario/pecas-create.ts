import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-pecas-create',
  standalone: true,
  imports: [CardComponent, SharedModule],
  templateUrl: './pecas-create.html',
  styleUrl: './pecas-create.scss',
})
export class PecasCreate implements OnInit {
  @Input() pecaEdicao: any;

  dadosForm: any = {
    id: null,
    codigoPeca: '',
    nome: '',
    descricao: '',
    fabricante: '',
    numeroCatalogo: '',
    custoUnitario: 0,
    estoqueAtual: 0,
    estoqueMinimo: 0,
    localizacaoAlmoxarifado: '',
    unidadeMedida: ''
  };

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit() {
    if (this.pecaEdicao) {
      // Clonagem profunda para evitar alteração por referência na lista
      this.dadosForm = JSON.parse(JSON.stringify(this.pecaEdicao));
    }
  }

  salvar() {
    this.activeModal.close(this.dadosForm);
  }
}