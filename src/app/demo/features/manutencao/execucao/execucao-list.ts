import { Component } from '@angular/core';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ExecucaoCreate } from './execucao-create';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-execucao-list',
  standalone: true,
  imports: [CardComponent, SharedModule, NgbModule, ExecucaoCreate],
  templateUrl: './execucao-list.html'
})
export class ExecucaoComponent {
  termoPesquisa: string = '';
  
  dados = [
    {
      ordemManutencaoID: "MA123456",
      executorID: "USR789",
      descricaoTrabalhoExecutado: "Substituição do rolamento e reaperto das conexões.",
      observacoesExecutor: "Necessário monitorar vibração nas próximas 72 horas.",
      statusExecucao: "RETOMADA",
      assinaturaDigital: "base64assinatura123",
      checklistItens: [
        { descricao: "Desligar equipamento", concluido: true },
        { descricao: "Bloquear alimentação elétrica", concluido: true },
        { descricao: "Verificar folgas mecânicas", concluido: false }
      ],
      fotosAntes: ["fotoAntes1.jpg", "fotoAntes2.jpg"],
      fotosDepois: ["fotoDepois1.jpg"]
    }
  ];

  dadosFiltrados = [...this.dados];
  itensSelecionados: any[] = [];

  constructor(private modalService: NgbModal) { }

  filtrarExecucoes() {
    const termo = this.termoPesquisa.toLowerCase();
    this.dadosFiltrados = this.dados.filter(item =>
      item.ordemManutencaoID.toLowerCase().includes(termo) ||
      item.executorID.toLowerCase().includes(termo)
    );
  }

  selecionarItem(item: any) {
    const index = this.itensSelecionados.findIndex(i => i.ordemManutencaoID === item.ordemManutencaoID);
    index > -1 ? this.itensSelecionados.splice(index, 1) : this.itensSelecionados.push(item);
  }

  estaSelecionado(item: any) { 
    return this.itensSelecionados.some(i => i.ordemManutencaoID === item.ordemManutencaoID); 
  }

  adicionarExecucao() {
    const modalRef = this.modalService.open(ExecucaoCreate, { size: 'lg', backdrop: 'static' });
    modalRef.result.then((res) => {
      if (res) {
        this.dados.push(res);
        this.filtrarExecucoes();
      }
    }).catch(() => {});
  }

  editarExecucao() {
    if (this.itensSelecionados.length !== 1) return;
    const modalRef = this.modalService.open(ExecucaoCreate, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.execucaoEdicao = JSON.parse(JSON.stringify(this.itensSelecionados[0]));
    
    modalRef.result.then((res) => {
      if (res) {
        const index = this.dados.findIndex(d => d.ordemManutencaoID === res.ordemManutencaoID);
        if (index !== -1) {
          this.dados[index] = res;
          this.filtrarExecucoes();
        }
      }
    }).catch(() => {});
  }

  confirmarExclusao() {
    if (this.itensSelecionados.length === 0) return;
    Swal.fire({
      title: 'Remover execução?',
      text: `Excluir ${this.itensSelecionados.length} registro(s)?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      confirmButtonText: 'Sim, excluir'
    }).then((result) => {
      if (result.isConfirmed) {
        const ids = this.itensSelecionados.map(i => i.ordemManutencaoID);
        this.dados = this.dados.filter(d => !ids.includes(d.ordemManutencaoID));
        this.itensSelecionados = [];
        this.filtrarExecucoes();
        Swal.fire('Excluído!', 'Registros removidos.', 'success');
      }
    });
  }
}