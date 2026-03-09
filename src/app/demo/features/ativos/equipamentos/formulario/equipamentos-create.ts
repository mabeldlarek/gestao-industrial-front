import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
    selector: 'app-equipamentos-create',
    imports: [CardComponent, SharedModule],
    templateUrl: './equipamentos-create.html',
    styleUrl: './equipamentos-create.scss',
})

export class EquipamentosCreate implements OnInit {

    // O modal injeta os dados aqui nesta variável
    @Input() equipamentoEdicao: any;

    // Objeto que o HTML vai usar (Inicia vazio para novos itens)
    dadosForm: any = {
        nome: '',
        codigo: '',
        descricao: '',
        tipo: '',
        fabricante: '',
        modelo: '',
        statusOperacional: '',
        localizacao: ''
    };

    constructor(public activeModal: NgbActiveModal) { }

    salvar() {
        // Aqui você envia o 'this.dadosForm' para sua API ou serviço
        this.activeModal.close(this.dadosForm);
    }

    ngOnInit() {
        if (this.equipamentoEdicao) {
            // Fazemos a cópia profunda
            this.dadosForm = JSON.parse(JSON.stringify(this.equipamentoEdicao));

            // Ajustamos as datas para o formato do navegador (YYYY-MM-DDThh:mm)
            if (this.dadosForm.dataInstalacao) {
                this.dadosForm.dataInstalacao = this.formatarDataParaInput(this.dadosForm.dataInstalacao);
            }
            if (this.dadosForm.dataUltimaManutencao) {
                this.dadosForm.dataUltimaManutencao = this.formatarDataParaInput(this.dadosForm.dataUltimaManutencao);
            }
        }
    }

    formatarDataParaInput(dataIso: string): string {
        if (!dataIso) return '';
        // Remove o 'Z' ou milissegundos e pega apenas os primeiros 16 caracteres
        // Exemplo: De "2024-06-10T12:00:00Z" para "2024-06-10T12:00"
        return dataIso.substring(0, 16);
    }
}
