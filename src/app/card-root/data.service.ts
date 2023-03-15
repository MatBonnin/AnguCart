import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getCards() {

    const cartes : Observable<any> = this.http.get('http://localhost:3000/api/cards');

    return cartes
  }

  getCardsById(id:any) {

    const carte : Observable<any> = this.http.get('http://localhost:3000/api/cards/'+id);

    return carte
  }

  addCard(card: object){
    return this.http.put('http://localhost:3000/api/cards', card);
  }

  delCard(id: number){
    return this.http.delete('http://localhost:3000/api/cards/'+id);


  }

  addDeck(deck: object){
    return this.http.put('http://localhost:3000/api/decks', deck);
  }
}
