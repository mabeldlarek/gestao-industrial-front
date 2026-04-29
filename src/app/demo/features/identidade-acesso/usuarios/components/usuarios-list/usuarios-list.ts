import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { UsuarioCreate } from '../usuarios-create/usuarios-create';
import { UsuarioService } from '../../services/usuario.service';
import { finalize, lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CardComponent, SharedModule, NgbModule],
  templateUrl: './usuarios-list.html'
})
export class UsuarioListComponent implements OnInit {
  carregando: boolean = false;
  termoPesquisa: string = '';

  dados: any[] = [];
  dadosFiltrados: any[] = [];
  itensSelecionados: any[] = [];

  constructor(
    private userService: UsuarioService,
    private modalService: NgbModal,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.carregarUsuarios();
  }

  carregarUsuarios() {
    this.carregando = true;

    this.userService.list().subscribe({
      next: (res) => {
        this.dados = res;
        this.filtrarUsuarios();
        this.carregando = false;

        this.cdr.detectChanges();
      },
      error: (err) => {
        this.carregando = false;
        this.cdr.detectChanges();
        console.error('Erro:', err);
      }
    });
  }

  filtrarUsuarios() {
    const termo = this.termoPesquisa.toLowerCase();
    this.dadosFiltrados = this.dados.filter(u =>
      (u.nomeUsuario?.toLowerCase().includes(termo) || u.nome?.toLowerCase().includes(termo)) ||
      u.email?.toLowerCase().includes(termo)
    );
    this.itensSelecionados = [];
  }

  adicionarUsuario() {
    const modalRef = this.modalService.open(UsuarioCreate, { size: 'lg', backdrop: 'static' });
    modalRef.result.then((res) => {
      if (res) {
        this.carregarUsuarios();
      }
    }).catch(() => { });
  }

  selecionarItem(item: any) {
    const index = this.itensSelecionados.findIndex(i => i.id === item.id);
    if (index > -1) {
      this.itensSelecionados.splice(index, 1);
    } else {
      this.itensSelecionados.push(item);
    }
  }

  confirmarExclusao() {
    if (this.itensSelecionados.length === 0) {
      Swal.fire('Atenção', 'Selecione pelo menos um usuário.', 'info');
      return;
    }

    Swal.fire({
      title: 'Remover Acesso?',
      text: `Você está prestes a remover ${this.itensSelecionados.length} usuário(s).`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, remover',
      confirmButtonColor: '#d33',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          Swal.showLoading();

          const exclusoes = this.itensSelecionados.map(item =>
            lastValueFrom(this.userService.delete(item.id))
          );

          await Promise.all(exclusoes);

          Swal.fire('Removido!', 'Acessos revogados com sucesso.', 'success');
          this.carregarUsuarios();
          this.itensSelecionados = [];
        } catch (err) {
          console.error('Erro na exclusão:', err);
          Swal.fire('Erro!', 'Falha ao tentar excluir um ou mais usuários.', 'error');
        }
      }
    });
  }

  async editarUsuario(usuario: any) {
    const modalRef = this.modalService.open(UsuarioCreate, { size: 'lg', backdrop: 'static' });

    modalRef.componentInstance.usuarioEdicao = { ...usuario };

    try {
      const dadosEditados = await modalRef.result;

      if (dadosEditados) {
        await lastValueFrom(this.userService.update(dadosEditados.id, dadosEditados));

        this.carregarUsuarios();
        console.log('Usuário atualizado com sucesso!');
      }
    } catch (error) {
      if (error !== 0 && error !== 1 && error !== 'backdrop click' && error !== 'esc') {
        console.error('Erro ao salvar edição:', error);
      }
    }
  }
}