import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { EquipamentosCreate } from '../equipamento-create/equipamentos'; // Ajuste o path conforme seu projeto
import { EquipamentoService } from '../../services/equipamentos.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-equipamento-list',
  standalone: true,
  imports: [CardComponent, SharedModule, NgbModule],
  templateUrl: './equipamentos-list.html',
  styleUrl: './equipamentos-list.scss'
})
export class EquipamentoListComponent implements OnInit {
  carregando: boolean = false;
  termoPesquisa: string = '';

  dados: any[] = [];
  dadosFiltrados: any[] = [];
  itensSelecionados: any[] = [];

  constructor(
    private equipamentoService: EquipamentoService,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.carregarEquipamentos();
  }

  carregarEquipamentos() {
    this.carregando = true;
    this.equipamentoService.list().subscribe({
      next: (res) => {
        this.dados = res;
        this.filtrarEquipamentos();
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.carregando = false;
        console.error('Erro ao carregar equipamentos:', err);
        this.cdr.detectChanges();
      }
    });
  }

  filtrarEquipamentos() {
    const termo = this.termoPesquisa.toLowerCase();
    this.dadosFiltrados = this.dados.filter(e =>
      e.nome?.toLowerCase().includes(termo) ||
      e.codigo?.toLowerCase().includes(termo) ||
      e.fabricante?.toLowerCase().includes(termo) ||
      e.modelo?.toLowerCase().includes(termo) ||
      e.tipo?.toLowerCase().includes(termo)
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

  adicionarEquipamento() {
    const modalRef = this.modalService.open(EquipamentosCreate, { size: 'lg', backdrop: 'static' });
    modalRef.result.then((res) => {
      if (res) {
        this.carregarEquipamentos();
      }
    }).catch(() => { });
  }

  async editarEquipamento(equipamento: any) {
    const modalRef = this.modalService.open(EquipamentosCreate, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.equipamentoEdicao = { ...equipamento };

    try {
      const dadosEditados = await modalRef.result;
      if (dadosEditados) {
        await lastValueFrom(this.equipamentoService.update(dadosEditados.id, dadosEditados));
        this.carregarEquipamentos();
        Swal.fire('Sucesso!', 'Equipamento atualizado com sucesso.', 'success');
      }
    } catch (error) {
      if (error !== 0 && error !== 1 && error !== 'backdrop click' && error !== 'esc') {
        console.error('Erro ao salvar edição:', error);
      }
    }
  }

  confirmarExclusao() {
    if (this.itensSelecionados.length === 0) return;

    const qtd = this.itensSelecionados.length;
    Swal.fire({
      title: 'Tem certeza?',
      text: `Deseja excluir ${qtd === 1 ? 'este equipamento' : qtd + ' equipamentos'}?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.showLoading();
          const exclusoes = this.itensSelecionados.map(item =>
            lastValueFrom(this.equipamentoService.delete(item.id))
          );
          await Promise.all(exclusoes);
          Swal.fire('Excluído!', 'Equipamento(s) removido(s) com sucesso.', 'success');
          this.carregarEquipamentos();
          this.itensSelecionados = [];
        } catch (err) {
          Swal.fire('Erro!', 'Falha ao excluir.', 'error');
        }
      }
    });
  }

  estaSelecionado(item: any): boolean {
    return this.itensSelecionados.some(i => i.id === item.id);
  }
}