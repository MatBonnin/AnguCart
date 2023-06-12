import { Component, EventEmitter, Output, Input, SimpleChanges } from '@angular/core';

import { Observable } from 'rxjs';
import { CardService } from '../../../services/card.service';
import { Card } from 'src/app/interfaces/card.types';

@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {

  constructor(private CardService: CardService) { }
  apiData: Observable<any> = this.CardService.getCards();
  cartes: Card[] = [];
  value: string = '';
  @Output() valueChange = new EventEmitter<string>();


  @Input() refresh: boolean = false;

  ngOnInit() {
    this.fetchCards();
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes['refresh'] && changes['refresh'].currentValue) {
     this.fetchCards();
    }
  }

  fetchCards() {
    this.apiData.subscribe((cartes: Card[]) => {

      this.cartes = cartes;
      console.log(this.fetchCards)
    });
  }



  updateValue(value: string) {
    this.value = value;
    this.valueChange.emit(this.value.toString());
  }

}
