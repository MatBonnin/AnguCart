import { ChangeDetectorRef, Component } from '@angular/core';


import { CardService } from '../../../services/card.service';
import { DeckService } from '../../../services/deck.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { Deck } from 'src/app/interfaces/deck.types';

@Component({
  selector: 'app-card-root',
  templateUrl: './card-root.component.html',
  styleUrls: ['./card-root.component.css']
})
export class CardRootComponent {

  cardId: string = '';
  decks: Deck[] = [];
  refresh: boolean = false;

  constructor(private CardService: CardService, private deckService: DeckService, private cd: ChangeDetectorRef, private snackbarService: SnackbarService) { }
  valueFromChild = '';

  updateValueFromChild(value: string) {
    this.cardId = value;
  }

  ngOnInit() {
    this.refreshDecks();
  }

  refreshDecks() {
    this.deckService.getDecks().subscribe((decks: any) => {
      this.decks = decks;
    });
  }

  refreshCardList(){
    this.refresh = !this.refresh;
  }

  deleteCard():void {
    const isInDeck = this.decks.some((deck: Deck) => deck.cards.includes(this.cardId));

    if (!isInDeck) {
      this.CardService.delCard(this.cardId).subscribe(
        response => {
          this.refreshCardList()
        },
        error => {
          // Handle error if necessary
        });
    } else {
      this.snackbarService.show("Erreur : la carte ne peut pas être supprimée car elle est présente dans un deck.", "error");
    }
  }








}
