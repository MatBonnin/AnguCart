import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DeckService } from '../services/deck.service';
import { CardService } from '../services/card.service';
import { Card } from '../interfaces/card.types';

@Component({
  selector: 'app-add-card-deck-dialog',
  templateUrl: './add-card-deck-dialog.component.html',
  styleUrls: ['./add-card-deck-dialog.component.css']
})
export class AddCardDeckDialogComponent {

  deckForm: FormGroup;
  // totalCardValue: number = 0;

  constructor(public dialogRef: MatDialogRef<AddCardDeckDialogComponent>,private CardService: CardService,@Inject(MAT_DIALOG_DATA) public data: any,private deckService: DeckService,private fb: FormBuilder) {
    this.deckForm = this.fb.group({
      name: [this.data.deck.name],


    });

  }
  apiData : Observable<any> = this.CardService.getCards();
  cards: any = [];

  ngOnInit(){

    this.CardService.getCards().subscribe((cartes : any)=>{

      // this.cards = carte
      for(let i= 0; i<cartes.length;i++){
        this.CardService.getCardsById(cartes[i].id).subscribe((carte : any)=>{

          this.cards.push(carte)
        });
      }


    });
  }

 toggleCard(card: any) {
    const cardId:number = card.id
    const index = this.data.deck.cards.indexOf(cardId)

      if (index === -1) {
        if(this.data.deck.cards.length < 5 && this.totalCardValue() + card.value <= 30 ){
        this.data.deck.cards.push(cardId);

        }
      else{

      }
      } else {

        this.data.deck.cards.splice(index, 1);
      }


  }

  updateDeck(){

    // Mise à jour du deck
    this.data.deck.name = this.deckForm.value.name;
    this.deckService.updateDeck(this.data.deck).subscribe(
      response => {
        this.dialogRef.close();
        ;
      },
      error => {
        ;
      })
    }


  onCancel(): void {
    this.dialogRef.close();
  }
  isSelected(cardId: any): boolean {

    return this.data.deck.cards.indexOf(cardId) !== -1;
  }

  totalCardValue(){
    return this.cards.reduce((totalValue: number, card: any) => {
      if (this.data.deck.cards.includes(card.id)) {
        return totalValue + card.value;
      }
      return totalValue;
    }, 0);
  }

  onAdd(): void {
    // Implémentez la logique pour ajouter une carte ici
    // ...
    this.dialogRef.close(); // Ferme le dialogue après l'ajout de la carte
  }
}
