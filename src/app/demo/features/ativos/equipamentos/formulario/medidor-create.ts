import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-medidor-create',
  standalone: true,
  imports: [CardComponent, SharedModule, NgbModule],
  templateUrl: './medidor-create.html',
  styleUrl: './medidor-create.scss'
})
export class MedidorCreate implements OnInit {

  @Input() medidorEdicao: any;

  // Estrutura do formulário baseada no seu JSON de Medidor
  medidor: any = {
    codigo: '',
    nome: '',
    tipo: null,
    unidade: '',
    valorAtual: 0,
    valorMinimo: 0,
    valorMaximo: 0,
    dataCadastro: new Date().toISOString()
  };

  constructor(
    public activeModal: NgbActiveModal
  ) { }

  ngOnInit(): void {
    if (this.medidorEdicao) {
      // Clona os dados para edição
      this.medidor = JSON.parse(JSON.stringify(this.medidorEdicao));
    }
  }

  /**
   * Validação simples antes de salvar
   */
  validarFormulario(): boolean {
    if (!this.medidor.codigo || !this.medidor.nome || !this.medidor.tipo) {
      console.warn("Preencha todos os campos obrigatórios.");
      return false;
    }
    
    if (this.medidor.valorMinimo >= this.medidor.valorMaximo) {
      console.warn("O valor mínimo não pode ser maior ou igual ao valor máximo.");
      return false;
    }

    return true;
  }

  salvarMedidor() {
    if (this.validarFormulario()) {
      console.log("Salvando Medidor:", this.medidor);
      
      // Aqui você enviaria para o seu Service Java/Spring Boot
      // this.medidorService.save(this.medidor).subscribe(...)
      
      this.activeModal.close(this.medidor);
    }
  }
}