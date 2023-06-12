import { CardComponent } from '../card/card.component';
import { CardFormComponent } from '../card-form/card-form.component';
import { CardListComponent } from '../card-list/card-list.component';
import { CardRootComponent } from './card-root.component';
import { CardService } from '../../../services/card.service';
import { CommonModule } from '@angular/common';
import { DeckService } from '../../../services/deck.service';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [CardRootComponent,CardListComponent,CardFormComponent,CardComponent],
  imports: [
    CommonModule,ReactiveFormsModule,MatSnackBarModule,  HttpClientModule,
  ],
  providers:[CardService,CardService,DeckService],
  exports:[CardComponent,CardRootComponent]
})
export class CardRootModule { }
