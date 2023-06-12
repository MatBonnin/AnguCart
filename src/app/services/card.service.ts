import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) { }

  getCards():Observable<any> {
    return this.http.get('http://localhost:3000/api/cards');
  }

  getCardsById(id:string):Observable<any> {

    return this.http.get('http://localhost:3000/api/cards/'+id);
  }

  addCard(card: object):Observable<any>{
    return this.http.put('http://localhost:3000/api/cards', card);
  }


  delCard(id: string):Observable<any>{
    return this.http.delete('http://localhost:3000/api/cards/'+id);
  }



}
