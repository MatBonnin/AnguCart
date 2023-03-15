import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CardService {
  private displayComponent = new BehaviorSubject<boolean>(false);
  displayComponent$ = this.displayComponent.asObservable();

  constructor() { }

  toggleComponentDisplay(display: boolean) {
    this.displayComponent.next(display);
  }
}
