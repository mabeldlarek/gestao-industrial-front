import { Component } from '@angular/core';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NavSearchComponent } from "src/app/theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component";

@Component({
  selector: 'app-equipamentos',
  standalone: true,
  imports: [CardComponent, SharedModule, NavSearchComponent],
  templateUrl: './equipamentos-list.html',
  styleUrl: './equipamentos-list.scss',
})
export class EquipamentosComponent {

  dados = [
    {
      id: 1,
      codigo: "TESTE",
      nome: "Sensor de Vibração - Motor",
      descricao: "Sensor responsável por monitorar vibração do motor principal.",
      tipo: "Sensor",
      localizacao: "Planta Central - Sala 1",
      numeroSerie: "VIB-2025-9988",
      fabricante: "SKF",
      modelo: "CMPT-100",
      dataInstalacao: "2024-06-10T12:00:00Z",
      dataUltimaManutencao: "2025-02-05T14:00:00Z",
      statusOperacional: "Operacional",
      criticidadeID: "",
      parametrosOperacionais: {
        faixaHz: "10-1000",
        vibracaoMax_mm_s: 4.5
      },
      medidorIds: [],
      documentosAnexados: [
        "manual-sensor-vibracao.pdf"
      ],
      imagemURL: "https://exemplo.com/imagens/vibracao01.png",
      parentID: null
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

  desabilitarEdicao(): boolean {
    return this.itensSelecionados.length !== 1;
  }

}