export interface FuncionarioCreateRequest {
  matricula: string;
  nome: string;
  cargo: string;
  equipe: string;
  especialidades: string[];
  status: 'ATIVO' | 'INATIVO';
}
