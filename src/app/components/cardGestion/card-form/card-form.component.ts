import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.css']
})
export class CardFormComponent {


  myForm: FormGroup;
  constructor(private fb: FormBuilder,private dataService: DataService) {
    this.myForm = this.fb.group({
      name: [null,Validators.required],
      value: [null,Validators.required]

    });
  }


  onSubmit() {
    const formData = this.myForm.value;
    if (this.myForm.valid){
      this.dataService.addCard(formData).subscribe(
        response => {
          console.log(response);
        },
        error => {
          console.log(error);
        })

  console.log(formData);
    }

  }
}

// onSubmit(card: object) {
//   this.dataService.addCard(card).subscribe(
//     response => {
//       console.log(response);
//     },
//     error => {
//       console.log(error);
//     }
//   );
// }
