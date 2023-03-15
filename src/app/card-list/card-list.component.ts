import { Component, EventEmitter, Output } from '@angular/core';

import { Observable } from 'rxjs';
import { DataService } from '../card-root/data.service';


@Component({
  selector: 'app-card-list',
  templateUrl: './card-list.component.html',
  styleUrls: ['./card-list.component.css']
})
export class CardListComponent {

  constructor(private dataService: DataService) { }
  apiData : Observable<any> = this.dataService.getCards();
  cartes: any = {};
  ngOnInit(){
    this.apiData.subscribe((carte : Object)=>{
      console.log(carte)
      this.cartes = carte
    });
  }
  value : string = "";
  @Output() valueChange = new EventEmitter<string>();
  updateValue(value: string) {
    console.log(value)
    this.value = value;
    this.valueChange.emit(this.value);
  }




}
