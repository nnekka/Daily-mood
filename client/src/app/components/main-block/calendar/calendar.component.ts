import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Calendar} from "../../../shared/interfaces";


@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  calendar: Calendar;
  days: number[] = Array(32).fill(0).map((p, i) => i);
  months: string[] = ['', 'Jan', 'Feb','Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

  constructor(
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.getParams();
  }

  private getParams(){
    this.route.data.subscribe(
      data => {
        this.calendar = data.calendar;
      },
      error => console.log(error)
    )
  }

}
