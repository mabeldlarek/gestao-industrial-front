import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CriticidadeCreate } from './criticidade-create';

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

    constructor(
        private modalService: NgbModal,
        public activeModal: NgbActiveModal // Caso seja um modal
    ) { }
    salvar() {
        // Aqui você envia o 'this.dadosForm' para sua API ou serviço
        this.activeModal.close(this.dadosForm);
    }

    ngOnInit() {
        if (this.equipamentoEdicao) {
            // Criamos uma cópia completa incluindo IDs e campos ocultos
            this.dadosForm = { ...this.equipamentoEdicao };

            // Formatação das datas para os inputs do tipo datetime-local
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

    abrirCalculoCriticidade() {
        const modalRef = this.modalService.open(CriticidadeCreate, {
            size: 'lg',
            backdrop: 'static',
            keyboard: false
        });

        // Se o usuário salvar a criticidade, pegamos o resultado (ou o ID gerado)
        modalRef.result.then((resultado) => {
            if (resultado) {
                // Aqui você vincula o resultado do cálculo ao seu formulário de equipamento
                this.dadosForm.criticidadeID = resultado.id || 'CÁLCULO REALIZADO';
                // Se tiver um campo de classe (A, B, C), pode preencher aqui também
            }
        }).catch(() => {
            // Modal fechado sem salvar
        });
    }
}
