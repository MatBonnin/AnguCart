import { Component, OnInit } from '@angular/core';

import { Card } from 'src/app/interfaces/card.types';
import { CardService } from '../../services/card.service';
import { Deck } from 'src/app/interfaces/deck.types';
import { DeckService } from '../../services/deck.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {

  playerDeck: Deck | null = null;
  computerDeck: Deck | null = null;
  availableDecks: Deck[] = [];
  selectedDeckId: string | null = null;
  usedPlayerCards: string[] = [];
  usedComputerCards: string[] = [];

  showCardsInPlay: boolean = false;
  message: string = '';

  playerScore: number = 0;
  computerScore: number = 0;

  round: number = 1;
  maxRounds: number = 5;

  playerCard: Card | null = null;
  computerCard: Card | null = null;

  constructor(private deckService: DeckService, private cardService: CardService,private router:Router) { }

  ngOnInit() {
     this.deckService.getDecks().subscribe((decks: Deck[])=>{
      this.availableDecks = decks;
    });
  }

  selectDeck(deckId: string | null = null) {
    this.selectedDeckId = deckId;

    this.playerDeck = this.availableDecks.find((deck: Deck) => deck.id === deckId) || null;

    if (this.playerDeck !== null) {
        this.playerDeck.cards = [...this.playerDeck.cards];
    }

    let otherDecks = this.availableDecks.filter((deck: Deck) => deck.id !== this.selectedDeckId);
    let randomDeckIndex = Math.floor(Math.random() * otherDecks.length);
    this.computerDeck = otherDecks[randomDeckIndex];

    if (this.computerDeck !== undefined) {
      this.computerDeck.cards = [...this.computerDeck.cards];
    }
  }

  selectCard(cardId: string) {
    this.usedPlayerCards.push(cardId);
    let availableCards = this.computerDeck?.cards.filter((cardId: string) => !this.usedComputerCards.includes(cardId));

    let randomIndex = Math.floor(Math.random() * (availableCards ? availableCards.length : 0));
    let computerCardId = availableCards ? availableCards[randomIndex] : '';
    if (computerCardId !== '') {
      this.usedComputerCards.push(computerCardId);
    }

    this.cardService.getCardsById(cardId).subscribe((card: Card) => {
      this.playerCard = card;
    });

    if (computerCardId !== '') {
      this.cardService.getCardsById(computerCardId).subscribe((card: Card) => {
        this.computerCard = card;
        this.showCardsInPlay = true;
        setTimeout(() => {
          this.playRound();
        }, 5000);
      });
    }
  }

  playRound() {
    if (this.playerCard && this.computerCard) {
      if (this.playerCard.value > this.computerCard.value) {
        this.playerScore++;
        this.message = 'Vous avez gagné cette manche !';
      } else if (this.playerCard.value < this.computerCard.value) {
        this.computerScore++;
        this.message = "L'ordinateur a gagné cette manche !";
      } else {
        this.message = 'Égalité pour cette manche.';
      }
    }

    this.showCardsInPlay = false;
    this.round++;

    if (this.round > this.maxRounds) {
      if (this.playerScore > this.computerScore) {
        this.message = 'Félicitations, vous avez gagné !';
      } else if (this.playerScore < this.computerScore) {
        this.message = "Dommage, vous avez perdu.";
      } else {
        this.message = "C'est une égalité.";
      }

      setTimeout(() => {
        this.resetGame();
      }, 2000);
    }

    if (this.playerDeck && this.playerCard) {
      this.playerDeck.cards = this.playerDeck.cards.filter((cardId:string) => cardId !== this.playerCard!.id);
    }

    if (this.computerDeck && this.computerCard) {
      this.computerDeck.cards = this.computerDeck.cards.filter((cardId:string) => cardId !== this.computerCard!.id);
    }
  }

  async resetGame() {
    this.playerScore = 0;
    this.computerScore = 0;
    this.round = 1;
    this.message = '';
    this.playerDeck = null;
    this.computerDeck = null;
    this.usedPlayerCards = [];
    this.usedComputerCards = [];
    this.availableDecks = (await this.deckService.getDecks().toPromise()) || [];

  }
}
