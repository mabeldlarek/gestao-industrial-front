import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-criticidade-create',
    standalone: true,
    imports: [CardComponent, SharedModule, NgbModule],
    templateUrl: './criticidade-create.html',
    styleUrl: './criticidade-create.scss'
})
export class CriticidadeCreate implements OnInit {

    @Input() criticidadeEdicao: any;

    // Estrutura inicial do formulário
    dadosForm: any = {
        id: null,
        equipamentoID: '',
        // Produção
        impactoProducao: null,
        frequenciaProducao: null,
        // Segurança
        impactoSeguranca: null,
        frequenciaSeguranca: null,
        // Ambiental
        impactoAmbiental: null,
        frequenciaAmbiental: null,
        // Custo de Reparo
        impactoCusto: null,
        frequenciaCusto: null,
        // Falha
        impactoFalha: null,
        frequenciaFalha: null,

        dataAnalise: new Date().toISOString(),
        resultadoFinal: '' // Ex: "CRÍTICO", "MÉDIO", "BAIXO"
    };

    // ... dentro da classe EquipamentoCreate
    constructor(
        private modalService: NgbModal,
        public activeModal: NgbActiveModal // Caso seja um modal
    ) { }

   
    ngOnInit(): void {
        if (this.criticidadeEdicao) {
            // Clona os dados para evitar alteração por referência na lista
            this.dadosForm = JSON.parse(JSON.stringify(this.criticidadeEdicao));
        }
    }

    /**
     * Opcional: Lógica para converter os textos em números e gerar um score
     * Pode ser chamada antes do activeModal.close()
     */
    calcularScoreTotal() {
        const pesosImpacto: any = { 'INSIGNIFICANTE': 1, 'BAIXO': 2, 'MEDIO': 3, 'ALTO': 4, 'CATASTROFICO': 5 };
        const pesosFrequencia: any = { 'IMPROVAVEL': 1, 'REMOTA': 2, 'BAIXA': 3, 'MEDIA': 4, 'ALTA': 5 };

        // Exemplo simples: média dos impactos
        // Em um cenário real, você faria Matriz de Risco (Impacto x Frequência)
        console.log("Calculando criticidade com base nos pesos...");
    }

    salvar() {
        this.calcularScoreTotal();
        // Retorna os dados preenchidos para o componente de listagem
        this.activeModal.close(this.dadosForm);
    }
}