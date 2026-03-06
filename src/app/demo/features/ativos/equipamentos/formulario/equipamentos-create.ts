import { Component } from '@angular/core';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-equipamentos-create',
  imports: [CardComponent, SharedModule],
  templateUrl: './equipamentos-create.html',
  styleUrl: './equipamentos-create.scss',
})
export class EquipamentosCreate {

}
