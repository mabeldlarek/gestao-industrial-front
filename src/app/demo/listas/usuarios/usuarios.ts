import { Component } from '@angular/core';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NavSearchComponent } from "src/app/theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component";
import { email } from '@angular/forms/signals';

@Component({
  selector: 'app-usuarios',
  imports: [CardComponent, SharedModule, NavSearchComponent],
  templateUrl: './usuarios.html',
  styleUrl: './usuarios.scss',
})

export class UsuariosComponent {
  dados = [
    {
      nome:'Maria Silva',
      email: 'maria.silva@empresa.com',
      tipoUsuario: 'Administrador',
      ativo: 'TRUE',
    },
    {
      nome:'João Pereira',
      email: 'joao.pereira@empresa.com',
      tipoUsuario: 'Básico',
      ativo: 'TRUE',
    },
    {
      nome:'Ana Souza' ,
      email: 'ana.souza@empresa.com',
      tipoUsuario: 'Administrador',
      ativo: 'TRUE',
    }
  ];
itensSelecionados: any[] = [];

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

desabilitarEdicao(){
  return this.itensSelecionados.length !> 1;
}
  
}
