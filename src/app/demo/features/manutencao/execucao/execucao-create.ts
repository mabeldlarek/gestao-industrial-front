import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'app-execucao-create',
    standalone: true,
    imports: [CardComponent, SharedModule, NgbModule],
    templateUrl: './execucao-create.html'
})
export class ExecucaoCreate implements OnInit {
    @Input() execucaoEdicao: any;

    dadosForm: any = {
        ordemManutencaoID: '',
        executorID: '',
        descricaoTrabalhoExecutado: '',
        observacoesExecutor: '',
        statusExecucao: 'EM_ANDAMENTO',
        checklistItens: [],
        fotosAntes: [],
        fotosDepois: [],
        assinaturaDigital: ''
    };

    constructor(public activeModal: NgbActiveModal) { }

    ngOnInit(): void {
        if (this.execucaoEdicao) {
            // Clonagem profunda
            const objetoClonado = JSON.parse(JSON.stringify(this.execucaoEdicao));

            // Validação de segurança: remove itens nulos ou malformados do array
            if (objetoClonado.checklistItens && Array.isArray(objetoClonado.checklistItens)) {
                objetoClonado.checklistItens = objetoClonado.checklistItens.filter(
                    (item: any) => item !== null && item !== undefined
                );
            } else {
                objetoClonado.checklistItens = [];
            }

            this.dadosForm = objetoClonado;
        } else {
            // Inicialização padrão para novo registro
            this.dadosForm.checklistItens = [
                { descricao: "Desligar equipamento", concluido: false },
                { descricao: "Bloquear alimentação elétrica", concluido: false },
                { descricao: "Verificar folgas mecânicas", concluido: false }
            ];
        }
    }

    onFileChange(event: any, campo: string) {
        const files = event.target.files;
        if (files) {
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.onload = (e: any) => {
                    this.dadosForm[campo].push(files[i].name); // Salvando apenas nome para o Mock
                };
                reader.readAsDataURL(files[i]);
            }
        }
    }

    removerFoto(campo: string, index: number) {
        this.dadosForm[campo].splice(index, 1);
    }

    salvar() {
        this.activeModal.close(this.dadosForm);
    }
}