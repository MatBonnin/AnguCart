import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CardService } from '../../../services/card.service';
import { SnackbarService } from 'src/app/services/snackbar.service';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent {

  myForm: FormGroup;
  successMessage: string = 'Card successfully added.';
  errorMessage: string = 'An error occurred while adding the card.';
  @Output() valueChange = new EventEmitter<string>();

  constructor(private fb: FormBuilder, private CardService: CardService,private snackbar: SnackbarService ) {
    this.myForm = this.fb.group({
      name: [null, Validators.required],
      value: [null, [Validators.required, Validators.max(10)]]
    });
  }

  onSubmit() {
    console.log("submit")
    const formData = this.myForm.value;
    if (this.myForm.valid) {
      this.CardService.addCard(formData).subscribe(
        response => {
          this.resetForm();
          this.valueChange.emit();
          console.log("pas erreur")
          this.snackbar.show(this.successMessage,"success" )

        },
        error => {
          console.log("erreur")

          this.snackbar.show( this.errorMessage,"error"  )

        });
    }
  }

  resetForm() {
    this.myForm.reset();
  }
}
