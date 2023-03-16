import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { DataDeckService } from './dataDeck.service';

@Component({
  selector: 'app-deck',
  templateUrl: './deck.component.html',
  styleUrls: ['./deck.component.css']
})
export class DeckComponent {

  constructor(private dataDeckService: DataDeckService) { }
  apiData : Observable<any> = this.dataDeckService.getDecks();
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
}
