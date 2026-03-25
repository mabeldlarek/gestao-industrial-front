import { Component } from '@angular/core';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PecasCreate } from '../formulario/pecas-create';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pecas',
  standalone: true,
  imports: [CardComponent, SharedModule, NgbModule],
  templateUrl: './pecas-list.html',
  styleUrl: './pecas-list.scss',
})
export class PecasComponent {
  termoPesquisa: string = '';

  dados = [
    {
      id: "b0e5120a-b935-4b5a-8e61-d8f957a35b73",
      codigoPeca: "PEC-001",
      nome: "Rolamento 6203",
      descricao: "Rolamento de esferas para motor elétrico",
      fabricante: "SKF",
      numeroCatalogo: "6203-ZZ",
      custoUnitario: 25.75,
      estoqueAtual: 100.0,
      estoqueMinimo: 10.0,
      localizacaoAlmoxarifado: "Estante A2, Prateleira 3",
      unidadeMedida: "un"
    },
    {
      id: "c1f6231b-a123-4c6b-9f72-e9f957a35b84",
      codigoPeca: "PEC-042",
      nome: "Selo Mecânico 25mm",
      descricao: "Selo para bombas de recalque",
      fabricante: "Grundfos",
      numeroCatalogo: "GR-9922",
      custoUnitario: 145.00,
      estoqueAtual: 5.0,
      estoqueMinimo: 8.0,
      localizacaoAlmoxarifado: "Gaveteiro B1",
      unidadeMedida: "un"
    }
  ];

  dadosFiltrados = [...this.dados];
  itensSelecionados: any[] = [];

  constructor(private modalService: NgbModal) { }

  filtrarPecas() {
    const termo = this.termoPesquisa.toLowerCase();

    this.dadosFiltrados = this.dados.filter(item => {
      return (
        item.nome?.toLowerCase().includes(termo) ||
        item.codigoPeca?.toLowerCase().includes(termo) ||
        item.fabricante?.toLowerCase().includes(termo) ||
        item.numeroCatalogo?.toLowerCase().includes(termo) ||
        item.localizacaoAlmoxarifado?.toLowerCase().includes(termo)
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

  adicionarPeca() {
    const modalRef = this.modalService.open(PecasCreate, {
      size: 'lg',
      backdrop: 'static'
    });

    modalRef.result.then((novaPeca) => {
      if (novaPeca) {
        this.dados.push(novaPeca);
        this.filtrarPecas();
      }
    }).catch(() => { });
  }

  editarPeca() {
    if (this.itensSelecionados.length !== 1) return;

    const itemParaEditar = this.itensSelecionados[0];
    const modalRef = this.modalService.open(PecasCreate, {
      size: 'lg',
      backdrop: 'static'
    });

    // ALTERAÇÃO AQUI: mude de peçaEdicao para pecaEdicao
    modalRef.componentInstance.pecaEdicao = { ...itemParaEditar };

    modalRef.result.then((resultado) => {
      if (resultado) {
        const index = this.dados.findIndex(d => d.id === resultado.id);
        if (index !== -1) {
          this.dados[index] = resultado;
          this.filtrarPecas();
        }
      }
    }).catch(() => { });
  }

  confirmarExclusao() {
    if (!this.itensSelecionados.length) return;

    const mensagem = this.itensSelecionados.length === 1
      ? `Excluir a peça ${this.itensSelecionados[0].nome}?`
      : `Excluir ${this.itensSelecionados.length} peças selecionadas?`;

    Swal.fire({
      title: 'Atenção!',
      text: mensagem,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33'
    }).then(result => {
      if (result.isConfirmed) {
        const ids = this.itensSelecionados.map(i => i.id);
        this.dados = this.dados.filter(item => !ids.includes(item.id));
        this.itensSelecionados = [];
        this.filtrarPecas();
        Swal.fire('Sucesso', 'Itens removidos do inventário', 'success');
      }
    });
  }
}