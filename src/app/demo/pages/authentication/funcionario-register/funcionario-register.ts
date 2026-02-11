import { Component } from '@angular/core';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-funcionario-register',
  imports: [SharedModule, NgSelectModule],
  templateUrl: './funcionario-register.html',
  styleUrl: './funcionario-register.scss',
})
export class FuncionarioRegister {
  especialidades = [
    { id: 1, nome: 'Cardiologia' },
    { id: 2, nome: 'Dermatologia' },
    { id: 3, nome: 'Ortopedia' }
  ];

  especialidadesSelecionadas: number[] = [];

  onSelectEspecialidades(event: Event) {
    const select = event.target as HTMLSelectElement;

    this.especialidadesSelecionadas = Array.from(select.selectedOptions)
      .map(option => Number(option.value));
  }

  removerEspecialidade(id: number) {
    this.especialidadesSelecionadas =
      this.especialidadesSelecionadas.filter(e => e !== id);
  }
}
