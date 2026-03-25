import { Component, OnInit } from '@angular/core';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { UsuarioCreate } from '../formulario/usuarios-create';

@Component({
  selector: 'app-usuario-list',
  standalone: true,
  imports: [CardComponent, SharedModule, NgbModule],
  templateUrl: './usuarios-list.html'
})
export class UsuarioListComponent implements OnInit {

  termoPesquisa: string = '';
  dados = [
    { id: 1, nomeUsuario: "Teste Admin", email: "admin@manutencao.com", ativo: true, tipoUsuario: "ADMIN" },
    { id: 2, nomeUsuario: "João Técnico", email: "joao@manutencao.com", ativo: true, tipoUsuario: "TECNICO" },
    { id: 3, nomeUsuario: "Visitante", email: "user@manutencao.com", ativo: false, tipoUsuario: "USER" }
  ];

  dadosFiltrados = [];
  itensSelecionados: any[] = [];

  constructor(private modalService: NgbModal) { }

  ngOnInit() { this.filtrarUsuarios(); }

  filtrarUsuarios() {
    const termo = this.termoPesquisa.toLowerCase();
    this.dadosFiltrados = this.dados.filter(u => 
      u.nomeUsuario.toLowerCase().includes(termo) || u.email.toLowerCase().includes(termo)
    );
    this.itensSelecionados = [];
  }

  selecionarItem(item: any) {
    const index = this.itensSelecionados.findIndex(i => i.id === item.id);
    index > -1 ? this.itensSelecionados.splice(index, 1) : this.itensSelecionados.push(item);
  }

  adicionarUsuario() {
    const modalRef = this.modalService.open(UsuarioCreate, { size: 'lg', backdrop: 'static' });
    modalRef.result.then((res) => { if(res) { this.dados.push(res); this.filtrarUsuarios(); } }).catch(() => {});
  }

  confirmarExclusao() {
    Swal.fire({
      title: 'Remover Acesso?',
      text: "O usuário perderá o acesso imediato ao sistema.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sim, remover',
      confirmButtonColor: '#d33'
    }).then((result) => {
      if (result.isConfirmed) {
        const ids = this.itensSelecionados.map(i => i.id);
        this.dados = this.dados.filter(d => !ids.includes(d.id));
        this.filtrarUsuarios();
        Swal.fire('Removido!', 'Acessos revogados.', 'success');
      }
    });
  }
}