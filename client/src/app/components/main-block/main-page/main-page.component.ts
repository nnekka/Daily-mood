import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {MaterialService} from "../../../shared/material.service";
import {AuthService} from "../../auth-block/auth.service";
import {Calendar} from "../../../shared/interfaces";
import {CalendarService} from "../../../shared/services/calendar.service";
import {Observable} from "rxjs/internal/Observable";

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss']
})
export class MainPageComponent implements OnInit {

  calendars$: Observable<Calendar[]>;
  folders = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
    }
  ];

  constructor(
    private route: ActivatedRoute,
    private material: MaterialService,
    private authService: AuthService,
    private calendarService: CalendarService,
  ) { }

  ngOnInit(): void {
    this.getParams();
    this.getCalendars();
  }

  private getParams(){
    this.route.queryParams.subscribe(
      (params: Params) => {
        if (params['logged']){
          this.material.showMessage(`Добро пожаловать, ${params['user']}!`);
        }
      }
    )
  }

  getCalendars(){
    this.calendars$ = this.calendarService.fetch()
  }
}
