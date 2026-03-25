import { Component } from '@angular/core';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PlanosCreate } from 'src/app/demo/features/manutencao/planos/planos-create';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-planos',
  standalone: true,
  imports: [CardComponent, SharedModule, NgbModule],
  templateUrl: './planos-list.html',
  styleUrl: './planos-list.scss',
})
export class PlanosComponent {
  termoPesquisa: string = '';

  // Mock de dados seguindo a estrutura do formulário
  dados = [
    {
      id: "p1-uuid",
      codigo: "PLN-MOTOR-01",
      nome: "Preventiva Mensal Motores WEG",
      equipamentoID: "eq-123",
      equipamentoNome: "Motor Principal Esteira 01", // Nome amigável para a lista
      procedimentoID: "proc-024",
      tipoManutencao: 'PREVENTIVA',
      status: 'ATIVO',
      tipoFrequencia: 'TEMPO',
      valorFrequencia: 1,
      unidadeFrequencia: 'MES',
      gerarOMAuto: true,
      dataGeracaoAuto: '2025-04-10T08:00:00.000Z'
    },
    {
      id: "p2-uuid",
      codigo: "PLN-BOMBA-02",
      nome: "Inspeção Semestral Bombas",
      equipamentoID: "eq-456",
      equipamentoNome: "Bomba Hidráulica Setor B",
      procedimentoID: "proc-112",
      tipoManutencao: 'PREVENTIVA',
      status: 'INATIVO',
      tipoFrequencia: 'TEMPO',
      valorFrequencia: 6,
      unidadeFrequencia: 'MES',
      gerarOMAuto: false,
      dataGeracaoAuto: '2025-06-15T14:00:00.000Z'
    }
  ];

  dadosFiltrados = [...this.dados];
  itensSelecionados: any[] = [];

  constructor(private modalService: NgbModal) { }

  filtrarPlanos() {
    const termo = this.termoPesquisa.toLowerCase();

    this.dadosFiltrados = this.dados.filter(item => {
      return (
        item.nome?.toLowerCase().includes(termo) ||
        item.codigo?.toLowerCase().includes(termo) ||
        item.equipamentoNome?.toLowerCase().includes(termo)
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

  adicionarPlano() {
    const modalRef = this.modalService.open(PlanosCreate, {
      size: 'lg',
      backdrop: 'static'
    });

    modalRef.result.then((novoPlano) => {
      if (novoPlano) {
        // Em um cenário real, o ID viria do backend
        novoPlano.id = Math.random().toString(36).substr(2, 9);
        this.dados.push(novoPlano);
        this.filtrarPlanos();
      }
    }).catch(() => { });
  }

  editarPlano() {
    if (this.itensSelecionados.length !== 1) return;

    const itemParaEditar = this.itensSelecionados[0];
    const modalRef = this.modalService.open(PlanosCreate, {
      size: 'lg',
      backdrop: 'static'
    });

    // Passando os dados para o @Input do componente de formulário
    modalRef.componentInstance.planoEdicao = { ...itemParaEditar };

    modalRef.result.then((resultado) => {
      if (resultado) {
        const index = this.dados.findIndex(d => d.id === resultado.id);
        if (index !== -1) {
          this.dados[index] = resultado;
          this.filtrarPlanos();
        }
      }
    }).catch(() => { });
  }

  confirmarExclusao() {
    if (!this.itensSelecionados.length) return;

    Swal.fire({
      title: 'Remover Plano?',
      text: 'Isso interromperá a geração automática de OMs para este plano.',
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
        this.filtrarPlanos();
        Swal.fire('Sucesso', 'Plano removido.', 'success');
      }
    });
  }
}