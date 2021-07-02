import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'shorterString'
})
export class LengthPipe implements PipeTransform {
  transform(str: string): string {
    let result = '';
    if (str.length > 15){
      result = str.substring(0, 14) + ' ..';
    } else {
      result = str;
    }
    return result;
  }

}
