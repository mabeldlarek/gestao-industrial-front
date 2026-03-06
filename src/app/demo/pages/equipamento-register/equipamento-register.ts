import { Component } from '@angular/core';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-equipamento-register',
  imports: [CardComponent, SharedModule],
  templateUrl: './equipamento-register.html',
  styleUrl: './equipamento-register.scss',
})
export class EquipamentoRegister {

}
