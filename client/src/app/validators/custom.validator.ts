import {FormControl} from "@angular/forms";

export class CustomValidator {

  static restrictedYears(control: FormControl):{[key: string]: boolean}{
    const yearNow = new Date().getFullYear();
    if (control.value < yearNow){
      return {
        'restrictedYear': true
      }
    }
    return null;
  }
}
