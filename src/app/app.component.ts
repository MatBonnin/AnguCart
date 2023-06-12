import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { MenuService } from './components/menu/menu.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AnguCart';

  menuVisible$: Observable<boolean>;

  constructor(private menuService: MenuService) {
    this.menuVisible$ = this.menuService.menuVisible$;
  }
}
