import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-consumo-create',
  standalone: true,
  imports: [CardComponent, SharedModule],
  templateUrl: './consumo-create.html',
})
export class ConsumoCreate implements OnInit {

  @Input() consumoEdicao: any;

  dadosForm: any = {
    id: null,
    ordemManutencaoID: '',
    pecaID: '',
    quantidade: 1,
    dataConsumo: new Date().toISOString().substring(0, 10), // Padrão: hoje
    custoTotalConsumo: 0
  };

  constructor(public activeModal: NgbActiveModal) { }

  ngOnInit() {
    if (this.consumoEdicao) {
      this.dadosForm = JSON.parse(JSON.stringify(this.consumoEdicao));
    }
  }

  salvar() {
    // Aqui você pode adicionar lógica para calcular o custo total antes de fechar, 
    // se tiver o custo unitário da peça disponível.
    this.activeModal.close(this.dadosForm);
  }
}