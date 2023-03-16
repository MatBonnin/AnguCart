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



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardRootModule,
    HttpClientModule,
    DeckAddModule,
    DeckModule

  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: ResponseInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
