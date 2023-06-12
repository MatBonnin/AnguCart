import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  constructor(private snackBar: MatSnackBar) { }

  show(message: string, color: 'success' | 'error' | 'info' = 'info', duration: number = 5000) {
    this.snackBar.open(message, 'Fermer', {
      duration,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [color]
    });
  }
}
