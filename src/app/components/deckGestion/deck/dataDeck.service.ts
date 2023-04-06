import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataDeckService {

  constructor(private http: HttpClient) { }

  getDecks() {

    const decks : Observable<any> = this.http.get('http://localhost:3000/api/decks');

    return decks
  }
  delDeck(id: number){
    return this.http.delete('http://localhost:3000/api/decks/'+id);
  }

  updateDeck(deck: any){
    return this.http.post('http://localhost:3000/api/decks', deck);
  }
}
