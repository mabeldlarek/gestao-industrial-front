import { Component } from '@angular/core';
import { CardComponent } from "src/app/theme/shared/components/card/card.component";
import { SharedModule } from 'src/app/theme/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-peca-register',
  imports: [CardComponent, SharedModule, NgSelectModule],
  templateUrl: './peca-register.html',
  styleUrl: './peca-register.scss',
})
export class PecaRegister {

}
