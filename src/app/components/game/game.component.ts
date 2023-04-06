import { Component, OnInit } from '@angular/core';
import { DataDeckService } from '../deckGestion/deck/dataDeck.service';
import { DataService } from '../../services/data.service';


@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent  {
  // ...
  playerDeck: any; // Le deck du joueur
  computerDeck: any; // Le deck de l'ordinateur
  availableDecks: any; // Liste des decks disponibles
  selectedDeckId: number | null = null; // L'ID du deck sélectionné par le joueur
  usedPlayerCards: any[] = []; // Les cartes déjà utilisées par le joueur
  usedComputerCards: any[] = []; // Les cartes déjà utilisées par l'ordinateur

  showCardsInPlay: boolean = false;
  message: string = '';

  playerScore: number = 0;
  computerScore: number = 0;

  round: number = 1; // Le tour actuel
  maxRounds: number = 5;

  playerCard: any; // La carte sélectionnée par le joueur pour ce tour
  computerCard: any;// La carte sélectionnée par l'ordinateur pour ce tour

  constructor(private dataDeckService: DataDeckService, private dataService: DataService) { }

  async ngOnInit() {
    this.availableDecks = await this.dataDeckService.getDecks().toPromise();
  }

  selectDeck(deckId: number) {
    this.selectedDeckId = deckId;

    // Trouvez le deck sélectionné et attribuez-le au joueur
    this.playerDeck= this.availableDecks.find((deck: { id: number; }) => deck.id === deckId);


    // Sélectionnez un deck aléatoire pour l'ordinateur
    const randomDeckIndex = Math.floor(Math.random() * this.availableDecks.length);
    this.computerDeck = this.availableDecks[randomDeckIndex];

  }


  selectCard(card: any) {
    if (this.usedPlayerCards.includes(card)) {
      this.message = 'Vous avez déjà utilisé cette carte.';
      return;
    }

    this.playerCard = card;
    this.usedPlayerCards.push(card);

    let tries = this.computerDeck.cards.length;
    let availableCards = this.computerDeck.cards.filter((card: any) => !this.usedComputerCards.includes(card));
    let randomIndex = Math.floor(Math.random() * availableCards.length);
    this.computerCard = availableCards[randomIndex];
    this.usedComputerCards.push(this.computerCard);

    this.showCardsInPlay = true;
    setTimeout(() => {
      this.playRound();
    }, 5000);
  }

  async playRound() {
    // Comparez les cartes et mettez à jour les scores

    let playerCardInfo: any;
    let computerCardInfo: any;

    // Utilisez Promise.all pour attendre que les deux requêtes soient terminées
    const [playerCardResponse, computerCardResponse] = await Promise.all([
      this.dataService.getCardsById(this.playerCard).toPromise(),
      this.dataService.getCardsById(this.computerCard).toPromise(),
    ]);

    playerCardInfo = playerCardResponse;
    computerCardInfo = computerCardResponse;

    console.log(playerCardInfo);
    console.log(computerCardInfo);

    if (playerCardInfo.value >computerCardInfo.value) {
      this.playerScore++;
      this.message = 'Vous avez gagné cette manche !';
    } else if (playerCardInfo.value < computerCardInfo.value) {
      this.computerScore++;
      this.message = "L'ordinateur a gagné cette manche !";
    } else {
      this.message = 'Égalité pour cette manche.';
    }

    this.showCardsInPlay = false;
    this.round++;

    if (this.round > this.maxRounds) {
      // Le jeu est terminé, affichez le message final
      if (this.playerScore > this.computerScore) {
        this.message = 'Félicitations, vous avez gagné !';
      } else if (this.playerScore < this.computerScore) {
        this.message = "Dommage, vous avez perdu.";
      } else {
        this.message = "C'est une égalité.";
      }
    }
    this.playerDeck.cards = this.playerDeck.cards.filter((card: any) => card !== this.playerCard);
    this.computerDeck.cards = this.computerDeck.cards.filter((card: any) => card !== this.computerCard);
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
    this.availableDecks =  await this.dataDeckService.getDecks().toPromise()
  }


}
