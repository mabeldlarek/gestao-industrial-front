import { Component } from '@angular/core';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NavSearchComponent } from "src/app/theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component";
import { ProcedimentosCreate } from '../formulario/procedimentos-create';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-procedimentos',
  standalone: true,
  imports: [CardComponent, SharedModule, NavSearchComponent, NgbModule],
  templateUrl: './procedimentos-list.html',
  styleUrl: './procedimentos-list.scss',
})
export class ProcedimentosComponent {

termoPesquisa: string = '';

dados = [
  {
    id: 1,
    codigo: "PROC-024",
    titulo: "Manutenção Preventiva Motor WEG",
    descricao: "Procedimento padrão para lubrificação e inspeção de motores elétricos da linha principal.",
    tipoManutencao: "PREVENTIVA",
    passosChecklist: [
      "Realizar o bloqueio de energias (LOTO)",
      "Remover a proteção do acoplamento",
      "Verificar estado das escovas e coletor",
      "Aplicar graxa nos rolamentos conforme manual",
      "Testar vibração após partida"
    ],
    ferramentasNecessarias: ["Chave de fenda", "Multímetro", "Bomba de graxa manual"],
    pecasNecessarias: ["Rolamento 6205-ZZ", "Graxa de Lítio NLGI 2"],
    tempoEstimado: 4, // horas
    riscosAssociados: ["Choque elétrico", "Prensamento de membros"],
    EPIsRequeridos: ["Luvas isolantes", "Óculos de proteção", "Protetor auricular"],
    documentosAnexados: ["manual_motor_weg.pdf"],
    dataCriacao: "2025-01-10T10:00:00.000Z",
    dataUltimaRevisao: "2025-08-09T10:00:00.000Z",
    revisadoPor: "Eng. Roberto Silva"
  },
  {
    id: 2,
    codigo: "PROC-088",
    titulo: "Calibração de Sensores de Vibração",
    descricao: "Ajuste e conferência de sensibilidade em sensores SKF e Omron.",
    tipoManutencao: "CALIBRAÇÃO",
    passosChecklist: [
      "Conectar o calibrador portátil ao sensor",
      "Gerar frequência de teste de 100Hz",
      "Verificar se a leitura no sistema coincide com o padrão",
      "Emitir certificado de conformidade"
    ],
    ferramentasNecessarias: ["Calibrador de Vibração", "Osciloscópio"],
    pecasNecessarias: [],
    tempoEstimado: 1.5,
    riscosAssociados: ["Queda de altura (se o sensor estiver em local elevado)"],
    EPIsRequeridos: ["Capacete", "Cinto de segurança"],
    documentosAnexados: ["norma_iso_10816.pdf"],
    dataCriacao: "2025-02-15T08:30:00.000Z",
    dataUltimaRevisao: "2025-02-15T08:30:00.000Z",
    revisadoPor: "Téc. Marina Souza"
  },
  {
    id: 3,
    codigo: "PROC-112",
    titulo: "Troca de Selo Mecânico - Bomba Hidráulica",
    descricao: "Procedimento para correção de vazamentos em bombas Grundfos.",
    tipoManutencao: "CORRETIVA",
    passosChecklist: [
      "Drenar o fluido do sistema",
      "Desmontar a voluta da bomba",
      "Remover selo danificado",
      "Limpar o eixo e instalar selo novo",
      "Realizar teste de estanqueidade"
    ],
    ferramentasNecessarias: ["Chave de boca 19mm", "Extrator de rolamento", "Solvente de limpeza"],
    pecasNecessarias: ["Selo Mecânico 25mm", "O-ring viton"],
    tempoEstimado: 6,
    riscosAssociados: ["Exposição a produtos químicos", "Pisos escorregadios"],
    EPIsRequeridos: ["Luvas nitrílicas", "Avental de PVC", "Botas antiderrapantes"],
    documentosAnexados: ["vista_explodida_bomba.jpg"],
    dataCriacao: "2024-11-20T14:00:00.000Z",
    dataUltimaRevisao: "2025-01-05T09:00:00.000Z",
    revisadoPor: "Eng. Carlos Alberto"
  },
  {
    id: 4,
    codigo: "PROC-005",
    titulo: "Inspeção Termográfica Painel CLP",
    descricao: "Monitoramento de temperatura em componentes eletrônicos e conexões.",
    tipoManutencao: "PREDITIVA",
    passosChecklist: [
      "Abrir o painel com o sistema energizado",
      "Escanear bornes de entrada com câmera térmica",
      "Identificar pontos quentes acima de 60°C",
      "Gerar relatório fotográfico"
    ],
    ferramentasNecessarias: ["Câmera Termográfica Flir"],
    pecasNecessarias: [],
    tempoEstimado: 0.5,
    riscosAssociados: ["Arco elétrico", "Choque elétrico"],
    EPIsRequeridos: ["Vestimenta NR10 (anti-chama)", "Protetor facial"],
    documentosAnexados: ["procedimento_termografia_v2.pdf"],
    dataCriacao: "2025-03-01T11:00:00.000Z",
    dataUltimaRevisao: "2025-03-01T11:00:00.000Z",
    revisadoPor: "Especialista Elétrica Jorge"
  }
];
  dadosFiltrados = [...this.dados];

