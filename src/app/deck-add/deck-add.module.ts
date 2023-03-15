import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CardRootModule } from '../card-root/card-root.module';
import { DeckAddComponent } from './deck-add.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [DeckAddComponent],
  imports: [
    CommonModule,
    CardRootModule,
    ReactiveFormsModule
  ],
  providers:[]
})
export class DeckAddModule { }
