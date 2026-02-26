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
    { id: 1, firstName: 'Mark', lastName: 'Otto', username: '@mdo' },
    { id: 2, firstName: 'Jacob', lastName: 'Thornton', username: '@fat' },
    { id: 3, firstName: 'Larry', lastName: 'Bird', username: '@twitter' }
  ];

  selecionados: any[] = [];
  todosSelecionados = false;

  selecionar(item: any, event: any) {
    if (event.target.checked) {
      this.selecionados.push(item);
    } else {
      this.selecionados = this.selecionados.filter(i => i !== item);
    }

    this.todosSelecionados = this.selecionados.length === this.dados.length;
  }

  selecionarTodos(event: any) {
    if (event.target.checked) {
      this.selecionados = [...this.dados];
      this.todosSelecionados = true;
    } else {
      this.selecionados = [];
      this.todosSelecionados = false;
    }
  }

  excluirSelecionados() {
    this.dados = this.dados.filter(item => !this.selecionados.includes(item));
    this.selecionados = [];
    this.todosSelecionados = false;
  }

  adicionar() {
    console.log('Ação de adicionar novo registro');
  }

  
}
