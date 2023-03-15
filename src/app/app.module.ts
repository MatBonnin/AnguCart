import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';

import { DeckComponent } from './deck/deck.component';


import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CardRootComponent } from './card-root/card-root.component';
import { CardRootModule } from './card-root/card-root.module';
import { ResponseInterceptor } from './interceptors/response.interceptor';
import { DeckAddModule } from './deck-add/deck-add.module';





@NgModule({
  declarations: [
    AppComponent,
    DeckComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CardRootModule,
    HttpClientModule,
    DeckAddModule
  ],
  providers: [ {
    provide: HTTP_INTERCEPTORS,
    useClass: ResponseInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
