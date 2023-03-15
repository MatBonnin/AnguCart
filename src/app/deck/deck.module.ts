import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeckRoutingModule } from './deck-routing.module'
import { DeckComponent } from './deck.component';
import { DataDeckService } from './dataDeck.service';
import { CardRootModule } from '../card-root/card-root.module';



@NgModule({
  declarations: [DeckComponent],
  imports: [
    CommonModule,
    DeckRoutingModule,
    CardRootModule,
  ],
  providers:[DataDeckService]
})
export class DeckModule { }