import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnexionService } from '../gestion-connexion-root/connexion.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private connexionService: ConnexionService) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      // Implémentez ici la logique d'inscription, par exemple en appelant un service d'authentification
      this.connexionService.addProfile(this.registerForm.value)
    }
  }
}
