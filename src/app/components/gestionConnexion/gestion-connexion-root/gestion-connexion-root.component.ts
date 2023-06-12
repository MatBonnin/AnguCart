import { Component } from '@angular/core';
import { MenuService } from '../../menu/menu.service';

@Component({
  selector: 'app-gestion-connexion-root',
  templateUrl: './gestion-connexion-root.component.html',
  styleUrls: ['./gestion-connexion-root.component.css']
})
export class GestionConnexionRootComponent {

  constructor(private menuService: MenuService) { }

  ngOnInit(): void {
    this.menuService.setMenuVisible(false);
  }

  ngOnDestroy(): void {
    this.menuService.setMenuVisible(true);
  }
}
