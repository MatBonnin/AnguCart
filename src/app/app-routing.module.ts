import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CardRootComponent } from './components/cardGestion//card-root/card-root.component';
import { DeckAddComponent } from './components/deckGestion/deck-add/deck-add.component';
import { DeckComponent } from './components/deckGestion/deck/deck.component';
import { GestionConnexionRootComponent } from './components/gestionConnexion/gestion-connexion-root/gestion-connexion-root.component';
import { AuthGuard } from './auth.guard'; // Ajoutez cet import
import { GameComponent } from './components/game/game.component';

const routes: Routes = [
  {path:'',component:CardRootComponent, canActivate: [AuthGuard]}, // Ajoutez canActivate
  {path:'card',component:CardRootComponent, canActivate: [AuthGuard]}, // Ajoutez canActivate
  {path:'deck',component:DeckComponent, canActivate: [AuthGuard]}, // Ajoutez canActivate
  {path:'deck/create',component:DeckAddComponent, canActivate: [AuthGuard]}, // Ajoutez canActivate
  {path:'login',component:GestionConnexionRootComponent},
  {path:'game',component:GameComponent}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
