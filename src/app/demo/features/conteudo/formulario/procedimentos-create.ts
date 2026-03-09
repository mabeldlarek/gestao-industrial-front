import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
    selector: 'app-procedimentos-create',
    standalone: true, // Adicionado caso seu projeto siga o padrão standalone
    imports: [CardComponent, SharedModule],
    templateUrl: './procedimentos-create.html',
    styleUrl: './procedimentos-create.scss',
})
export class ProcedimentosCreate implements OnInit {

    // O modal injeta os dados do procedimento selecionado aqui
    @Input() procedimentoEdicao: any;

    // Objeto mapeado para o modelo de Procedimentos
    dadosForm: any = {
        titulo: '',
        codigo: '',
        descricao: '',
        tipoManutencao: '',
        tempoEstimado: 0,
        revisadoPor: '',
        dataCriacao: '',
        dataUltimaRevisao: '',
        passosChecklist: [],
        ferramentasNecessarias: [],
        riscosAssociados: [],
        EPIsRequeridos: [],
        documentosAnexados: []
    };

    constructor(public activeModal: NgbActiveModal) { }

    ngOnInit() {
        if (this.procedimentoEdicao) {
            if (this.procedimentoEdicao) {
                this.dadosForm = { ...this.procedimentoEdicao };

                if (!this.dadosForm.documentosAnexados) {
                    this.dadosForm.documentosAnexados = [];
                }

                this.dadosForm = JSON.parse(JSON.stringify(this.procedimentoEdicao));

                // Ajuste das datas para o formato do input datetime-local (YYYY-MM-DDThh:mm)
                if (this.dadosForm.dataCriacao) {
                    this.dadosForm.dataCriacao = this.formatarDataParaInput(this.dadosForm.dataCriacao);
                }
                if (this.dadosForm.dataUltimaRevisao) {
                    this.dadosForm.dataUltimaRevisao = this.formatarDataParaInput(this.dadosForm.dataUltimaRevisao);
                }
            }
        }
    }

    salvar() {
        // Retorna os dados para o componente pai (listagem)
        this.activeModal.close(this.dadosForm);
    }

    formatarDataParaInput(dataIso: string): string {
        if (!dataIso) return '';
        // Converte de "2025-08-09T10:00:00.000Z" para "2025-08-09T10:00"
        return dataIso.substring(0, 16);
    }

    // Helper simples para adicionar itens aos arrays (Checklist, EPIs, etc) se precisar no HTML
    adicionarItemArray(campo: string, valor: string) {
        if (valor) {
            this.dadosForm[campo].push(valor);
        }
    }
    onFileSelected(event: any) {
        const files = event.target.files;
        if (files) {
            for (let file of files) {
                // Verifica se o nome já existe no array atual
                if (!this.dadosForm.documentosAnexados.includes(file.name)) {
                    this.dadosForm.documentosAnexados.push(file.name);
                }
            }
        }
        // Remove duplicatas caso o array já venha com elas do banco de dados
        this.dadosForm.documentosAnexados = [...new Set(this.dadosForm.documentosAnexados)];

        event.target.value = '';
    }

    removerArquivo(index: number) {
        this.dadosForm.documentosAnexados.splice(index, 1);
    }
}