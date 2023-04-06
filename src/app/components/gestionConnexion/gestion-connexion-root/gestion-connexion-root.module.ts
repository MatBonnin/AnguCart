import { NgModule } from '@angular/core';
import { LoginComponent } from '../login/login.component';

import { RegisterComponent } from '../register/register.component';
import { GestionConnexionRootComponent } from './gestion-connexion-root.component';
import {MatTabsModule} from '@angular/material/tabs';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ConnexionService } from './connexion.service';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    GestionConnexionRootComponent
  ],
  imports: [
    MatTabsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    CommonModule
  ],
  providers: [
    ConnexionService
],
exports:[
  GestionConnexionRootComponent
],
  bootstrap: []
})
export class gestionConnexionModule { }
