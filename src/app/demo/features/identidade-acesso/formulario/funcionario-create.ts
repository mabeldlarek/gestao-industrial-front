import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

@Component({
    selector: 'app-funcionario-create',
    standalone: true,
    imports: [SharedModule, NgbModule, CardComponent],
    providers: [NgbActiveModal],
    templateUrl: './funcionario-create.html'
})
export class FuncionarioCreate implements OnInit {
    @Input() funcionarioEdicao: any;
    dadosForm: any = {
        id: null,
        matricula: '',
        nome: '',
        cargo: '',
        equipe: '',
        especialidades: [],
        disponibilidade: {
            diasSemana: [],
            turnos: []
        },
        status: 'ATIVO'
    };

    listaEspecialidades = ['Mecânica', 'Elétrica', 'Hidráulica', 'Instrumentação', 'Solda'];

    listaDias: any[] = [
        { label: 'Segunda', value: 'SEGUNDA' },
        { label: 'Terça', value: 'TERÇA' },
        { label: 'Quarta', value: 'QUARTA' },
        { label: 'Quinta', value: 'QUINTA' },
        { label: 'Sexta', value: 'SEXTA' }
    ];

    listaTurnos: any[] = [
        { label: 'Manhã', value: 'MANHA' },
        { label: 'Tarde', value: 'TARDE' },
        { label: 'Noite', value: 'NOITE' }
    ];

    constructor(public activeModal: NgbActiveModal) { }

    ngOnInit(): void {
        if (this.funcionarioEdicao) {
            const edit = JSON.parse(JSON.stringify(this.funcionarioEdicao));

            this.dadosForm = {
                ...edit,
                especialidades: edit.especialidades || [],
                disponibilidade: {
                    diasSemana: edit.disponibilidade?.diasSemana || [],
                    turnos: edit.disponibilidade?.turnos || []
                }
            };
        }
    }

    estaSelecionado(lista: any[] | undefined | null, valor: string): boolean {
        if (!lista || !Array.isArray(lista)) return false;
        return lista.includes(valor);
    }

    toggleSelection(path: string, value: any) {
        const parts = path.split('.');
        let target = this.dadosForm;

        for (let i = 0; i < parts.length; i++) {
            if (i === parts.length - 1) {
                if (!Array.isArray(target[parts[i]])) target[parts[i]] = [];
                const index = target[parts[i]].indexOf(value);
                if (index > -1) target[parts[i]].splice(index, 1);
                else target[parts[i]].push(value);
            } else {
                if (!target[parts[i]]) target[parts[i]] = {};
                target = target[parts[i]];
            }
        }
    }

    salvar() {
        this.activeModal.close(this.dadosForm);
    }
}