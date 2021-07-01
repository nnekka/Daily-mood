import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'numToMonth'
})
export class MonthPipe implements PipeTransform {
  transform(month: number): string {
    const months: string[] = ['', 'Jan', 'Feb','Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const foundMonth = months.find(p => months.indexOf(p) === month);
    return foundMonth;
  }

}
