 // Assurez-vous que l'importation est correcte

import { Deck } from '../interfaces/deck.types';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  constructor(private http: HttpClient) { }

  getDecks(): Observable<Deck[]> {
    return this.http.get<Deck[]>('http://localhost:3000/api/decks');
  }

  delDeck(id: string): Observable<any> {
    return this.http.delete(`http://localhost:3000/api/decks/${id}`);
  }

  updateDeck(deck: Deck): Observable<any> {
    return this.http.post('http://localhost:3000/api/decks', deck);
  }

  addDeck(deck: Deck): Observable<any> {
    return this.http.put('http://localhost:3000/api/decks', deck);
  }
}
