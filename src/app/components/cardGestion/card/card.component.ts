import { Component, Input } from '@angular/core';

import { Card } from 'src/app/interfaces/card.types';
import { CardService } from '../../../services/card.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() cardId: string='' ;

  carte: Card = {
    id: '',
    name: '',
    value: 0,
    imageUrl: '' // Ajoutez une propriété imageUrl à votre interface Card.
  };

  // N'oubliez pas d'injecter HttpClient pour effectuer des requêtes HTTP.
  constructor(private cardService: CardService, private http: HttpClient) { }

  ngOnChanges(){
    if (this.cardId !== '') {
      console.log(this.cardId);
      let apiData = this.cardService.getCardsById(this.cardId);
      apiData.subscribe((carte : Card) => {
        this.carte = carte;
        // Appeler getImages après avoir reçu les données de la carte.
        // this.getImages(this.carte.name); enlever le commentaire pour avoir des images associé a la card
      });
    }
  }

  getImages(query: string) {
    const apiKey = 'AIzaSyDf_9ZgkA6wxfhDFtEv7M_ugJ-0-h78ewc'; // Remplacez par votre clé API Google.
    const cx = '05303efd5f047435e'; // Remplacez par votre identifiant de moteur de recherche.

    this.http.get(`https://www.googleapis.com/customsearch/v1?q=${query}&cx=${cx}&key=${apiKey}&searchType=image`)
      .subscribe((data: any) => {
        if (data.items && data.items.length > 0) {
          this.carte.imageUrl = data.items[0].link;
        }
      }, (error) => {
        console.error('Error:', error);
      });
  }

}
