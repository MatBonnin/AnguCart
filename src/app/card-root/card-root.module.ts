import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardRootComponent } from './card-root.component';

import {  CardListComponent } from '../card-list/card-list.component';
import { DataService } from './data.service';
import { ReactiveFormsModule } from '@angular/forms';
import { CardFormComponent } from '../card-form/card-form.component';
import { CardComponent } from '../card/card.component';
import { CardService } from './card.service';




@NgModule({
  declarations: [CardRootComponent,CardListComponent,CardFormComponent,CardComponent],
  imports: [
    CommonModule,ReactiveFormsModule
  ],
  providers:[DataService,CardService],
  exports:[CardComponent]
})
export class CardRootModule { }
