export interface UserCreateRequest {
  nomeUsuario: string;
  email: string;
  senha: string;
  ativo: boolean;
  tipoUsuario: string;
}
