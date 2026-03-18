import { Component, OnInit } from '@angular/core';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import Swal from 'sweetalert2';
import { FuncionarioCreate } from '../formulario/funcionario-create';

@Component({
  selector: 'app-funcionario-list',
  standalone: true,
  imports: [CardComponent, SharedModule, NgbModule],
  templateUrl: './funcionarios-list.html',
  styleUrl: './funcionarios-list.scss'
})
export class FuncionarioListComponent implements OnInit {

  termoPesquisa: string = '';
  
  // Dados simulando o retorno do seu POST/GET
  dados = [
    {
      id: 1,
      matricula: "FUNC1234",
      nome: "Maria Oliveira Mongo",
      cargo: "Técnica de Manutenção",
      equipe: "Equipe A",
      especialidades: ["Elétrica", "Hidráulica"],
      disponibilidade: {
        diasSemana: ["SEGUNDA", "TERÇA", "QUARTA"],
        turnos: ["MANHA", "TARDE"]
      },
      status: "ATIVO"
    },
    {
      id: 2,
      matricula: "FUNC5566",
      nome: "João Silva Santos",
      cargo: "Mecânico Industrial",
      equipe: "Equipe B",
      especialidades: ["Mecânica", "Solda"],
      disponibilidade: {
        diasSemana: ["QUINTA", "SEXTA"],
        turnos: ["NOITE"]
      },
      status: "ATIVO"
    }
  ];

  dadosFiltrados = [];
  itensSelecionados: any[] = [];

  constructor(private modalService: NgbModal) { }

  ngOnInit() {
    this.dadosFiltrados = [...this.dados];
  }

  filtrarFuncionarios() {
    const termo = this.termoPesquisa.toLowerCase();
    this.dadosFiltrados = this.dados.filter(item => 
      item.nome.toLowerCase().includes(termo) ||
      item.matricula.toLowerCase().includes(termo) ||
      item.cargo.toLowerCase().includes(termo) ||
      item.equipe.toLowerCase().includes(termo)
    );
    this.itensSelecionados = [];
  }

  selecionarItem(item: any) {
    const index = this.itensSelecionados.findIndex(i => i.id === item.id);
    if (index > -1) {
      this.itensSelecionados.splice(index, 1);
    } else {
      this.itensSelecionados.push(item);
    }
  }

  estaSelecionado(item: any): boolean {
    return this.itensSelecionados.some(i => i.id === item.id);
  }

  adicionarFuncionario() {
    const modalRef = this.modalService.open(FuncionarioCreate, {
      size: 'lg',
      backdrop: 'static'
    });

    modalRef.result.then((result) => {
      if (result) {
        // Lógica para adicionar (id simulado)
        result.id = Math.floor(Math.random() * 1000);
        this.dados.push(result);
        this.filtrarFuncionarios();
      }
    }).catch(() => {});
  }

  editarFuncionario() {
    if (this.itensSelecionados.length !== 1) return;

    const modalRef = this.modalService.open(FuncionarioCreate, {
      size: 'lg',
      backdrop: 'static'
    });

    modalRef.componentInstance.funcionarioEdicao = { ...this.itensSelecionados[0] };

    modalRef.result.then((result) => {
      if (result) {
        const index = this.dados.findIndex(d => d.id === result.id);
        if (index !== -1) {
          this.dados[index] = result;
          this.filtrarFuncionarios();
        }
      }
    }).catch(() => {});
  }

  confirmarExclusao() {
    const qtd = this.itensSelecionados.length;
    Swal.fire({
      title: 'Tem certeza?',
      text: `Deseja excluir ${qtd === 1 ? 'este funcionário' : qtd + ' funcionários'}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        const ids = this.itensSelecionados.map(i => i.id);
        this.dados = this.dados.filter(d => !ids.includes(d.id));
        this.filtrarFuncionarios();
        Swal.fire('Excluído!', 'Registro removido com sucesso.', 'success');
      }
    });
  }
}