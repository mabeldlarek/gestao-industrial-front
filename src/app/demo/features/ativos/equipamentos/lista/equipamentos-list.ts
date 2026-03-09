import { Component } from '@angular/core';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NavSearchComponent } from "src/app/theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component";
import { EquipamentosCreate } from '../formulario/equipamentos-create';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipamentos',
  standalone: true,
  imports: [CardComponent, SharedModule, NavSearchComponent, NgbModule],
  templateUrl: './equipamentos-list.html',
  styleUrl: './equipamentos-list.scss',
})
export class EquipamentosComponent {

  termoPesquisa: string = '';

  dados = [
    {
      id: 1,
      codigo: "EQP-001",
      nome: "Sensor de Vibração - Motor",
      descricao: "Sensor responsável por monitorar vibração do motor principal.",
      tipo: "Sensor",
      localizacao: "Planta Central - Sala 1",
      numeroSerie: "VIB-2025-9988",
      fabricante: "SKF",
      modelo: "CMPT-100",
      dataInstalacao: "2024-06-10T12:00:00Z",
      dataUltimaManutencao: "2025-02-05T14:00:00Z",
      statusOperacional: "Operacional",
      criticidadeID: "Alta",
      parametrosOperacionais: { faixaHz: "10-1000", vibracaoMax_mm_s: 4.5 },
      medidorIds: [],
      documentosAnexados: ["manual-sensor-vibracao.pdf"],
      imagemURL: "",
      parentID: null
    },

    {
      id: 2,
      codigo: "EQP-002",
      nome: "Motor Elétrico Principal",
      descricao: "Motor responsável pela linha de produção 1.",
      tipo: "Motor",
      localizacao: "Planta Central - Linha 1",
      numeroSerie: "MTR-88421",
      fabricante: "WEG",
      modelo: "W22 50CV",
      dataInstalacao: "2023-03-15T10:00:00Z",
      dataUltimaManutencao: "2025-01-10T09:00:00Z",
      statusOperacional: "Operacional",
      criticidadeID: "Alta",
      parametrosOperacionais: { rpm: 1750, potencia_kw: 37 },
      medidorIds: [],
      documentosAnexados: [],
      imagemURL: "",
      parentID: null
    },

    {
      id: 3,
      codigo: "EQP-003",
      nome: "Bomba Hidráulica",
      descricao: "Bomba utilizada no sistema de refrigeração.",
      tipo: "Bomba",
      localizacao: "Setor Hidráulico",
      numeroSerie: "BMB-77821",
      fabricante: "Grundfos",
      modelo: "CRN32",
      dataInstalacao: "2022-11-02T10:00:00Z",
      dataUltimaManutencao: "2025-02-15T11:00:00Z",
      statusOperacional: "Operacional",
      criticidadeID: "Média",
      parametrosOperacionais: { vazao_l_min: 120 },
      medidorIds: [],
      documentosAnexados: [],
      imagemURL: "",
      parentID: null
    },

    {
      id: 4,
      codigo: "EQP-004",
      nome: "CLP Linha Produção",
      descricao: "Controlador lógico programável da linha principal.",
      tipo: "Controlador",
      localizacao: "Painel Elétrico 1",
      numeroSerie: "CLP-99812",
      fabricante: "Siemens",
      modelo: "S7-1500",
      dataInstalacao: "2023-05-20T09:00:00Z",
      dataUltimaManutencao: "2025-02-02T14:00:00Z",
      statusOperacional: "Operacional",
      criticidadeID: "Alta",
      parametrosOperacionais: {},
      medidorIds: [],
      documentosAnexados: [],
      imagemURL: "",
      parentID: null
    },

    {
      id: 5,
      codigo: "EQP-005",
      nome: "Sensor de Temperatura Forno",
      descricao: "Sensor responsável por medir temperatura do forno industrial.",
      tipo: "Sensor",
      localizacao: "Forno Industrial",
      numeroSerie: "TMP-88321",
      fabricante: "Omron",
      modelo: "E52",
      dataInstalacao: "2024-01-10T08:00:00Z",
      dataUltimaManutencao: "2025-01-20T09:00:00Z",
      statusOperacional: "Operacional",
      criticidadeID: "Alta",
      parametrosOperacionais: { temperaturaMax: 800 },
      medidorIds: [],
      documentosAnexados: [],
      imagemURL: "",
      parentID: null
    },

    {
      id: 6,
      codigo: "EQP-006",
      nome: "Válvula Pneumática",
      descricao: "Controle de fluxo do sistema pneumático.",
      tipo: "Válvula",
      localizacao: "Linha 2",
      numeroSerie: "VAL-22831",
      fabricante: "Festo",
      modelo: "VPPE",
      dataInstalacao: "2023-09-12T08:00:00Z",
      dataUltimaManutencao: "2025-02-18T13:00:00Z",
      statusOperacional: "Operacional",
      criticidadeID: "Baixa",
      parametrosOperacionais: {},
      medidorIds: [],
      documentosAnexados: [],
      imagemURL: "",
      parentID: null
    },

    {
      id: 7,
      codigo: "EQP-007",
      nome: "Compressor de Ar",
      descricao: "Compressor principal do sistema pneumático.",
      tipo: "Compressor",
      localizacao: "Casa de Máquinas",
      numeroSerie: "CMP-88321",
      fabricante: "Atlas Copco",
      modelo: "GA 75",
      dataInstalacao: "2022-07-22T11:00:00Z",
      dataUltimaManutencao: "2025-01-30T10:00:00Z",
      statusOperacional: "Manutenção",
      criticidadeID: "Alta",
      parametrosOperacionais: { pressao_bar: 8 },
      medidorIds: [],
      documentosAnexados: [],
      imagemURL: "",
      parentID: null
    },

    {
      id: 8,
      codigo: "EQP-008",
      nome: "Sensor de Pressão",
      descricao: "Sensor de pressão da linha hidráulica.",
      tipo: "Sensor",
      localizacao: "Sistema Hidráulico",
      numeroSerie: "PRS-88221",
      fabricante: "Bosch Rexroth",
      modelo: "HED 8",
      dataInstalacao: "2024-02-01T10:00:00Z",
      dataUltimaManutencao: "2025-02-12T15:00:00Z",
      statusOperacional: "Operacional",
      criticidadeID: "Média",
      parametrosOperacionais: { pressaoMax_bar: 250 },
      medidorIds: [],
      documentosAnexados: [],
      imagemURL: "",
      parentID: null
    }
  ];

