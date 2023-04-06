import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddCardDeckDialogComponent } from './add-card-deck-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [AddCardDeckDialogComponent],
  imports: [
    MatDialogModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
  ],
  providers:[]
})
export class addCardDeckDialogModule { }
