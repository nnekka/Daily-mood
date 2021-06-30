import { Injectable } from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(
    private snackBar: MatSnackBar
  ) {}

  showMessage(message: any){
    this.snackBar.open(message, null, {
      duration: 3000,
      panelClass: 'my-custom-snackbar'
    })
  }
}
