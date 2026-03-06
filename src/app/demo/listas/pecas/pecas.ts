import { Component } from '@angular/core';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NavSearchComponent } from "src/app/theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component";
import { email } from '@angular/forms/signals';

@Component({
  selector: 'app-pecas',
  imports: [CardComponent, SharedModule, NavSearchComponent],
  templateUrl: './pecas.html',
  styleUrl: './pecas.scss',
})

export class PecasComponent {
  dados = [
    {
      codigoPeca: 'P001',
      nome: 'Parafuso Sextavado',
      custoUnitario: 1.50,
      estoqueAtual: 500,
      estoqueMinimo: 100,
      localizacao: 'A1-01',
      unidadeMedida: 'UN'
    },
    {
      codigoPeca: 'P002',
      nome: 'Porca Zincada',
      custoUnitario: 0.80,
      estoqueAtual: 300,
      estoqueMinimo: 50,
      localizacao: 'A1-02',
      unidadeMedida: 'UN'
    },
    {
      codigoPeca: 'P003',
      nome: 'Arruela Lisa',
      custoUnitario: 0.30,
      estoqueAtual: 1000,
      estoqueMinimo: 200,
      localizacao: 'B2-03',
      unidadeMedida: 'UN'
    }
  ];
  itensSelecionados: any[] = [];

  estaSelecionado(item: any): boolean {
    return this.itensSelecionados.some(i => i.id === item.id);
  }

  selecionarItem(item: any) {
    const index = this.itensSelecionados.findIndex(i => i.id === item.id);

    if (index > -1) {
      this.itensSelecionados.splice(index, 1);
    } else {
      this.itensSelecionados.push(item);
    }
  }

  desabilitarEdicao() {
    return this.itensSelecionados.length! > 1;
  }

}
