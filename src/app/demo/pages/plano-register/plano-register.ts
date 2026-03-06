import { Component } from '@angular/core';
import { CardComponent } from "../../../theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';  

@Component({
  selector: 'app-plano-register',
  imports: [CardComponent, SharedModule],
  templateUrl: './plano-register.html',
  styleUrl: './plano-register.scss',
})
export class PlanoRegister {

}
