import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AddCardDeckDialogComponent } from './add-card-deck-dialog/add-card-deck-dialog.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CardRootComponent } from './components/cardGestion/card-root/card-root.component';
import { CardRootModule } from './components/cardGestion/card-root/card-root.module';
import { DeckAddModule } from './components/deckGestion/deck-add/deck-add.module';
import { DeckModule } from './components/deckGestion/deck/deck.module';
import { GameComponent } from './components/game/game.component';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { MenuComponent } from './components/menu/menu.component';
import { NgModule } from '@angular/core';
import { addCardDeckDialogModule } from './add-card-deck-dialog/add-card-deck-dialog.module';
import { gestionConnexionModule } from './components/gestionConnexion/gestion-connexion-root/gestion-connexion-root.module';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    GameComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardRootModule,
    HttpClientModule,
    gestionConnexionModule,
    DeckAddModule,
    DeckModule,
    addCardDeckDialogModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },


],
  bootstrap: [AppComponent]
})
export class AppModule { }
