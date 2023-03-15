import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { DataService } from '../card-root/data.service'

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() cardId: any;

  carte: any = null;

  constructor(private dataService: DataService) { }

  ngOnChanges(){
    if (this.cardId != -1){
      let apiData = this.dataService.getCardsById(this.cardId);
    apiData.subscribe((carte : Object)=>{
      console.log(carte)
      this.carte = carte
    });
    }

  }
  // ngOnInit(){
  //   this.apiData = this.dataService.getCardsById(this.cardId);
  //   this.apiData.subscribe((carte : Object)=>{
  //     console.log(carte)
  //     this.carte = carte
  //   });
  // }


}
