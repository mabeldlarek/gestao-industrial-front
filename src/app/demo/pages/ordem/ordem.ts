import { Component } from '@angular/core';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';

@Component({
  selector: 'app-ordem',
  imports: [CardComponent],
  templateUrl: './ordem.html',
  styleUrl: './ordem.scss',
})
export class Ordem {

}
