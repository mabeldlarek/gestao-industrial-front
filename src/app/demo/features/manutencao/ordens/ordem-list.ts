import { Component } from '@angular/core';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrdemManutencaoCreate } from 'src/app/demo/features/manutencao/ordens/ordem-create';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ordem-manutencao',
  standalone: true,
  imports: [CardComponent, SharedModule, NgbModule],
  templateUrl: './ordem-list.html'
})
export class OrdemManutencaoComponent {
  termoPesquisa: string = '';
  dados = [
    {
      numeroOS: "OM-0002",
      equipamentoID: "EQP-123",
      tipoManutencao: "PREVENTIVA",
      status: "CONCLUIDA",
      prioridade: "MEDIA",
      dataAbertura: "2025-01-25T08:00:00.000Z",
      descricaoProblema: "Lubrificação preventiva conforme plano."
    }
  ];
  dadosFiltrados = [...this.dados];
  itensSelecionados: any[] = [];

  constructor(private modalService: NgbModal) { }

  filtrarOMs() {
    const termo = this.termoPesquisa.toLowerCase();
    this.dadosFiltrados = this.dados.filter(item => 
      item.numeroOS.toLowerCase().includes(termo) || 
      item.equipamentoID.toLowerCase().includes(termo)
    );
  }

  selecionarItem(item: any) {
    const index = this.itensSelecionados.findIndex(i => i.numeroOS === item.numeroOS);
    index > -1 ? this.itensSelecionados.splice(index, 1) : this.itensSelecionados.push(item);
  }

  estaSelecionado(item: any) { return this.itensSelecionados.some(i => i.numeroOS === item.numeroOS); }

  adicionarOM() {
    const modalRef = this.modalService.open(OrdemManutencaoCreate, { size: 'lg', backdrop: 'static' });
    modalRef.result.then((res) => { if(res) { this.dados.push(res); this.filtrarOMs(); }});
  }

  editarOM() {
    const modalRef = this.modalService.open(OrdemManutencaoCreate, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.omEdicao = { ...this.itensSelecionados[0] };
    modalRef.result.then((res) => { /* Lógica de atualização */ });
  }

  confirmarExclusao() { /* Lógica Swal */ }
}