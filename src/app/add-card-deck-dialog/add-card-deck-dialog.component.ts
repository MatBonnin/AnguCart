import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { DataDeckService } from '../components/deckGestion/deck/dataDeck.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-add-card-deck-dialog',
  templateUrl: './add-card-deck-dialog.component.html',
  styleUrls: ['./add-card-deck-dialog.component.css']
})
export class AddCardDeckDialogComponent {
  selectedCards: any = [];
  deckForm: FormGroup;
  totalCardValue: number = 0;

  constructor(public dialogRef: MatDialogRef<AddCardDeckDialogComponent>,private dataService: DataService,@Inject(MAT_DIALOG_DATA) public data: any,private dataDeckService: DataDeckService,private fb: FormBuilder) {
    this.deckForm = this.fb.group({
      name: [this.data.deck.name],


    });

  }
  apiData : Observable<any> = this.dataService.getCards();
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

 toggleCard(card: any) {
    const cardId:number = card.id
    const index = this.data.deck.cards.indexOf(cardId)

      if (index === -1) {
        if(this.data.deck.cards.length < 5 && this.totalCardValue <= 30 ){
        this.data.deck.cards.push(cardId);
        this.totalCardValue += card.value;
        }
      else{
        console.log("Vous avez atteint le nombre maximum de carte")
      }
      } else {
        this.totalCardValue -= card.value;
        this.data.deck.cards.splice(index, 1);
      }


  }

  updateDeck(){

    // Mise à jour du deck
    this.data.deck.name = this.deckForm.value.name;
    this.dataDeckService.updateDeck(this.data.deck).subscribe(
      response => {
        this.dialogRef.close();
        console.log(response);
      },
      error => {
        console.log(error);
      })
    }


  onCancel(): void {
    this.dialogRef.close();
  }
  isSelected(cardId: any): boolean {
    return this.data.deck.cards.indexOf(cardId) !== -1;
  }

  onAdd(): void {
    // Implémentez la logique pour ajouter une carte ici
    // ...
    this.dialogRef.close(); // Ferme le dialogue après l'ajout de la carte
  }
}