  dadosFiltrados = [...this.dados];

  itensSelecionados: any[] = [];

  constructor(private modalService: NgbModal) { }

  filtrarEquipamentos() {

    const termo = this.termoPesquisa.toLowerCase();

    this.dadosFiltrados = this.dados.filter(item =>
      item.nome?.toLowerCase().includes(termo) ||
      item.codigo?.toLowerCase().includes(termo) ||
      item.tipo?.toLowerCase().includes(termo) ||
      item.fabricante?.toLowerCase().includes(termo) ||
      item.modelo?.toLowerCase().includes(termo) ||
      item.statusOperacional?.toLowerCase().includes(termo)
    );

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

   adicionarEquipamento() {

    this.modalService.open(EquipamentosCreate, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true
    });

  }


  editarEquipamento() {

    if (this.itensSelecionados.length !== 1) return;

    Swal.fire({
      icon: 'info',
      title: 'Editar Equipamento',
      text: `Editar ${this.itensSelecionados[0].nome}`
    });

  }

confirmarExclusao() {

  if (!this.itensSelecionados.length) return;

  let mensagem = '';

  if (this.itensSelecionados.length === 1) {
    mensagem = `Excluir ${this.itensSelecionados[0].nome}?`;
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
      this.excluirEquipamento();
    }

  });
}

  excluirEquipamento() {

    const ids = this.itensSelecionados.map(i => i.id);

    this.dados = this.dados.filter(item => !ids.includes(item.id));

    this.itensSelecionados = [];

    this.filtrarEquipamentos();

    Swal.fire({
      icon: 'success',
      title: 'Excluído!',
      text: 'Equipamento removido com sucesso',
      timer: 2000,
      showConfirmButton: false
    });

  }

}