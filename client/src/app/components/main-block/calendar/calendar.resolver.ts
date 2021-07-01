import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from "@angular/router";
import {Calendar} from "../../../shared/interfaces";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs/internal/Observable";
import {CalendarService} from "../../../shared/services/calendar.service";

@Injectable({
  providedIn: 'root'
})
export class CalendarResolver implements Resolve<Calendar>{

  constructor(
    private calendarService: CalendarService
  ){}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Calendar> | Promise<Calendar> | Calendar {
    return this.calendarService.fetchById(route.params['id']);
  }

}
