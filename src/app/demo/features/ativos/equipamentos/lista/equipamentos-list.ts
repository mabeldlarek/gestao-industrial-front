import { Component } from '@angular/core';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NavSearchComponent } from "src/app/theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component";
import { EquipamentosCreate } from '../formulario/equipamentos-create';
import { NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipamentos',
  standalone: true,
  imports: [CardComponent, SharedModule, NavSearchComponent, NgbModule, CommonModule],
  templateUrl: './equipamentos-list.html',
  styleUrl: './equipamentos-list.scss',
})
export class EquipamentosComponent {

  dados = [
    {
      id: 1,
      codigo: "TESTE",
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
      criticidadeID: "2",
      parametrosOperacionais: {
        faixaHz: "10-1000",
        vibracaoMax_mm_s: 4.5
      },
      medidorIds: [],
      documentosAnexados: ["manual-sensor-vibracao.pdf"],
      imagemURL: "https://exemplo.com/imagens/vibracao01.png",
      parentID: null
    },
    {
      id: 2,
      codigo: "MOT-001",
      nome: "Motor Trifásico - Esteira A",
      descricao: "Motor de indução responsável pela tração da esteira transportadora principal.",
      tipo: "Motor",
      localizacao: "Planta Norte - Setor C",
      numeroSerie: "MOT-ABC-12345",
      fabricante: "WEG",
      modelo: "W22 Super Premium",
      dataInstalacao: "2023-01-15T08:30:00Z",
      dataUltimaManutencao: "2024-12-20T10:00:00Z",
      statusOperacional: "Em Manutenção",
      criticidadeID: "1",
      parametrosOperacionais: {
        faixaHz: "60",
        vibracaoMax_mm_s: 2.8
      },
      medidorIds: [10, 11],
      documentosAnexados: ["catalogo-weg-w22.pdf"],
      imagemURL: "https://exemplo.com/imagens/motor001.png",
      parentID: null
    },
    {
      id: 3,
      codigo: "BOM-442",
      nome: "Bomba Centrífuga - Resfriamento",
      descricao: "Bomba de alta pressão do sistema de resfriamento das caldeiras.",
      tipo: "Bomba",
      localizacao: "Planta Sul - Subsolo",
      numeroSerie: "BOM-998-XYZ",
      fabricante: "KSB",
      modelo: "MegaCPK",
      dataInstalacao: "2022-11-05T15:00:00Z",
      dataUltimaManutencao: "2025-01-10T09:15:00Z",
      statusOperacional: "Operacional",
      criticidadeID: "3",
      parametrosOperacionais: {
        faixaHz: "0-3600 RPM",
        vibracaoMax_mm_s: 7.1
      },
      medidorIds: [],
      documentosAnexados: ["ksb-manual-centrifuga.pdf", "diagrama-hidraulico.png"],
      imagemURL: "https://exemplo.com/imagens/bomba442.png",
      parentID: null
    }
  ];

  termoPesquisa: string = '';
  dadosFiltrados = [...this.dados];

  filtrarEquipamentos() {
    const termo = this.termoPesquisa.toLowerCase().trim();

    // Se a barra estiver vazia, a lista visual volta a ser IGUAL à lista de dados original
    if (!termo) {
      this.dadosFiltrados = [...this.dados];
      return;
    }

    // Filtra apenas para a lista visual
    this.dadosFiltrados = this.dados.filter(item => {
      return (
        item.nome.toLowerCase().includes(termo) ||
        item.codigo.toLowerCase().includes(termo) ||
        item.tipo.toLowerCase().includes(termo)
      );
    });
  }

  itensSelecionados: any[] = [];

  constructor(private modalService: NgbModal) { }

  // Verifica se exatamente um item está selecionado para edição
  get podeEditar(): boolean {
    return this.itensSelecionados.length === 1;
  }

  // Verifica se ao menos um item está selecionado para exclusão
  get podeExcluir(): boolean {
    return this.itensSelecionados.length > 0;
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
    // Força a atualização da referência para o Angular detectar mudanças nos botões
    this.itensSelecionados = [...this.itensSelecionados];
  }

  adicionarEquipamento() {
    this.modalService.open(EquipamentosCreate, {
      size: 'lg',
      backdrop: 'static',
      keyboard: true
    });
  }

  editarEquipamento() {
    if (this.podeEditar) {
      const itemParaEditar = this.itensSelecionados[0];

      const modalRef = this.modalService.open(EquipamentosCreate, {
        size: 'lg',
        backdrop: 'static',
        keyboard: true
      });

      // Passa o objeto para a variável "equipamentoEdicao" dentro do EquipamentosCreate
      modalRef.componentInstance.equipamentoEdicao = itemParaEditar;

      // Opcional: Tratar o retorno após salvar a edição
      modalRef.result.then((result) => {
        if (result) {
          // Lógica para atualizar a lista local se necessário
        }
      }, () => { });
    }
  }

  confirmarExclusao() {
    const qtd = this.itensSelecionados.length;

    Swal.fire({
      title: 'Excluir?',
      text: qtd === 1
        ? `Remover "${this.itensSelecionados[0].nome}"?`
        : `Remover ${qtd} itens?`,
      icon: 'warning',
      width: '350px', // Define a largura menor
      padding: '1em', // Reduz o espaçamento interno
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
      reverseButtons: true,
      customClass: {
        title: 'fs-5', // Classe do Bootstrap para diminuir a fonte do título
        htmlContainer: 'fs-6' // Classe do Bootstrap para diminuir a fonte do texto
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const idsParaRemover = this.itensSelecionados.map(i => i.id);
        this.dados = this.dados.filter(d => !idsParaRemover.includes(d.id));
        this.itensSelecionados = [];

        // Feedback de sucesso também pequeno
        Swal.fire({
          title: 'Pronto!',
          icon: 'success',
          width: '250px',
          timer: 1000,
          showConfirmButton: false
        });
      }
    });
  }
}