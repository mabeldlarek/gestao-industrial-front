export interface EquipamentoRequest {
  id?: string;
  codigo: string;
  nome: string;
  descricao: string;
  tipo: string;
  localizacao: string;
  numeroSerie: string;
  fabricante: string;
  modelo: string;
  dataInstalacao: string;
  dataUltimaManutencao: string;
  statusOperacional: string;
  criticidadeID: string | null;
  parametrosOperacionais: { [key: string]: any };
  medidorIds?: any[];
  documentosAnexados: string[];
  imagemURL: string;
  parentID: string | null;
}