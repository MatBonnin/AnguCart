import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Card } from 'src/app/interfaces/card.types';
import { CardService } from '../../../services/card.service';
import { Component } from '@angular/core';
import { DeckService } from 'src/app/services/deck.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-deck-add',
  templateUrl: './deck-add.component.html',
  styleUrls: ['./deck-add.component.css']
})
export class DeckAddComponent {
  deckForm: FormGroup;
  selectedCards: string[] = [];
  totalCardValue: number = 0;

  constructor(private cardService: CardService,private deckService: DeckService, private fb: FormBuilder) {
    this.deckForm = this.fb.group({
      name: [null,Validators.required],


    });
  }



 cards: Card[] = [];
  ngOnInit(){

    this.cardService.getCards().subscribe((cartes : any)=>{
      // this.cards = carte
      for(let i= 0; i<cartes.length;i++){
        this.cardService.getCardsById(cartes[i].id).subscribe((carte : any)=>{

          this.cards.push(carte)
        });
      }
    });

  }

  isSelected(cardId: string): boolean {
    return this.selectedCards.indexOf(cardId) !== -1;
  }

  toggleCard(card: Card) {
    const cardId:string = card.id
    // Add or remove the selected card from the list

      if (this.selectedCards.indexOf(cardId) === -1 ) {

          if(this.selectedCards.length < 5 && this.totalCardValue + card.value <= 30){
            this.totalCardValue += card.value;
            this.selectedCards.push(cardId);
          }
      } else {
        this.totalCardValue -= card.value;
        this.selectedCards.splice(this.selectedCards.indexOf(cardId), 1);
      }
  }

  createDeck() {
    if (this.deckForm.valid && this.selectedCards.length > 0) {

        this.deckService.addDeck({
          id:'',
        name: this.deckForm.value.name,
        cards: this.selectedCards,
      }).subscribe(
        response => {

        },
        error => {

        })
      // Reset the form and the selected cards
      this.deckForm.reset();
      this.selectedCards = [];
    }
  }


}
