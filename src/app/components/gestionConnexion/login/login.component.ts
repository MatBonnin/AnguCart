import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnexionService } from '../gestion-connexion-root/connexion.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private formBuilder: FormBuilder, private connexionService: ConnexionService,private router: Router) {
    this.loginForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  async onSubmit(): Promise<any> {
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);
      // Implémentez ici la logique d'inscription, par exemple en appelant un service d'authentification

      try{
        await this.connexionService.login(this.loginForm.value);
         this.router.navigate(['']);
      }
      catch{
        console.log("erreur")
        this.errorMessage = "L'utilisateur n'existe pas ou les informations d'identification sont incorrectes.";
      }

    }
  }
}
