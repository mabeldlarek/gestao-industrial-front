import { Role } from "./role";

export interface UsuarioResponse {
  id: string;
  nomeUsuario: string;
  email: string;
  dataCriacao: string | Date; 
  ativo: boolean;
  tipoUsuario: 'ADMIN' | 'BASIC';
  roles: Role[];
}