import { CommonModule } from '@angular/common'; // Importe aqui
import { FormsModule } from '@angular/forms'; // Importe aqui
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { CardComponent } from 'src/app/theme/shared/components/card/card.component';

@Component({
  selector: 'app-usuario-create',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,  
    SharedModule, 
    NgbModule, 
    CardComponent
  ],
  templateUrl: './usuarios-create.html'
})

export class UsuarioCreate implements OnInit {
  @Input() usuarioEdicao: any;

  dadosForm: any = {
    id: '',
    nomeUsuario: '',
    email: '',
    senha: '',
    ativo: true,
    tipoUsuario: 'TECNICO' 
  };

  tiposUsuario = [
    { label: 'Administrador', value: 'ADMIN' },
    { label: 'Técnico de Manutenção', value: 'TECNICO' },
    { label: 'Gestor/Engenharia', value: 'GESTOR' },
    { label: 'Visualizador', value: 'USER' }
  ];

  exibirSenha = false;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    if (this.usuarioEdicao) {
      this.dadosForm = JSON.parse(JSON.stringify(this.usuarioEdicao));
      // No modo edição, geralmente não resetamos a senha por aqui por segurança
      this.dadosForm.senha = ''; 
    }
  }

  salvar() {
    console.log('Objeto de Usuário para envio:', this.dadosForm);
    this.activeModal.close(this.dadosForm);
  }
}