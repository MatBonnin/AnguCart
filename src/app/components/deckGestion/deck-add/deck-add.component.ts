import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../../../services/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-deck-add',
  templateUrl: './deck-add.component.html',
  styleUrls: ['./deck-add.component.css']
})
export class DeckAddComponent {
  deckForm: FormGroup;
  selectedCards: any = [];
  totalCardValue: number = 0;

  constructor(private dataService: DataService,private fb: FormBuilder) {
    this.deckForm = this.fb.group({
      name: [null,Validators.required],


    });
  }

  cards: any = [];
  ngOnInit(){

    this.dataService.getCards().subscribe((cartes : any)=>{
      console.log(cartes)
      // this.cards = carte
      for(let i= 0; i<cartes.length;i++){
        this.dataService.getCardsById(cartes[i].id).subscribe((carte : any)=>{
          console.log(carte)
          this.cards.push(carte)
        });
      }


    });



  }

  isSelected(cardId: any): boolean {
    return this.selectedCards.indexOf(cardId) !== -1;
  }

  toggleCard(card: any) {
    const cardId:number = card.id
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
    // Check if the form is valid
    if (this.deckForm.valid && this.selectedCards.length > 0) {
      // Create the deck and add the selected cards
      const deck = {
        name: this.deckForm.value.name,
        cards: this.selectedCards,

      };

      // TODO: Add the deck to your database or service
      console.log(deck);
      this.dataService.addDeck(deck).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        })
      // Reset the form and the selected cards
      this.deckForm.reset();
      this.selectedCards = [];
    }
  }


}
