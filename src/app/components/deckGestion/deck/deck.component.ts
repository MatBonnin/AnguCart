import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { AddCardDeckDialogComponent } from 'src/app/add-card-deck-dialog/add-card-deck-dialog.component';
import { DataDeckService } from './dataDeck.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent {

  constructor(private dataDeckService: DataDeckService,private dialog: MatDialog) { }
  apiData : Observable<any> =  this.dataDeckService.getDecks();
  decks: any = {};
  ngOnInit(){
    this.apiData.subscribe((deck : Object)=>{
      console.log(deck)
      this.decks = deck
    });
  }



  deleteDeck(deckId:number){
    this.dataDeckService.delDeck(deckId).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      })
  }

  deleteCard(deckId:number, cardId:number){

    // Recherche de l'objet deck correspondant à l'ID
    const deck = this.decks.find((d:any) => d.id === deckId);

    // Recherche de l'index de la carte à supprimer
    const cardIndex = deck.cards.indexOf(cardId);

    // Suppression de la carte du tableau de cartes du deck
    if (cardIndex !== -1) {
      deck.cards.splice(cardIndex, 1);
    }



    // Mise à jour du deck
    this.dataDeckService.updateDeck(deck).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      })
    }

    addCard(deckId: number): void {
      const deck = this.decks.find((d:any) => d.id === deckId);
      const dialogRef = this.dialog.open(AddCardDeckDialogComponent, {
        width: '400px',
        data:{deck: deck}
      });

}
}
