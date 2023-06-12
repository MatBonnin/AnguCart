import { AddCardDeckDialogComponent } from 'src/app/add-card-deck-dialog/add-card-deck-dialog.component';
import { Card } from 'src/app/interfaces/card.types';
import { Component } from '@angular/core';
import { Deck } from 'src/app/interfaces/deck.types';
import { DeckService } from '../../../services/deck.service';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent {

  constructor(private deckService: DeckService,private dialog: MatDialog) { }
  apiData : Observable<any> =  this.deckService.getDecks();
  decks: Deck[] = [];

  ngOnInit():void {
    this.apiData.subscribe((deck : Deck[])=>{

      this.decks = deck
    });
  }

  deleteDeck(deckId:any):void{
    this.deckService.delDeck(deckId).subscribe(
      response => {
        ;
      },
      error => {
        ;
      })
  }

  deleteCard(deckId:string, cardId:string):void{

    const deck = this.decks.find((d:Deck) => d.id === deckId);

    if (!deck) {

      return;
    }
    const cardIndex = deck.cards.indexOf(cardId);

    if (cardIndex !== -1) {
      deck.cards.splice(cardIndex, 1);
    }

    this.deckService.updateDeck(deck).subscribe(
      response => {

      },
      error => {

      })
  }

  addCard(deckId: string): void {
    const deck = this.decks.find((d:Deck) => d.id === deckId);
    if (!deck) {
      console.error(`Deck with id ${deckId} not found`);
      return;
    }
     this.dialog.open(AddCardDeckDialogComponent, {
      width: '400px',
      data:{deck: deck}
    });
  }
}
