import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardRootComponent } from './card-root/card-root.component';
import { CardRootModule } from './card-root/card-root.module';
import { DeckAddComponent } from './deck-add/deck-add.component';

import { DeckComponent } from './deck/deck.component';
import { MenuComponent } from './menu/menu.component';


const routes: Routes = [{path:'',component:CardRootComponent},{path:'card',component:CardRootComponent},{path:'deck',component:DeckComponent},{path:'deck/create',component:DeckAddComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
