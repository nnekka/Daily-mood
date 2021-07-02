import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {MaterialService} from "../material.service";
import {Observable} from "rxjs/internal/Observable";
import {Calendar} from "../interfaces";

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(
    private http: HttpClient,
    private router: Router,
    private material: MaterialService
  ) {}

  fetch(): Observable<Calendar[]>{
    return this.http.get<Calendar[]>('/api/calendars')
  }

  fetchTitles(): Observable<string[]>{
    return this.http.get<string[]>('/api/supporting/title-validator')
  }

  fetchById(id: string): Observable<Calendar>{
    return this.http.get<Calendar>(`/api/calendars/${id}`)
  }

  createCalendar(calendar: Calendar): Observable<Calendar>{
    return this.http.post<Calendar>('/api/calendars', calendar)
  }

  updateCalendar(calendar: Calendar, id: string): Observable<Calendar>{
    return this.http.put<Calendar>(`/api/calendars/${id}`, calendar)
  }

  // removeCalendar(id: string): Observable<>{
  //   return this.http.delete<>(`/api/calendars/${id}`)
  // }

}
