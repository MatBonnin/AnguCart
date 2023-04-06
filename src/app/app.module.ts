import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';



import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CardRootComponent } from './components/cardGestion/card-root/card-root.component';
import { CardRootModule } from './components/cardGestion/card-root/card-root.module';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { DeckAddModule } from './components/deckGestion/deck-add/deck-add.module';
import { DeckModule } from './components/deckGestion/deck/deck.module';
import { AddCardDeckDialogComponent } from './add-card-deck-dialog/add-card-deck-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { addCardDeckDialogModule } from './add-card-deck-dialog/add-card-deck-dialog.module';

import { gestionConnexionModule } from './components/gestionConnexion/gestion-connexion-root/gestion-connexion-root.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { GameComponent } from './game/game.component';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';




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
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: ResponseInterceptor,
    multi: true
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
],
  bootstrap: [AppComponent]
})
export class AppModule { }
