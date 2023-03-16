import { Component } from '@angular/core';

import { CardService } from './card.service';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-card-root',
  templateUrl: './card-root.component.html',
  styleUrls: ['./card-root.component.css']
})
export class CardRootComponent {
  test : string = "salut"
  cardId: any = -1

  constructor(private communicationService: CardService,private dataService: DataService) { }
  valueFromChild = '';

  updateValueFromChild(value: any) {
    console.log(value)
    this.cardId = value;
  }

  deleteCard(){
    this.dataService.delCard(this.cardId).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.log(error);
      })
  }

}
