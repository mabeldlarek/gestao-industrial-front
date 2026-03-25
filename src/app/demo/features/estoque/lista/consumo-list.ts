import { Component } from '@angular/core';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { ConsumoCreate } from '../formulario/consumo-create'; // Certifique-se de que o nome do arquivo bate
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consumo',
  standalone: true,
  imports: [CardComponent, SharedModule, NgbModule],
  templateUrl: './consumo-list.html',
  styleUrl: './consumo-list.scss',
})
export class ConsumoComponent {
  termoPesquisa: string = '';

  dados = [
    {
      id: "cb7c17f5-bec2-40b6-91c4-8d5ad50795dc",
      ordemManutencaoID: "55aeb144-0b8b-4d55-9375-05e4b8b3a7f3",
      pecaID: "d5e67b71-04e9-4f33-934e-7c7be6742e4a",
      quantidade: 2.0,
      dataConsumo: "2025-08-06",
      custoTotalConsumo: 361.50
    },
    {
      id: "ae8d12f5-c935-42b1-8e61-a1b957a35c12",
      ordemManutencaoID: "77bfc255-1c9c-5e66-8486-16f5c9c4b8g4",
      pecaID: "f9g87h82-15f0-5g44-845f-8d8cf7853f5b",
      quantidade: 5.0,
      dataConsumo: "2025-09-12",
      custoTotalConsumo: 1250.00
    }
  ];

  dadosFiltrados = [...this.dados];
  itensSelecionados: any[] = [];

  constructor(private modalService: NgbModal) { }

  filtrarConsumos() {
    const termo = this.termoPesquisa.toLowerCase();

    this.dadosFiltrados = this.dados.filter(item => {
      return (
        item.pecaID?.toLowerCase().includes(termo) ||
        item.ordemManutencaoID?.toLowerCase().includes(termo) ||
        item.dataConsumo?.includes(termo)
      );
    });

    this.itensSelecionados = [];
  }

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

  adicionarConsumo() {
    const modalRef = this.modalService.open(ConsumoCreate, {
      size: 'lg',
      backdrop: 'static'
    });

    modalRef.result.then((resultado) => {
      if (resultado) {
        this.dados.push(resultado);
        this.filtrarConsumos();
      }
    }).catch(() => { });
  }

  editarConsumo() {
    if (this.itensSelecionados.length !== 1) return;

    const itemParaEditar = this.itensSelecionados[0];
    const modalRef = this.modalService.open(ConsumoCreate, {
      size: 'lg',
      backdrop: 'static'
    });

    // Certifique-se de que o @Input no Create se chama 'consumoEdicao'
    modalRef.componentInstance.consumoEdicao = { ...itemParaEditar };

    modalRef.result.then((resultado) => {
      if (resultado) {
        const index = this.dados.findIndex(d => d.id === resultado.id);
        if (index !== -1) {
          this.dados[index] = resultado;
          this.filtrarConsumos();
        }
      }
    }).catch(() => { });
  }

  confirmarExclusao() {
    if (!this.itensSelecionados.length) return;

    Swal.fire({
      title: 'Remover consumo?',
      text: 'Esta ação não poderá ser desfeita!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sim, remover',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        const ids = this.itensSelecionados.map(i => i.id);
        this.dados = this.dados.filter(item => !ids.includes(item.id));
        this.itensSelecionados = [];
        this.filtrarConsumos();
        Swal.fire('Removido!', 'O registro foi excluído.', 'success');
      }
    });
  }
}