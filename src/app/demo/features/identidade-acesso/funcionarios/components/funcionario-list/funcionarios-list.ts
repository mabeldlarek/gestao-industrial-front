import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FuncionarioCreate } from '../funcionario-create/funcionario-create';
import { FuncionarioService } from '../../services/funcionario.service';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-funcionario-list',
  standalone: true,
  imports: [CardComponent, SharedModule, NgbModule],
  templateUrl: './funcionarios-list.html',
  styleUrl: './funcionarios-list.scss'
})
export class FuncionarioListComponent implements OnInit {
  carregando: boolean = false;
  termoPesquisa: string = '';

  dados: any[] = [];
  dadosFiltrados: any[] = [];
  itensSelecionados: any[] = [];

  constructor(
    private funcionarioService: FuncionarioService,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.carregarFuncionarios();
  }

  carregarFuncionarios() {
    this.carregando = true;

    this.funcionarioService.list().subscribe({
      next: (res) => {
        this.dados = res;
        this.filtrarFuncionarios();
        this.carregando = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.carregando = false;
        console.error('Erro ao carregar funcionários:', err);
        this.cdr.detectChanges();
      }
    });
  }

  filtrarFuncionarios() {
    const termo = this.termoPesquisa.toLowerCase();
    this.dadosFiltrados = this.dados.filter(f =>
      f.nome?.toLowerCase().includes(termo) ||
      f.matricula?.toLowerCase().includes(termo) ||
      f.cargo?.toLowerCase().includes(termo) ||
      f.equipe?.toLowerCase().includes(termo)
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

  adicionarFuncionario() {
    const modalRef = this.modalService.open(FuncionarioCreate, { size: 'lg', backdrop: 'static' });
    modalRef.result.then((res) => {
      if (res) {
        this.carregarFuncionarios();
      }
    }).catch(() => { });
  }

  async editarFuncionario(funcionario: any) {
    const modalRef = this.modalService.open(FuncionarioCreate, { size: 'lg', backdrop: 'static' });

    // Passa uma cópia para o modal
    modalRef.componentInstance.funcionarioEdicao = { ...funcionario };

    try {
      const dadosEditados = await modalRef.result;

      if (dadosEditados) {
        await lastValueFrom(this.funcionarioService.update(dadosEditados.id, dadosEditados));

        this.carregarFuncionarios();
        Swal.fire('Sucesso!', 'Funcionário atualizado com sucesso.', 'success');
      }
    } catch (error) {
      if (error !== 0 && error !== 1 && error !== 'backdrop click' && error !== 'esc') {
        console.error('Erro ao salvar edição:', error);
      }
    }
  }

  confirmarExclusao() {
    if (this.itensSelecionados.length === 0) {
      Swal.fire('Atenção', 'Selecione pelo menos um funcionário.', 'info');
      return;
    }

    const qtd = this.itensSelecionados.length;

    Swal.fire({
      title: 'Tem certeza?',
      text: `Deseja excluir ${qtd === 1 ? 'este funcionário' : qtd + ' funcionários'}?`,
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
            lastValueFrom(this.funcionarioService.delete(item.id))
          );

          await Promise.all(exclusoes);

          Swal.fire('Excluído!', 'Registro(s) removido(s) com sucesso.', 'success');
          this.carregarFuncionarios();
          this.itensSelecionados = [];
        } catch (err) {
          console.error('Erro na exclusão:', err);
          Swal.fire('Erro!', 'Falha ao tentar excluir um ou mais funcionários.', 'error');
        }
      }
    });
  }

  estaSelecionado(item: any): boolean {
    return this.itensSelecionados.some(i => i.id === item.id);
  }
}