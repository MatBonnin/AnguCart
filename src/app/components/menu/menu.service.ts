// menu.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuService {
  private menuVisibleSource = new BehaviorSubject<boolean>(true);
  menuVisible$ = this.menuVisibleSource.asObservable();

  setMenuVisible(visible: boolean): void {
    this.menuVisibleSource.next(visible);
  }
}
