import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardRootModule } from '../../cardGestion/card-root/card-root.module';
import { DeckAddComponent } from './deck-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [DeckAddComponent],
  imports: [
    CommonModule,
    CardRootModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[DeckAddComponent],
  providers:[]
})
export class DeckAddModule { }
