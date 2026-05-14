import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbActiveModal, NgbModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CriticidadeCreate } from '../../../criticidade/criticidade-create';
import { MedidorCreate } from '../../../medidores/medidor-create';
import { EquipamentoService } from '../../services/equipamentos.service';
import { EquipamentoRequest } from '../../models/equipamento.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-equipamentos-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    NgbModule,
    CardComponent
  ],
  templateUrl: './equipamentos.html'
})
export class EquipamentosCreate implements OnInit {
  @Input() equipamentoEdicao: any;

  dadosForm: EquipamentoRequest = {
    codigo: '',
    nome: '',
    descricao: '',
    tipo: 'Sensor',
    localizacao: '',
    numeroSerie: '',
    fabricante: '',
    modelo: '',
    dataInstalacao: '',
    dataUltimaManutencao: '',
    statusOperacional: 'Operacional',
    criticidadeID: null,
    parametrosOperacionais: {},
    medidorIds: [],
    documentosAnexados: [],
    imagemURL: '',
    parentID: null
  };

  listaCampos: Array<{ chave: string; valor: any }> = [];
  error: string | null = null;

  constructor(
    private modalService: NgbModal,
    public activeModal: NgbActiveModal,
    private equipamentoService: EquipamentoService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.listaCampos = [];

    if (this.equipamentoEdicao) {
      this.dadosForm = JSON.parse(JSON.stringify(this.equipamentoEdicao));

      if (this.dadosForm.parametrosOperacionais) {
        this.listaCampos = Object.entries(this.dadosForm.parametrosOperacionais).map(([key, value]) => ({
          chave: key,
          valor: value
        }));
      }

      // Formata datas para o input datetime-local se existirem
      if (this.dadosForm.dataInstalacao) this.dadosForm.dataInstalacao = this.formatarDataParaInput(this.dadosForm.dataInstalacao);
      if (this.dadosForm.dataUltimaManutencao) this.dadosForm.dataUltimaManutencao = this.formatarDataParaInput(this.dadosForm.dataUltimaManutencao);
    }

    if (this.listaCampos.length === 0) {
      this.adicionarParametro();
    }
  }

  adicionarParametro() {
    this.listaCampos = [...this.listaCampos, { chave: '', valor: '' }];
  }

  removerParametro(index: number) {
    if (this.listaCampos.length > 0) {
      this.listaCampos.splice(index, 1);
      if (this.listaCampos.length === 0) this.adicionarParametro();
    }
  }

  prepararJson() {
    const objFinal: { [key: string]: any } = {};
    this.listaCampos.forEach(item => {
      if (item.chave && item.chave.trim() !== '') {
        const valorNumerico = Number(item.valor);
        objFinal[item.chave] = (item.valor !== '' && !isNaN(valorNumerico)) ? valorNumerico : item.valor;
      }
    });
    this.dadosForm.parametrosOperacionais = objFinal;
  }

  salvar() {
    this.error = null;
    this.prepararJson();

    const medidoresIdsEnvio = this.dadosForm.medidorIds?.map((m: any) => m.id ? m.id : m) || [];

    const payload = {
      ...this.dadosForm,
      medidorIds: medidoresIdsEnvio
    };

    const operacaoObs = this.dadosForm.id
      ? this.equipamentoService.update(this.dadosForm.id, payload)
      : this.equipamentoService.create(payload);

    operacaoObs.subscribe({
      next: (response) => {
        this.activeModal.close(response);

        Swal.fire({
          icon: 'success',
          title: 'Sucesso!',
          text: this.dadosForm.id ? 'Equipamento atualizado com sucesso!' : 'Equipamento cadastrado com sucesso!',
          timer: 2000,
          showConfirmButton: false
        });
      },
      error: (err) => {
        console.error('Erro completo recebido:', err);
        let backendMessage = '';

        if (err.error) {
          try {
            const objetoJson = typeof err.error === 'string' ? JSON.parse(err.error) : err.error;
            backendMessage = objetoJson.message || objetoJson.error;
          } catch (e) {
            backendMessage = typeof err.error === 'string' ? err.error : err.message;
          }
        }

        switch (err.status) {
          case 409:
            this.error = backendMessage || 'Conflito: Código já existe.';
            break;
          case 400:
            this.error = backendMessage || 'Dados inválidos. Verifique os campos.';
            break;
          case 0:
            this.error = 'Não foi possível comunicar com o servidor.';
            break;
          default:
            this.error = backendMessage || `Erro inesperado (${err.status})`;
            break;
        }
        this.cdr.detectChanges();
      }
    });
  }

  formatarDataParaInput(dataIso: string): string {
    return dataIso ? dataIso.substring(0, 16) : '';
  }

  abrirCalculoCriticidade() {
    const modalRef = this.modalService.open(
      CriticidadeCreate,
      {
        size: 'lg',
        backdrop: 'static'
      }
    );

    modalRef.componentInstance.idEquipamento = this.dadosForm.id;

    modalRef.result
      .then((criticidadeCriada) => {

        if (!criticidadeCriada) {
          return;
        }

        this.dadosForm.criticidadeID =
          criticidadeCriada.id ||
          criticidadeCriada.criticidadeID;

      })
      .catch(() => {
        console.log('Modal fechado');
      });
  }

  inserirMedidor() {
    const modalRef = this.modalService.open(MedidorCreate, { size: 'lg', backdrop: 'static' });
    modalRef.result.then((res) => {
      if (res) {
        if (!this.dadosForm.medidorIds) this.dadosForm.medidorIds = [];
        this.dadosForm.medidorIds.push(res);
      }
    }).catch(() => { });
  }

  removerMedidor(index: number) {
    this.dadosForm.medidorIds?.splice(index, 1);
  }
}