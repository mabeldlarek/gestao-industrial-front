import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CriticidadeCreate } from './criticidade-create';
import { MedidorCreate } from './medidor-create';

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
        localizacao: '',
        
        // CAMPOS ADICIONAIS NECESSÁRIOS:
        criticidadeID: null, // Para armazenar o ID da análise de criticidade
        medidores: []        // Inicializado como array para evitar erro de .length no HTML
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

    // 2. Adicione o método que o HTML está chamando
    inserirMedidor() {
        // Abre o modal do medidor
        const modalRef = this.modalService.open(MedidorCreate, { size: 'lg', backdrop: 'static' });

        // Escuta o resultado quando o modal for fechado (activeModal.close)
        modalRef.result.then((resultado) => {
            if (resultado) {
                // Adiciona o medidor retornado à lista do equipamento
                if (!this.dadosForm.medidores) {
                    this.dadosForm.medidores = [];
                }
                this.dadosForm.medidores.push(resultado);
            }
        }).catch((error) => {
            // Captura o fechamento via 'cancelar' ou clique fora (se habilitado)
            console.log('Modal fechado sem dados');
        });
    }

    // Método auxiliar para remover um medidor da lista, se precisar
    removerMedidor(index: number) {
        this.dadosForm.medidores.splice(index, 1);
    }

}
