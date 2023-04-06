import { ChangeDetectorRef, Component } from '@angular/core';

import { CardService } from './card.service';
import { DataService } from '../../../services/data.service';
import { DataDeckService } from '../../deckGestion/deck/dataDeck.service';

@Component({
  selector: 'app-card-root',
  templateUrl: './card-root.component.html',
  styleUrls: ['./card-root.component.css']
})
export class CardRootComponent {
  test : string = "salut"
  cardId: any = -1
  decks:any = null

  constructor(private dataService: DataService,private dataDeckService: DataDeckService,private cd: ChangeDetectorRef) { }
  valueFromChild = '';

  updateValueFromChild(value: any) {
    console.log(value)
    this.cardId = value;
  }

  ngOnInit(){
    this.dataDeckService.getDecks().subscribe((decks : any)=>{
      console.log(decks)
     this.decks = decks

    });

  }





  deleteCard(){


    let isInDeck = false;
    for (let i = 0; i < this.decks.length; i++) {
      const deck = this.decks[i];
      for (let j = 0; j < deck.cards.length; j++) {
        const cardId = deck.cards[j];
        if (cardId === this.cardId) {
          console.log(`Found target card in deck ${deck.name}`);
          // faire quelque chose si l'ID de la carte correspond à la variable souhaitée
          isInDeck = true;
        }
      }
    }
    if(isInDeck === false){
      this.dataService.delCard(this.cardId).subscribe(
        response => {

          console.log(response);
        },
        error => {
          console.log(error);
        })
    }


  }

}
