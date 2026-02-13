import { Component } from '@angular/core';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-execucao',
  imports: [CardComponent, SharedModule],
  templateUrl: './execucao.html',
  styleUrl: './execucao.scss',
})
export class Execucao {

}
