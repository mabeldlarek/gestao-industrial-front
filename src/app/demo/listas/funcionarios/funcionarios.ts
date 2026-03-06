import { Component } from '@angular/core';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NavSearchComponent } from "src/app/theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component";

@Component({
  selector: 'app-funcionarios',
  imports: [CardComponent, SharedModule, NavSearchComponent],
  templateUrl: './funcionarios.html',
  styleUrl: './funcionarios.scss',
})

export class FuncionariosComponent {
  dados = [
    {
      id: 1,
      nome: 'Maria Silva',
      matricula: '2023001',
      cargo: 'Analista',
      equipe: 'TI',
      status: 'Ativo'
    },
    {
      id: 2,
      nome: 'João Pereira',
      matricula: '2023002',
      cargo: 'Desenvolvedor',
      equipe: 'Sistemas',
      status: 'Ativo'
    },
    {
      id: 3,
      nome: 'Ana Souza',
      matricula: '2023003',
      cargo: 'Gerente',
      equipe: 'Projetos',
      status: 'Inativo'
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