  itensSelecionados: any[] = [];

  constructor(private modalService: NgbModal) { }

filtrarProcedimentos() {
  const termo = this.termoPesquisa.toLowerCase();

  this.dadosFiltrados = this.dados.filter(item => {
    return (
      item.titulo?.toLowerCase().includes(termo) ||
      item.codigo?.toLowerCase().includes(termo) ||
      item.tipoManutencao?.toLowerCase().includes(termo) ||
      item.descricao?.toLowerCase().includes(termo) ||
      item.revisadoPor?.toLowerCase().includes(termo) ||
      // Pesquisa também dentro do array de riscos, se houver
      item.riscosAssociados?.some(risco => risco.toLowerCase().includes(termo)) ||
      // Pesquisa pelo tempo estimado (convertendo número para string)
      item.tempoEstimado?.toString().includes(termo)
    );
  });

  // Limpa a seleção para evitar que itens invisíveis continuem selecionados
  this.itensSelecionados = [];
}

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

  desabilitarEdicao(): boolean {
    return this.itensSelecionados.length !== 1;
  }

  get podeExcluir(): boolean {
    return this.itensSelecionados.length > 0;
  }

  adicionarProcedimento() {

    this.modalService.open(ProcedimentosCreate, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true
    });

  }

  editarProcedimento() {
    if (this.itensSelecionados.length !== 1) return;

    const itemParaEditar = this.itensSelecionados[0];

    const modalRef = this.modalService.open(ProcedimentosCreate, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true
    });

    // ATENÇÃO AQUI: O nome deve ser 'equipamentoEdicao' para bater com o seu @Input
    modalRef.componentInstance.procedimentoEdicao= { ...itemParaEditar };

    // Opcional: Pegar o retorno ao salvar
    modalRef.result.then((resultado) => {
      if (resultado) {
        const index = this.dados.findIndex(d => d.id === resultado.id);
        if (index !== -1) {
          this.dados[index] = resultado;
          this.filtrarProcedimentos();
        }
      }
    }).catch(() => { });
  }

  confirmarExclusao() {

    if (!this.itensSelecionados.length) return;

    let mensagem = '';

    if (this.itensSelecionados.length === 1) {
      mensagem = `Excluir ${this.itensSelecionados[0].titulo}?`;
    } else {
      mensagem = `Excluir ${this.itensSelecionados.length} itens selecionados?`;
    }

    Swal.fire({
      title: 'Tem certeza?',
      text: mensagem,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim, excluir',
      cancelButtonText: 'Cancelar'
    }).then(result => {

      if (result.isConfirmed) {
        this.excluirProcedimento();
      }

    });
  }

  excluirProcedimento() {

    const ids = this.itensSelecionados.map(i => i.id);

    this.dados = this.dados.filter(item => !ids.includes(item.id));

    this.itensSelecionados = [];

    this.filtrarProcedimentos();

    Swal.fire({
      icon: 'success',
      title: 'Excluído!',
      text: 'Procedimento removido com sucesso',
      timer: 2000,
      showConfirmButton: false
    });

  }

}